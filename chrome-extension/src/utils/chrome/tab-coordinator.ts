export class TabCoordinator {
  acmsSiteTabId: number
  targetSiteTabId: number

  async openAcmsSiteUrl(url: string) {
    if (!url.startsWith('http')) throw new Error('Need http/https protocol')
    this.acmsSiteTabId = await this.createTab(url, this.acmsSiteTabId)
  }

  async openTargetSiteUrl(url: string) {
    if (!url.startsWith('http')) throw new Error('Need http/https protocol')
    this.targetSiteTabId = await this.createTab(url, this.targetSiteTabId)
  }

  sendToAcmsSite(message: any) {
    if (!this.acmsSiteTabId) throw new Error('Bug. acmsSiteTabId is empty')
    const promise = new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(this.acmsSiteTabId, message, (response) => {
        resolve(response)
      })
    })
    return promise
  }

  sendToTargetSite(message: any) {
    if (!this.targetSiteTabId) throw new Error('Bug. targetSiteTabId is empty')
    const promise = new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(this.targetSiteTabId, message, (response) => {
        resolve(response)
      })
    })
    return promise
  }

  private async createTab(url: string, tabId: number): Promise<number> {
    if (tabId) {
      await chrome.tabs.update(tabId, { url: url || undefined, active: true, highlighted: true })
      return tabId
    } else {
      const tab = await chrome.tabs.create({ url, active: true })
      return tab.id
    }
  }
}
