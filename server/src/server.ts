import {fastify} from 'fastify'
import cors from '@fastify/cors'
import { usersRoutes } from './routes/users.routes'
import { reportRoutes } from './routes/reports.routes'
const app = fastify()

app.register(cors, {origin: true})

app.register(usersRoutes)
app.register(reportRoutes)

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Servidor iniciado porta: ${address}`)
})