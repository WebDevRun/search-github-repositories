import { getContainer, setContainer } from './container.js'

export function createErrorElement(text) {
  const containerElement = getContainer()
  const copyContainerElement = containerElement.cloneNode(false)

  const notFound = document.createElement('p')
  notFound.classList.add('error-message')
  notFound.textContent = text

  copyContainerElement.append(notFound)
  containerElement.replaceWith(copyContainerElement)
  setContainer(copyContainerElement)
}
