import { FastifyRequest, FastifyReply, FastifyInstance} from "fastify";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from 'fs'
import { ValidationContract } from "../validators/validateContract";
import { randomUUID } from "crypto";
import { reportServices } from "../services/reportService";
const prisma = new PrismaClient();

interface RequestBodyProps {
  customerName: string;
  address: string;
  district: string;
  cep: string;
  neighbour: string;
  state: string;
  contactOne: string;
  contactTwo: string;
  guaranteeValue: string;
  iptu: string;
  leadNumber: string;
  registration: string
}

interface RequestCompletionReport {
  standardApparentAge: string;
  padrao: string;
  conservationState: string;
  usefulArea: string;
  homogenizedArea: string;
  landArea: string;
  parkingSpaces: string;
  dateReport: string;
}

export const reportReceveid = {
  createNewReport: async (request: FastifyRequest<{Body: RequestBodyProps}>, reply: FastifyReply ) => {
    try {
    
      const {address, cep, contactOne, contactTwo,customerName,district,guaranteeValue,iptu,leadNumber,neighbour,registration,state}: any = request.body
      const id = randomUUID()
        let contract = new ValidationContract()
        await contract.reportAlreadyExist(leadNumber, "Registro já existente")
        if(contract.hadError()){
          reply.status(400).send(contract.showErrors())
          contract.clearErrors()
          return
        } else {
          await prisma.reportReceived.create({ data: { customerName, cep, district, neighbour, state, address, contactOne, contactTwo, guaranteeValue, iptu, leadNumber, registration }})
          reply.send("Laudo criado com sucesso").status(201)
        }
    } catch (error) 
    {
        console.log(error)
        reply.send({message: error}).status(404)
    }
  },


  getReceveidsReports: async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
        const reports = await prisma.reportReceived.findMany({
          where: {status: {contains: "open"}},include: {reportsDocuments: {select: {documentsPath: true}}}
        })

       const data = reports.map((report) => {
        let fullData = {
          id: report.id,
          customerName: report.customerName,
          address:  report.address,
          contactOne: report.contactOne,
		      contactTwo: report.contactTwo,
		      registration: report.registration,
		      iptu: report.iptu,
		      leadNumber: report.leadNumber,
		      guaranteeValue: report.guaranteeValue,
		      status: report.status,
          document: report.reportsDocuments?.flatMap((doc) => doc.documentsPath)
        }
        return fullData
       }) 
        reply.send(data).status(200)
    } catch (error) {
      console.log(error)
      reply.send({message: error}).status(404)
    }
  },

  createPdfFiles: async (request: FastifyRequest<{ Params: { leadNumber: string }}>, reply: FastifyReply) => {
    try {
    const { leadNumber } = request.params
        //@ts-ignore
        const pdfFiles = request.files()
        //@ts-ignore
       const pdfPaths = await reportServices.streamPdfs(pdfFiles)
        
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

  getCloseReports: async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const reports = await prisma.reportReceived.findMany({
        // @ts-ignore
        where: {status: {contains: "close"}} 
      });
      reply.send(reports).status(200);
    } catch (error) {
      console.log(error);
      reply.send({ message: error }).status(404);
    }
  },

  getReportByLead: async(request: FastifyRequest<{ Params: { leadNumber: string }}>, reply: FastifyReply) => {
    try {
      const leadNumber = request.params.leadNumber;
      const report = await prisma.reportReceived.findUnique({
        where: { leadNumber },
        include: {
          //@ts-ignore
          completionReport: true,
          reportsDocuments: true,

        },
      });
      reply.send(report).status(200);
    } catch (error) {
      reply.send({ message: error }).status(404);
    }
  },

  createCompletionReport: async (request: FastifyRequest<{ Params: { leadNumber: string }}>, reply: FastifyReply) => {
    try {
      const { leadNumber } = request.params
      const data = request.body as RequestCompletionReport
      //@ts-ignore
      await prisma.completionReport.create({
        data: {
          lead: {
            connect: {
              leadNumber
            },
          },
          ...data
        }
      });
      
      reply.status(201);
    } catch (error) {
      console.log(error)
      reply.send({ message: error }).status(404)
    }
  },


};
