import { v4 as uuidV4 } from 'uuid'

export function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String
}

export function generateUUIDv4(): string {
  return uuidV4()
}
