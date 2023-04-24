import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { ValidationContract } from "../validators/validateContract";
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

    //@ts-ignore
    let contract = new ValidationContract()
    contract.userAlreadyExists(email, "Usuário já existe.")

    if(!contract.isValid()) {
      reply.status(400).send(contract.errors())
    }


    const userAlreadyExists = await prisma.user.findUnique({
      where: { email}
    })

    if (userAlreadyExists) reply.status(401).send('Usuário já existe.')

    const user = await prisma.user.create({
      data: { email, password, username, roles}
    })
    reply.status(201).send(user)
  },

  getUsers: async(request: FastifyRequest, reply: FastifyReply) => {
    const users = await prisma.user.findMany()
    reply.send(users)
  }

}

     