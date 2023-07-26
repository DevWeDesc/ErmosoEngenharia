import { FastifyInstance } from 'fastify'
import { userController } from '../controllers/userController'
import { UserIsAuth } from '../middlewares/auth'


export async function usersRoutes(app:FastifyInstance) {
//{onRequest: [UserIsAuth]},
  app.post('/users', userController.createUser)
  app.get('/users',  userController.getUsers)
  app.get('/user/:id',  userController.getUserById)
  app.post('/login', userController.loginUser)
  app.post('/decodetoken', userController.decodeToken)
  app.put('/user/:id', userController.updateUser)
}
