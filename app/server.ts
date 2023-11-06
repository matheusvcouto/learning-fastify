

import { myMiddleware } from "../middleware/middleware"
import { routes } from "../routes/routes"
import { UserController } from '../controllers/UserController'

import fastify from "fastify"

const app = fastify()

app.get('/', (req, reply) => {
  return reply.send({ messager: 'Hello word' })
})

app.register(routes)

// Adiciononando Middleware global
app.addHook('onRequest', async (req, reply) => myMiddleware(req, reply))

const userController = new UserController()

app.get('/users', userController.list)
app.post('/users', userController.create)

// https://fastify.dev/docs/latest/Reference/Server/#printroutes

const port = 3333
const host = 'localhost'

app.ready(() => {
  console.log('routes')
  console.log(app.printRoutes({ commonPrefix: false}))
  // console.log(app.printRoutes({ method: 'GET'}))
})

app.listen({ port, host, }).then(() => {
  console.log(`Server online!`)
})

