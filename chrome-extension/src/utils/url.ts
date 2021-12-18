export function getPathname(url: string): string {
  try {
    return new URL(url).pathname
  } catch {
    return ''
  }
}

export function getOrigin(url: string): string {
  try {
    return new URL(url).origin
  } catch {
    return ''
  }
}
