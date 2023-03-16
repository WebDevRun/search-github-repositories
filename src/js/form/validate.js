const toValidate = {}

function isEmpty(elements) {
  const emptyElements = []
  let status = false

  for (const element of elements) {
    if (element.value === '') {
      emptyElements.push({ element, status: 'empty' })
      status = true
    }
  }

  return [status, emptyElements]
}

export function validate() {
  let isValid = false
  const notValidElements = []

  const [emptyStatus, emptyElements] = isEmpty(toValidate.notEmpty)

  isValid = emptyStatus

  notValidElements.push(...emptyElements)

  return [isValid, notValidElements]
}

export function setToValidate({ notEmpty = [] }) {
  toValidate.notEmpty = notEmpty
}
