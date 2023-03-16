export function formatDateTimeNumber(number) {
  return number < 10 ? `0${number}` : `${number}`
}
