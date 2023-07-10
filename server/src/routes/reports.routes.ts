import { FastifyInstance } from 'fastify'
import { reportReceveid } from '../controllers/reportReceveidController'
import { ExternalAuth } from '../middlewares/externalAuth'

export async function reportRoutes(app:FastifyInstance) {
    app.post("/ermosoreports", {preHandler: ExternalAuth} ,reportReceveid.createNewReport)
}