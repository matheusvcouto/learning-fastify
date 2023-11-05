import { FastifyInstance, FastifyRequest } from "fastify"

export async function routerParams(app: FastifyInstance) {

  app.get('/router/one/:id', (req: FastifyRequest<{ Params: { id: string }}>, reply) => {

    const { id } = req.params
    reply.send(id)
  })

  app.get('/router/two/:id', (req, reply) => {
  
    const { id } = req.params as { id: string }
    reply.send(id)
  })

}

