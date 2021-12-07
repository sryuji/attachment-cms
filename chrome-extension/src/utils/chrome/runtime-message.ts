abstract class RuntimeMessage {
  constructor() {
    this.type = this.constructor.name
  }
  type: string

  send() {
    chrome.runtime.sendMessage(this)
  }
}

// from content-script etc.. to background
export class CompletedMessage extends RuntimeMessage {
  constructor() {
    super()
    this.type = 'CompletedMessage'
  }
}
export class ErrorMessage extends RuntimeMessage {
  constructor() {
    super()
    this.type = 'ErrorMessage'
  }
  message: string
}
