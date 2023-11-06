import { FastifyReply, FastifyRequest } from "fastify";

export async function myMiddleware(req: FastifyRequest, reply: FastifyReply) {
  const isAuthenticated = true

  if (!isAuthenticated) {
    return reply.code(401).send({ error: 'Não Autorizado' });
  }

  // Se isAuthenticated for verdadeiro, o hook não faz nada e a execução da rota continua
  
  console.log('Passed middleware')
}