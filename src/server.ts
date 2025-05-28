import fastify from 'fastify'
import cors from '@fastify/cors'
import { routes } from './routes'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(routes)

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => {
    console.log('🚀 HTTP Server running on http://localhost:3333')
  }) 