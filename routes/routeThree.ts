import { FastifyReply, FastifyRequest } from "fastify";
import { Database } from "../database/db";
import { User } from "../types/users";

const database = new Database()


export async function routeThree(req: FastifyRequest<{ Body: User }>, reply: FastifyReply) {

  const { method } = req
  
  database.insert('tabele', req.body)
  
  return reply.send({
    method,
    message: 'route three'
  })
}