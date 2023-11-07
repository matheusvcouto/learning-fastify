import { database } from "../database/db"
import  AppError  from "../utils/serverError"
import { FastifyReply, FastifyRequest } from "fastify"
import { User } from "../types/users"


const db = new database()


// procurar tipagem para estender a classe com os metodos do fastify

export class UserController {

  list(req: FastifyRequest, reply:FastifyReply) {
    const users = db.select('users')
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
      name, 
      email, 
      password, 
    }

    db.insert('users', user)

    const { method } = req

    reply.code(201).send({
      method,
      user,
    })

  }
}