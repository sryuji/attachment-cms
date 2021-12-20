export type Message = Record<string, any> & { type: string }

export function sendToAcmsRuntime(message: Message) {
  window.dispatchEvent(new CustomEvent('SendToAcmsRuntime', { detail: message }))
}

export function addRequestFromAcmsRuntimeListener(fn: (message: Message) => {}) {
  const listener = ((ev: CustomEvent) => {
    fn(ev.detail)
  }) as EventListener
  window.addEventListener('RequestFromAcmsRuntime', listener)
  return listener
}

export function removeRequestFromAcmsRuntimeListener(listener: EventListener) {
  window.removeEventListener('RequestFromAcmsRuntime', listener)
}

export function hasExtension(): boolean {
  return !!sessionStorage.getItem('acmsExtension')
}
