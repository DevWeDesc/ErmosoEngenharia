import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { ValidationContract } from "../validators/validateContract";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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

    //@ts-ignore
    let contract = new ValidationContract()
    contract.userAlreadyExists(email, "Usuário já existe.")

    if(!contract.isValid()) {
      reply.status(400).send(contract.errors())
    }

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, username, roles}
    })
    reply.status(201).send(user)
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
    const { email, password} = LoginSchema.parse(request.body);
    try {
      const response = await prisma.user.findUnique({
        where: {email: email}
      })
    } catch (error) {
      reply.send({error: error}).status(500)
    }
  }

}

     