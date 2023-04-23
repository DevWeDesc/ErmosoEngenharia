import {fastify} from 'fastify'
import cors from '@fastify/cors'
import { usersRoutes } from './routes/users.routes'
const app = fastify()

app.register(cors, {origin: true})

app.register(usersRoutes)

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log("Server Running")
})