
import { routerParams } from "./router-params"
import { queryParams } from "./query-params"
import { UserController } from './controllers/Usercontroller'
import fastify from "fastify"

export const app = fastify()

app.register(routerParams)
app.register(queryParams)

const userController = new UserController()

app.get('/', (req, reply) => {
  return reply.send({ messager: 'Hello word' })
})

app.get('/users', userController.list)
app.post('/users', userController.create)

// https://fastify.dev/docs/latest/Reference/Server/#printroutes

app.ready(() => {
  console.log(app.printRoutes())
  // console.log(app.printRoutes({ method: 'GET'}))
})

const port = 3333
const host = 'localhost'

app.listen({ port, host, }).then((port) => console.log(`server on port ${port}`))

