import { routerParams } from "../routes/router-params"
import { queryParams } from "../routes/query-params"
import { FastifyInstance, FastifyRequest } from "fastify"
import { specificMiddleware } from "../middleware/specificMiddleware"
import { routeThree } from "./routeThree"
import { User } from "../types/users"

export async function routes(app: FastifyInstance) {

  app.register(routerParams)
  app.register(queryParams)

  // Definição de uma rota específica com um hook
  app.route({
    method: ['GET', 'POST'],
    url: '/one',
    preHandler: async (req, reply) => {
      await specificMiddleware(req, reply)
    },
    handler: async (req, reply) => {
      return { hello: 'Esta rota tem um middleware específico' }
    }
  })

  app.route({
    method: ['GET', 'POST'],
    url: '/two',
    handler: async (req, reply) => {
      return reply.send({
        metodo: req.method,
        message: 'Route two teste'
      })
    }
  })

  app.route({
    method: 'POST',
    url: '/three',
    handler: async (req: FastifyRequest<{ Body: User }>, reply) => routeThree(req, reply)
  });
}

