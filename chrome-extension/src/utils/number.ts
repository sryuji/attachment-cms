export function isNumber(value: unknown): value is number {
  return ['number', 'bigint'].includes(typeof value) || value instanceof Number || value instanceof BigInt
}
