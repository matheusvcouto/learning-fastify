import { FastifyReply, FastifyRequest } from "fastify";

export async function routeThree(req: FastifyRequest, reply: FastifyReply) {

  const { method } = req
  
  return reply.send({
    method,
    message: 'route three'
  })
}