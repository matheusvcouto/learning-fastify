import { Database } from "../database/db"
import  AppError  from "../utils/serverError"
import { FastifyReply, FastifyRequest } from "fastify"
import { User } from "../types/users"
import { randomUUID } from "crypto"


const database = new Database()


// procurar tipagem para estender a classe com os metodos do fastify

export class UserController {

  list() {
    const users = database.select('users')
    return users
  }

  create(req: FastifyRequest<{Body: User}>, reply: FastifyReply) {

    const { name, email, password } = req.body

    if (!name) {
      throw new AppError('Nome é obrigatório', 401)
    } else if (!email) {
      throw new AppError('email é obrigatório', 401)
    } else if (!password) {
      throw new AppError('password é obrigatório', 401)
    }

    const user: User = {
      id: randomUUID(),
      name, 
      email, 
      password, 
    }

    database.insert('users', user)

    const { method } = req

    reply.code(201).send({
      method,
      user,
    })

  }

  delete(req: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply) {

    const { id } = req.params

    database.delete('users', id)
    
    return reply.code(204).send('usuario apagado')
    
  }
}