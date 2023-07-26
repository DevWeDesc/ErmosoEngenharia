import { FastifyRequest, FastifyReply, FastifyInstance} from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { ValidationContract } from "../validators/validateContract";
const prisma = new PrismaClient();



export const reportReceveid = {
  createNewReport: async (request: FastifyRequest, reply: FastifyReply ) => {
    const ReportSchema = z.object({
      customerName: z.string(),
      address: z.string(),
      contactOne: z.string(),
      contactTwo: z.string(),
      registration: z.string(),
      iptu: z.string(),
      leadNumber: z.string(),
      guaranteeValue: z.string(),
    });
   
    try {
     
      const {customerName, address, contactOne, contactTwo, guaranteeValue, iptu, leadNumber, registration}: any = request.body
         let contract = new ValidationContract()
        await contract.reportAlreadyExist(leadNumber, "Registro já existente")
        if(contract.hadError()){
          reply.status(400).send(contract.showErrors())
          contract.clearErrors()
          return
        } else {
          await prisma.reportReceived.create({data: {customerName, address, contactOne, contactTwo, guaranteeValue, iptu, leadNumber, registration}})

          reply.send("Report Created").status(201)
        }

       
    } catch (error) 
    {
        console.log(error)
        reply.send({message: error}).status(404)
    }
  },


  getReceveidsReports: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      
        const reports = await prisma.reportReceived.findMany({
          // @ts-ignore
          where: {status: {contains: "open"}}
        })

        reply.send(reports).status(200)
    } catch (error) {
      console.log(error)
      reply.send({message: error}).status(404)
    }
  },

  getReceidsReportsClose: async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const reports = await prisma.reportReceived.findMany({
      // @ts-ignore
      where: { status: "close" } 
    });
    reply.send(reports).status(200);
  } catch (error) {
    console.log(error);
    reply.send({ message: error }).status(404);
  }
}


};
