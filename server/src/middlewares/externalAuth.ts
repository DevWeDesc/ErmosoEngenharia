import { FastifyRequest, FastifyReply, HookHandlerDoneFunction, FastifyInstance  } from "fastify";
import dotenv from 'dotenv'
dotenv.config({
    path: "src/security/.env"
  })
const acess = process.env.ACESS_TOKEN;

export const ExternalAuth = async (request: FastifyRequest<{ Headers: { token: string}} >, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    const token = request.headers.token
    try {
        if(!token) {
            reply.status(401).send({message: "ACESSO NÃO AUTORIZADO"})
            return
        } else if (token != acess) {
            reply.status(401).send({message: "TOKEN INVALIDO"})
            return
        } else {
            done()
        }
    } catch (error) {
        console.log(error)
    }
} 