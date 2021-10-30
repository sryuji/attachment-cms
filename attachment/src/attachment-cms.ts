import { ContentDto } from '../types/content.dto'

export class AttachmentCMS {
  private url: string
  private token: string
  private contents: ContentDto[]

  constructor(token: string, url?: string) {
    const urlParams = new URLSearchParams(window.location.search)
    this.token = urlParams.get('token') || token
    this.url = url || 'https://attachment-cms.dev'
  }

  async run() {
    await this.fetchContents()
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => {
        this.applyContents()
        this.observeElement()
      })
    } else {
      this.applyContents()
      this.observeElement()
    }
  }

  private async fetchContents() {
    const url = `${this.url}?token=${this.token}`
    const response = await fetch(url)
    const data: Record<string, ContentDto[]> = await response.json()
    this.contents = this.extractMatchedContents(data)
  }

  private extractMatchedContents(data: Record<string, ContentDto[]>): ContentDto[] {
    const pathList = Object.keys(data)
    const currentPath = window.location.pathname
    return pathList
      .filter((path) => {
        // TODO: API側で:wordは置換
        const regex = new RegExp(String.raw`^${path}$`, 'i')
        return currentPath.match(regex)
      })
      .map((path) => data[path])
      .flat()
  }

  // https://developer.mozilla.org/ja/docs/Web/API/MutationRecord
  private observeElement() {
    const bodyElement = document.querySelector('body')
    const mo = new MutationObserver((mutationsList: MutationRecord[]) => {
      console.log(mutationsList)
      this.applyContents()
    })
    const config: MutationObserverInit = {
      attributes: false,
      attributeOldValue: false,
      attributeFilter: [],
      characterData: true,
      characterDataOldValue: true,
      childList: true,
      subtree: true,
    }
    mo.observe(bodyElement, config)
  }

  private applyContents() {
    this.contents.forEach((r) => {
      const el = document.querySelector(r.selector)
      if (!el) return
      switch (r.action) {
        case 'innerHTML':
          el.innerHTML = r.content
          break
        case 'remove':
          el.parentNode.removeChild(el)
          break
        case 'insertBefore':
          el.insertAdjacentHTML('beforebegin', r.content)
          break
        case 'insertChildAfterBegin':
          el.insertAdjacentHTML('afterbegin', r.content)
          break
        case 'insertChildBeforeEnd':
          el.insertAdjacentHTML('beforeend', r.content)
          break
        case 'insertAfter':
          el.insertAdjacentHTML('afterend', r.content)
          break
      }
    })
  }
}
