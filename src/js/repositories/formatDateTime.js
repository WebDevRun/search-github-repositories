import { formatDateTimeNumber } from '../utils/formatDateTimeNumber.js'

export function formatDateTime(dateValue) {
  const fullDate = new Date(dateValue)

  const year = fullDate.getFullYear()
  const month = formatDateTimeNumber(fullDate.getMonth() + 1)
  const date = formatDateTimeNumber(fullDate.getDate())

  return `${date}.${month}.${year}`
}
