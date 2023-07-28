import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { ValidationContract } from "../validators/validateContract";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"
import { emaiLService } from "../services/emailService";
dotenv.config({
  path: "src/security/.env"
})
const secret = process.env.JWT_TOKEN
const prisma = new PrismaClient();

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string().optional(),
  roles: z.string(),
})

interface ParamsId {
  id: number;
}

export const userController = {
  
  createUser: async(request: FastifyRequest, reply: FastifyReply) => {
    const { email, password, username, roles} = UserSchema.parse(request.body);
    const hashedPassword = await bcrypt.hash(password, 10)
    let contract = new ValidationContract()

    await contract.userAlreadyExists(email, "Usuário já existe.")

    if(contract.hadError()){
      reply.status(400).send(contract.showErrors())
      contract.clearErrors()
      return
    }

    await prisma.user.create({
      data: { email, password: hashedPassword, username, roles}
    })

     await  emaiLService.sendEmail()
    reply.status(201).send("USUÁRIO CRIADO COM SUCESSO")
  },

  getUsers: async(_request: FastifyRequest, reply: FastifyReply) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        password: false,
        roles: true,
      }
    })
    reply.send(users)
  },

  loginUser: async(request: FastifyRequest, reply: FastifyReply) => {
    const LoginSchema = z.object({
      email: z.string().email(),
      password: z.string()
    })
    try {
      const { email, password} = LoginSchema.parse(request.body);
      const user = await prisma.user.findUnique({where: {email: email}})
      let contract = new ValidationContract()
      await contract.verifyIfUserExist(email, "Email incorreto ou Usuário não existe")
      await contract.checkPassword({email, password}, "Senha incorreta")
      if(contract.hadError()){
        reply.status(400).send(contract.showErrors())
        contract.clearErrors()
        return
      } 

      if(secret && user){
        const token = jwt.sign({email, username: user.username}, secret, {expiresIn: "1d"})
        
        reply.send({
          id: user.id,
          email: user.email,
          username: user.username,
          roles: user.roles,
          token
        }).status(200)
      }
    } catch (error) {
      reply.send({error: error}).status(500)
      console.log(error)
    }
  },
  
  decodeToken: async (request: FastifyRequest, _reply: FastifyReply) => {
    const { token } = request.body as { token: string };
    try {
      const decoded = jwt.verify(token, secret as string) as JwtPayload;

      if (typeof decoded === 'object' && decoded !== null) {
        const email = decoded.email;
        const user = await prisma.user.findUnique({ where: { email }});
    
        if (user) {
          return {
            username: user.username,
            email: user.email, 
            role: user.roles
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  getUserById: async(request: FastifyRequest<{ Params: ParamsId }>, reply: FastifyReply) => {
    const id = Number(request.params.id)
      const user = await prisma.user.findFirst({
        where: { id },
        select: {
          id: true,
          email: true,
          username: true,
          password: false,
          roles: true,
        }
      })
      reply.send(user).status(200)
  },

  updateUser: async(request: FastifyRequest<{ Params: ParamsId }>, reply: FastifyReply) => {
    const UserUpdateSchema = z.object({
      email: z.string().email(),
      password: z.string().optional(),
      username: z.string().optional(),
      roles: z.string().optional(),
    })
    
    const id = Number(request.params.id)
    const { email, username, password, roles} = UserUpdateSchema.parse(request.body);
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
      await prisma.user.update({
        where: { id },
        data: { email, password: hashedPassword, username, roles }
      })
      reply.status(200)
  },
    
}

     