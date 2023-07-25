import { FastifyRequest, FastifyReply, FastifyInstance} from "fastify";
import { PrismaClient } from "@prisma/client";
import fs from 'fs'
import { ValidationContract } from "../validators/validateContract";
import { randomUUID } from "crypto";
import { reportServices } from "../services/reportService";
const prisma = new PrismaClient();


export const reportReceveid = {
  createNewReport: async (request: FastifyRequest, reply: FastifyReply ) => {
    try {
    
      const {address, contactOne, contactTwo,customerName, guaranteeValue, iptu,leadNumber, registration}: any = request.body
      const id = randomUUID()
        let contract = new ValidationContract()
        await contract.reportAlreadyExist(leadNumber, "Registro já existente")
        if(contract.hadError()){
          reply.status(400).send(contract.showErrors())
          contract.clearErrors()
          return
        } else {

  

          await prisma.reportReceived.create({data: {customerName, address, contactOne, contactTwo, guaranteeValue, iptu, leadNumber, registration}})

          reply.send("Laudo criado com sucesso").status(201)
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
          where: {status: {contains: "open"}},include: {reportsDocuments: {select: {documentsPath: true}}}
        })

       const data = reports.map((report) => {
      
        let fullData = {
          id: report.id,
          customerName: report.customerName,
          adress:  report.address,
          contactOne: report.contactOne,
		      contactTwo: report.contactTwo,
		      registration: report.registration,
		      iptu: report.iptu,
		      leadNumber: report.leadNumber,
		      guaranteeValue: report.guaranteeValue,
		      status: report.status,
          document: report.reportsDocuments?.map((doc) => doc.documentsPath[0])
        }
        return fullData
       }) 
        reply.send(data).status(200)
    } catch (error) {
      console.log(error)
      reply.send({message: error}).status(404)
    }
  },

  createPdfFiles: async (request: FastifyRequest<{Params: {leadNumber: string}}>, reply: FastifyReply) => {
    try {
    const { leadNumber } = request.params
        //@ts-ignore
        const pdfFiles = request.files()
        //@ts-ignore
       const pdfPaths = await reportServices.streamPdfs(pdfFiles, leadNumber)
        
        if(!pdfPaths) {
          return
        } else {
          await prisma.reportsDocuments.create({
            data: {report: {connect: {leadNumber: leadNumber}}, documentsPath: pdfPaths}
           })

        
           reply.send({pdfPaths})
           
        }
    } catch (error) {
      console.log(error)
      reply.send({message: error}).status(404)
    }
  },
  

};
