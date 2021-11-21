export type ConstructorOptions = {
  message?: string
  baseData?: any
  baseError?: Error
}

export class ExtendableError extends Error {
  baseData: any
  constructor(options?: ConstructorOptions) {
    super((options && options.message) || '')
    this.baseData = (options && options.baseData) || null
    if (options && options.baseError) this.stack = options.baseError.stack
  }
}

export class ServerValidationError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'ServerValidationError'
  }
}
export class BadRequestError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'BadRequestError'
  }
}
export class ServerError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'ServerError'
  }
}
export class ForbiddenError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'ForbiddenError'
  }
}
export class NotFoundError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'NotFoundError'
  }
}
export class UnauthorizedError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'UnauthorizedError'
  }
}
export class RedirectError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'RedirectError'
  }
}
export class OptimisticLockError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'OptimisticLockError'
  }
}

export class ClientValidationError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'ClientValidationError'
  }
}
export class DoubleSubmitError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'DoubleSubmitError'
  }
}

// NOTE: リアルタイム通知などの並行処理により、処理重複するケースに処理キャンセルする時に利用
export class CancelProcessError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'CancelProcessError'
  }
}

export class NetworkError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'NetworkError'
  }
}

export class TimeoutError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'TimeoutError'
  }
}

export class ConfirmationCloseError extends ExtendableError {
  constructor(options?: ConstructorOptions) {
    super(options)
    this.name = 'ConfirmationCloseError'
  }
}
