export class PopupWindow {
  vid: number
  left: number

  constructor(options?: Record<'left', number>) {
    this.vid = -1
    this.left = options && options.left
  }

  create(url: string) {
    chrome.windows.get(this.vid, (window) => {
      if (!chrome.runtime.lastError && window) {
        chrome.windows.update(this.vid, { focused: true })
        return
      }
      chrome.windows.create({ url, type: 'popup', focused: true, left: this.left }, (window) => (this.vid = window.id))
    })
  }
}
