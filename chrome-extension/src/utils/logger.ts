import { isError, isPureObject } from './object'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LoggerType = (message?: any, ...optionalParams: any[]) => void

class Logger {
  private loggers: Record<string, LoggerType>
  private isDebug: boolean

  constructor() {
    this.isDebug = process.env.NODE_ENV !== 'production'
    if (this.isDebug) {
      this.loggers = { log: () => null, info: () => null, warn: console.warn, error: console.error }
    } else {
      this.loggers = { log: console.log, info: console.info, warn: console.warn, error: console.error }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(...args: any[]) {
    this.output(this.loggers.log, args)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(...args: any[]) {
    this.output(this.loggers.info, args)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(...args: any[]) {
    this.output(this.loggers.warn, args)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(...args: any[]) {
    this.output(this.loggers.error, args)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logger(logger: () => void, ...args: any[]) {
    this.output(logger, args)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private output(logger: LoggerType, args: any[]) {
    if (!args || args.length === 0) return

    const messages = args.map((arg) => {
      if (isError(arg)) return arg.stack
      if (isPureObject(arg)) return JSON.stringify(arg)
      return arg
    })
    logger(messages)
  }
}

export const logger = new Logger()
