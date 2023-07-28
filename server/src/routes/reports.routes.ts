import { FastifyInstance } from 'fastify'
import { reportReceveid } from '../controllers/reportReceveidController'
import { ExternalAuth } from '../middlewares/externalAuth'
import multipart from '@fastify/multipart'

export async function reportRoutes(app:FastifyInstance) {

    app.register(multipart)
    app.post("/ermosoreports", {preHandler: ExternalAuth} ,reportReceveid.createNewReport)
    app.post("/ermosopdfs/:leadNumber", reportReceveid.createPdfFiles)
    app.get("/reports", reportReceveid.getReceveidsReports)
}