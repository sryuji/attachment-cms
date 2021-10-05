export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function numberWithDelimiter(value: number | string): string {
  if (!value && value !== 0) return ''
  const parts = value.toString().split('.')
  parts[0] = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  return parts.join('.')
}

export function ceil(value: number): number {
  if (!value) return 0
  return Math.ceil(value)
}

export function round(value: number, cordinator = 0): number {
  if (!value) return 0
  return Math.round(value * cordinator) / cordinator
}
