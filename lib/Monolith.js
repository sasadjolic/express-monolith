const express = require('express')

class Monolith {
  async run ({ app, port, bindings, quiet }) {
    // Create Express server.
    this.app = app || express()

    // Incorporate all services within the monolith.
    this.bindings = bindings.map((binding, index) => {
      // Create a unique routing scope for each service.
      binding.router = express.Router()
      binding.path = binding.path || ('/' + binding.name)
      this.app.use(`${binding.path}`, binding.router)
      return binding
    })

    // Wait for all services to become ready.
    for (const binding of this.bindings) {
      await binding.service.ready(binding.router)
    }

    // Run HTTP server.
    this.server = this.app.listen(port, () => {
      if (!quiet) {
        console.log(`Listening on port ${port}`)
        console.log(`Running ${this.bindings.length} service${this.bindings.length == 1 ? '' : 's'}:`)
      }
      this.bindings.forEach(binding => console.log(`  ${binding.name} on ${binding.path}`))
    })

    return this
  }
}

module.exports = Monolith
