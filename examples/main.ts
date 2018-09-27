import * as express from 'express'
import { Monolith, Service } from '../'

async function main () {
  // Create and run the monolith web server. All services will be running within the monolith.
  await new Monolith().run({ port: Number(process.env.PORT) || 3000, bindings: [
    { path: '/', name: 'hello', service: new HelloWorldService() }
  ]})
}

class HelloWorldService extends Service {
  async ready (router: express.Router) {
    router.get('/', (req, res) => {
      res.write('Hello, world!')
      res.status(200).send()
    })
  }
}

// Run server.
main()
