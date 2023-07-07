import { FastifyInstance } from 'fastify'
import { userController } from '../controllers/userController'
import dotenv from "dotenv"
dotenv.config({
  path: "src/security/.env"
});

const secret = process.env.JWT_TOKEN;


export async function usersRoutes(app:FastifyInstance) {
  app.post('/users', userController.createUser)
  app.get('/users', userController.getUsers)
  app.post('/login', userController.loginUser)
}


console.log("SECRET LOG",secret)