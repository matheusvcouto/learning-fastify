import { FastifyInstance, HookHandlerDoneFunction } from 'fastify'
import AppError from '../utils/serverError'

export default function onErrorHook(app: FastifyInstance): void {
  app.addHook(
    'onError',
    (request, reply, error, done) => {

      if (error instanceof AppError) {
        reply.status(error.statusCode).send({ error: error.message })
      }

      console.log('ERROR no servidor: ', error)
      reply.send(error)
      
    }
  )
}