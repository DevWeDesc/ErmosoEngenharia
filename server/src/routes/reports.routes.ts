import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { reportReceveid } from '../controllers/reportReceveidController'
import { ExternalAuth } from '../middlewares/externalAuth'
import multipart from '@fastify/multipart'
import path from "path";
import fs from 'fs'

export async function reportRoutes(app:FastifyInstance) {
    app.register(multipart, {
        limits: {
            fileSize: 35 * 1024 * 1024,  // 35mb limit
          }
    })
    app.post("/ermosoreports", reportReceveid.createNewReport)
    app.get("/report/:leadNumber", reportReceveid.getReportByLead)
    app.post("/ermosopdfs/:leadNumber", reportReceveid.createPdfFiles)
    app.get("/reports", reportReceveid.getReceveidsReports)
    app.get("/closereports", reportReceveid.getCloseReports)
    app.post("/completionreport/:leadNumber", reportReceveid.createCompletionReport)
    app.get("/dowload/:fileId", async (request: FastifyRequest<{Params:{ fileId: string}}>, reply: FastifyReply) => {
        const {fileId} = request.params 
        const filePath = path.join(__dirname, '..', '..', 'pdfs', `${fileId}.pdf`)
        try {
            // Verificar se o arquivo PDF existe
            if (!fs.existsSync(filePath)) {
              reply.code(404).send('Arquivo não encontrado');
              return;
            }

            // Definir o tipo de conteúdo como application/pdf
            reply.type('application/pdf');

            // Ler o arquivo PDF usando fs.createReadStream() 
            reply.header('Content-Disposition', `attachment; filename="${fileId}.pdf"`);
            const stream = fs.readFileSync(filePath);

            reply.send(stream);
        } catch (error) {
          reply.send(error)
          console.log(error)
        }
    })
}