
import { routes } from "../routes/routes"
import { UserController } from '../controllers/UserController'
import { myMiddleware } from "../middleware/middleware"
import fastify from "fastify"
import onErrorHook from "../hooks/onErrorHook"

const app = fastify()

onErrorHook(app)

app.addHook('onRequest', async (req, reply) => myMiddleware(req, reply))

app.get('/', (req, reply) => {
  return reply.send({ messager: 'Hello word' })
})

app.register(routes)  

// Adiciononando Middleware global


const userController = new UserController()

app.get('/users', userController.list)
app.post('/users', userController.create)
app.put('/users/:id', userController.update)
app.delete('/users/:id', userController.delete)

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

