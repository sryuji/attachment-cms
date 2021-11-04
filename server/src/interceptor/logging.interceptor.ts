import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { format } from 'date-fns'
import { FastifyReply, FastifyRequest } from 'fastify'

export function outputResponseLog(res: FastifyReply) {
  const resTime = Math.ceil(res.getResponseTime())
  const resTimeMessage = resTime ? `${resTime} ms.` : 'no response time.'
  return `Response ${res.statusCode} response. ${resTimeMessage}`
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest<FastifyRequest>()
    const res = ctx.getResponse<FastifyReply>()

    const now = Date.now()
    const startTime = format(now, 'yyyy-MM-dd HH:mm:ss.SSS')
    Logger.log(`Request ${req.method} ${req.url} at ${startTime}`)
    Logger.log({ body: req.body })
    return next.handle().pipe(
      tap(() => {
        this.logResponse(req, res, now)
      })
    )
  }

  private logResponse(req: FastifyRequest, res: FastifyReply, now: number) {
    // HACK: 苦肉の策だが、setTimeoutしないとresponse.stausCodeが正しく取れない
    setTimeout(() => {
      const message = outputResponseLog(res)
      Logger.log(message)
    }, 0)
  }
}
