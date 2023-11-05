import { FastifyInstance, FastifyRequest } from "fastify"

export async function queryParams(app: FastifyInstance) {
  
  app.get('/query', (req: FastifyRequest<{ Querystring: { name: string, tel: string }}>, reply) => {
    
    const { name, tel } = req.query

    if (name === undefined || tel === undefined ) {
      const exemple = 'See exemple: http://localhost:3333/query?name=matheus&tel=9899889'

      return reply.send(`Error: Must have query params "name" and "tel". You can use & to add another params. ${exemple} `)
    }
    
    reply.send(`Name is ${name}. and phone: ${tel}`)
  })

}