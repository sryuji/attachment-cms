import { format as dateFormat, parseISO, differenceInDays } from 'date-fns'
import jaLocale from 'date-fns/locale/ja'
import { isString } from '~/assets/javascripts/modules/string'

export function parseDate(value: string | Date): Date {
  if (!value) return null
  if (value instanceof Date) return value
  return parseISO(value)
}

export function formatDate(value: string | Date, format = 'YYYY/MM/DD'): string {
  if (!value) return ''
  if (isString(value)) value = parseDate(value)
  return dateFormat(value, format, { locale: jaLocale })
}

export function formatTime(value: string | Date, format = 'HH:mm'): string {
  if (!value) return ''
  if (isString(value)) value = parseDate(value)
  return dateFormat(value, format)
}

export function formatDatetime(value: string | Date, format = 'MM/DD HH:mm'): string {
  if (!value) return ''
  if (isString(value)) value = parseDate(value)
  return dateFormat(value, format, { locale: jaLocale })
}

export function toDaysAgoFromNow(value: string | Date): string {
  if (!value) return ''
  if (isString(value)) value = parseDate(value)
  const daysAgo = differenceInDays(new Date(), value)
  return daysAgo === 0 ? '今日' : `${daysAgo}日前`
}
