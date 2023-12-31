# learning-fastify

this projet is just for learnig and testing


## Tratamento de error: 
add this code on folder utils
```ts
// add this code on folder utils
export default class AppError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number = 400) {
    super(message) // Chama o construtor da classe Error com a mensagem fornecida. Isso garante que a propriedade message do erro seja definida.
    this.statusCode = statusCode // Define a propriedade statusCode da instância AppError com o valor fornecido.
    Object.setPrototypeOf(this, new.target.prototype) // isso restaura a cadeia de protótipos, que pode ser quebrada quando estendendo classes nativas como Error. Isso é necessário para garantir que a instância seja do tipo correto (instanceof AppError funcionará como esperado).
}
```
add in folder Middleware a onErrorHook.ts
```ts
// add in folder Middleware a onErrorHook.ts

import { FastifyInstance, HookHandlerDoneFunction } from 'fastify'
import AppError from '../utils/serverError'

export default function onErrorHook(app: FastifyInstance): void {
  app.addHook( // Isso adiciona um gancho de erro ao aplicativo Fastify. O gancho de erro é chamado sempre que ocorre um erro durante o processamento de uma requisição.
    'onError',
    (request, reply, error, done: HookHandlerDoneFunction) => {

      if (error instanceof AppError) {
        reply.status(error.statusCode).send({ error: error.message })
      } 

      console.log('ERROR no servidor: ', error)
      reply.send(error)      
    }
  )
}
```
 finally import onErrorHook and add fastfyInstance inside
```ts
// finally import onErrorHook and add fastfyInstance inside

const app = fastify()

onErrorHook(app)
```
Se não tiver erros durante o uma requisição no Fastify, o gancho onError que foi definido não será acionado. 

A função addHook('onError', ...) é uma função de tratamento de erros, só é chamada quando um erro ocorre durante o ciclo de vida de uma requisição.

```ts
// pode ser usado dessa forma informando no primeiro a mensagem de erro e no seguindo parametro o status code

if (!name) {
  throw new AppError('Nome é obrigatório', 401)
}
```

