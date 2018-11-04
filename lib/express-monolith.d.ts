// Type definitions for express-monolith
// Project: express-monolith
// Definitions by: Sasa Djolic <https://www.linkedin.com/in/sasadjolic/>

import * as express from 'express'

export class Monolith {
    run(options: { app?: express.Application, port: number, bindings: Array<Binding> }): Promise<Monolith>
}

export class Service {
    ready(router: express.Router): Promise<void>
}

type Binding = { path?: string, name: string, service: Service }
