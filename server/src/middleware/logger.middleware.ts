import { Injectable, NestMiddleware } from '@nestjs/common'
import { IncomingMessage, OutgoingMessage } from 'http'

/**
 * Deprecated
 *
 * expressの時と異なり、FastifyRequestを受け取れないため、req.localsに値を設定できない
 * ただ、Fastify側がresponse時間を提供してくれるのでそれを活用している
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: IncomingMessage, res: OutgoingMessage, next: () => void) {
    next()
  }
}
