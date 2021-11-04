import { ArgumentsHost, Logger, Inject, ExceptionFilter } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ConfigService } from '../config/config.service'
import { outputResponseLog } from '../interceptor/logging.interceptor'

export abstract class BaseExceptionFilter implements ExceptionFilter {
  protected config: ConfigService
  constructor(@Inject(ConfigService) config: ConfigService) {
    this.config = config
  }
  /**
   * throw new InternalServerErrorException(['test'])は、
   * Response: { statusCode: 500, error: "Internal Server Error", message: ['test'] }
   *
   * @param exception
   * @param host
   */
  catch(exception: Error, host: ArgumentsHost) {
    this.responseError(host, 500, exception.message, null)
  }

  protected responseError(
    host: ArgumentsHost,
    status: number,
    message: string | string[],
    options: Record<string, unknown> | undefined
  ) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<FastifyRequest>()
    const response = ctx.getResponse<FastifyReply>()
    response.code(status).send({
      statusCode: status,
      message: message,
      options: options,
    })
    this.logResponse(request, response, message)
  }

  private logResponse(request: FastifyRequest, reply: FastifyReply, errorMessage: string | string[]) {
    const code = reply.statusCode
    errorMessage = Array.isArray(errorMessage) ? errorMessage.join('. ') : errorMessage
    const defaultMessage = outputResponseLog(reply)
    const message = `${defaultMessage} ${errorMessage}`
    if (code && code < 400) {
      Logger.log(message)
    } else if (code && code < 500) {
      Logger.warn(message)
    } else {
      Logger.error(message)
    }
  }

  protected notify(exception: Error, level = 'error') {
    if (this.config.isDev || this.config.isTest) {
      Logger.error(exception.message, exception.stack)
    }
    // TODO: Sentryへ通知
  }
}
