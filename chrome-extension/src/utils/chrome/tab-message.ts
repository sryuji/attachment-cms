import { getCurrentTab } from './tabs'

abstract class TabMessage {
  type: string

  async send(tab: chrome.tabs.Tab) {
    tab ||= await getCurrentTab()
    console.log(tab.id, this)
    // chrome.tabs.sendMessage(tab.id, this, (response) => console.log('response callback', response))
    chrome.tabs.sendMessage(tab.id, this)
  }
}

// from background to content-script
export class SelectScopeMessage extends TabMessage {
  constructor() {
    super()
    this.type = 'SelectScopeMessage'
  }
}
