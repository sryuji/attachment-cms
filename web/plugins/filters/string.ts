export function unit(value: string, unit: string): string {
  return value ? `${value} ${unit}` : ''
}

export function joinLine(...strings: string[]): string {
  return strings
    .filter((s) => {
      s = s ? s.trim() : ''
      return !!s
    })
    .join('\n')
}

export function nl2br(value: string): string {
  if (!value) return ''
  return value.replace(/\n/, '<br />')
}
