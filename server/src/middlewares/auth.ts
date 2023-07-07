import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
const prisma = new PrismaClient();
dotenv.config({
    path: "src/security/.env"
  })
const secret = process.env.JWT_TOKEN;

export const UserIsAuth = async (request: FastifyRequest<{ Body: { email: string}, Querystring: {token: string}, Headers: {token: string}} >, reply: FastifyReply, done: any) => {
    const token = request.headers.token

    if(!token){
        reply.status(401).send({message: "ACESSO RESTRITO"})
        return
    } else if(!secret) {
        return
    } else {
        jwt.verify(token, secret, function(error, decoded) {
            if(error) {
                reply.status(401).send({message: "Token Inválido"})
            } else {
                done()
            }
        })
    }
}

