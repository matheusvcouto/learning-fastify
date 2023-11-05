
import { FastifyReply, FastifyRequest } from "fastify"

interface User {
  name: string
  email: string
  password: string
}


export class UserController {

  list(req: FastifyRequest, reply:FastifyReply) {
    const { method } = req
    return reply.send({ method, menssager: `List user` })
  }

  create(req: FastifyRequest<{Body: User}>, reply: FastifyReply) {

    const { name, email, password } = req.body

    if (!name) {
      return reply.code(400).send({
        statusCode: 400,
        error: 'Bad Request',
        menssager: `you did not send information about 'name' on request`
      })
    } else if (!email) {
      return reply.code(400).send({
        statusCode: 400,
        error: 'Bad Request',
        menssager: `You did not send information about 'email' on request`
      })
    } else if (!password) {
      return reply.code(400).send({
        statusCode: 400,
        error: 'Bad Request',
        menssager: `You did not send information about 'password' on request`
      })
    }

    const user: User = { 
      name, 
      email, 
      password, 
    }

    const { method } = req

    reply.send({
      method,
      user,
    })

  }
}