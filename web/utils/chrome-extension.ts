export function sendToAcmsRuntime(data: any) {
  window.dispatchEvent(new CustomEvent('SendToAcmsRuntime', { detail: data }))
}

export function addRequestFromAcmsRuntimeListener(fn: (data: any) => {}) {
  const listener = ((ev: CustomEvent) => {
    fn(ev.detail)
  }) as EventListener
  window.addEventListener('RequestFromAcmsRuntime', listener)
  return listener
}

export function removeRequestFromAcmsRuntimeListener(listener: EventListener) {
  window.removeEventListener('RequestFromAcmsRuntime', listener)
}
