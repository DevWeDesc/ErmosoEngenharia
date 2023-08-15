import {FastifyReply, FastifyRequest, fastify} from 'fastify'
import cors from '@fastify/cors'
import { usersRoutes } from './routes/users.routes'
import { reportRoutes } from './routes/reports.routes'
const app = fastify()

app.register(cors, {origin: true})

app.register(usersRoutes)
app.register(reportRoutes)
app.get('/', async (_req: FastifyRequest, reply: FastifyReply) => {
  reply.send({ api: 'ok' })
})

app.listen({ port: 3333, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Servidor iniciado porta: ${address}`)
})