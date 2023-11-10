import { Database } from "../database/db"
import  AppError  from "../utils/serverError"
import { FastifyReply, FastifyRequest } from "fastify"
import { User } from "../types/users"
import { randomUUID } from "crypto"
import { queryParams } from "../routes/query-params"


const database = new Database()


// procurar tipagem para estender a classe com os metodos do fastify

export class UserController {

  list(req: FastifyRequest<{ Querystring: {search?: string}}>) {

    const { search } = req.query

    const wasSearch = search ? { name: search, email: search, } : null

    const users = database.select('users', wasSearch)
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

  update(req: FastifyRequest<{ Params: { id: string }, Body: User}>, reply: FastifyReply) {

    const { id } = req.params

    const { name, email, password } = req.body

    const updateUser = {
      id,
      name, 
      email, 
      password,
    }

    database.update('users', updateUser)

    return reply.code(200).send(updateUser)
  }


  delete(req: FastifyRequest<{ Params: { id: string }}>, reply: FastifyReply) {

    const { id } = req.params

    database.delete('users', id)
    
    return reply.code(204).send('usuario apagado')

  }
}