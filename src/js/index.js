import { formHandler, setToValidate } from './form/index.js'
import { setContainer } from './repositories/index.js'

const form = document.forms[0]
const repositories = document.querySelector('#repositories')

const toValidateElements = { notEmpty: [form.text] }
setToValidate(toValidateElements)

setContainer(repositories)

form.text.focus()
form.addEventListener('submit', formHandler)
