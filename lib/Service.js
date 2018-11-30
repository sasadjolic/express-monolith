const EventEmitter = require('events')

class Service extends EventEmitter {
  async ready (router) {
  }

  async stop () {
  }

  report (error) {
    this.emit('error', error)
  }
}

module.exports = Service
