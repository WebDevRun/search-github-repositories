import { formatDateTime } from './formatDateTime.js'
import { setContainer, getContainer } from './container.js'

function createUserElement({ login, avatarUrl, htmlUrl }) {
  const link = document.createElement('a')
  link.href = htmlUrl
  link.target = '_blank'
  link.classList.add('repository__user')

  const img = document.createElement('img')
  img.src = avatarUrl
  img.alt = 'avatar-url'
  img.classList.add('repository__user-avatar')

  const p = document.createElement('p')
  p.textContent = login
  p.classList.add('repository__user-login')

  link.append(img, p)

  return link
}

function createTopBoard({ htmlUrl, name }) {
  const topBoard = document.createElement('div')
  topBoard.classList.add('repository__top-board')

  const repositoryName = document.createElement('p')
  repositoryName.classList.add('repository__name')

  const span = document.createElement('span')
  span.textContent = 'Наименование: '

  const link = document.createElement('a')
  link.href = htmlUrl
  link.target = '_blank'
  link.textContent = name
  link.classList.add('repository__link')

  repositoryName.append(span, link)
  topBoard.append(repositoryName)

  return topBoard
}

function createBottomBoard({
  createAt,
  updateAt,
  forksCount,
  stargazersCount,
  size,
}) {
  const bottomBoard = document.createElement('div')
  bottomBoard.classList.add('repository__bottom-board')

  const createAtElement = document.createElement('p')
  createAtElement.classList.add('repository__created-at')
  createAtElement.textContent = `Дата создания: ${formatDateTime(createAt)}`

  const updateAtElement = document.createElement('p')
  updateAtElement.classList.add('repository__updated-at')
  updateAtElement.textContent = `Дата изменения: ${formatDateTime(updateAt)}`

  const watchersCountElement = document.createElement('p')
  watchersCountElement.classList.add('repository__forks-count')
  watchersCountElement.textContent = `Кол-во форков: ${forksCount}`

  const starsCountElement = document.createElement('p')
  starsCountElement.classList.add('repository__stars-count')
  starsCountElement.textContent = `Кол-во звезд: ${stargazersCount}`

  const sizeElement = document.createElement('p')
  sizeElement.classList.add('repository__size')
  sizeElement.textContent = `Размер: ${size} бит`

  bottomBoard.append(
    createAtElement,
    updateAtElement,
    watchersCountElement,
    starsCountElement,
    sizeElement
  )

  return bottomBoard
}

function createRepositoryElement({
  name,
  size,
  html_url,
  forks_count,
  stargazers_count,
  created_at,
  updated_at,
  owner,
}) {
  const container = document.createElement('div')
  container.classList.add('repository')

  const { login, avatar_url: avatarUrl, html_url: htmlUrl } = owner
  const userElement = createUserElement({ login, avatarUrl, htmlUrl })

  const infomationElement = document.createElement('div')
  infomationElement.classList.add('repository__infomation')

  const topBoard = createTopBoard({ htmlUrl: html_url, name })
  const bottomBoard = createBottomBoard({
    createAt: created_at,
    updateAt: updated_at,
    forksCount: forks_count,
    stargazersCount: stargazers_count,
    size,
  })

  infomationElement.append(topBoard, bottomBoard)
  container.append(userElement, topBoard, bottomBoard)

  return container
}

function createNotFoundElement(text) {
  const notFound = document.createElement('p')
  notFound.classList.add('error-message')
  notFound.textContent = text

  return notFound
}

export function createRepositoriesElement(items, message) {
  const containerElement = getContainer()
  const copyContainerElement = containerElement.cloneNode(false)

  if (items.length === 0) {
    const notFoundElement = createNotFoundElement(message)
    copyContainerElement.append(notFoundElement)
  }

  for (const item of items) {
    const repositoryElement = createRepositoryElement(item)
    copyContainerElement.append(repositoryElement)
  }

  containerElement.replaceWith(copyContainerElement)
  setContainer(copyContainerElement)
}
