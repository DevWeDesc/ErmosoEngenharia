import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { ValidationContract } from "../validators/validateContract";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config({
  path: "src/security/.env"
})
const secret = process.env.JWT_TOKEN
const prisma = new PrismaClient();

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string().optional(),
  roles: z.string()
})

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

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, username, roles}
    })
    reply.status(201).send("USUÁRIO CRIADO COM SUCESSO")
  },

  getUsers: async(request: FastifyRequest, reply: FastifyReply) => {
    const users = await prisma.user.findMany()
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
      if(!secret) { return} else {
        const token = jwt.sign({email}, secret, {expiresIn: "1d"})
        reply.send({user: user, token: token}).status(200)
      }
    } catch (error) {
      reply.send({error: error}).status(500)
      console.log(error)
    }
  }

}

     