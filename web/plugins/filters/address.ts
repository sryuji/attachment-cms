import { differenceInMonths } from 'date-fns'
import { parseDate } from './date'

export function formatTel(value: string): string {
  if (value.length === 11) {
    return `${value.substring(0, 3)}-${value.substring(3, 7)}-${value.substring(7, 11)}`
  } else if (value.length === 10) {
    return `${value.substring(0, 2)}-${value.substring(2, 6)}-${value.substring(6, 10)}`
  } else {
    return value
  }
}

export function formatZipCode(value: string): string {
  if (!value || value.length !== 7) return value
  return `${value.substring(0, 3)}-${value.substring(3)}`
}

export function convertAge(value: string | Date): string {
  if (!value) return ''
  value = parseDate(value)
  const monthesAge = differenceInMonths(new Date(), value)
  const age = Math.trunc(monthesAge / 12)
  const m = (monthesAge % 12) + 1
  return `${age}歳${m}ヶ月`
}
