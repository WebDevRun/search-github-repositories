import { validate } from './validate.js'
import { setError } from './errorWorker.js'
import { fetchData } from '../utils/fetchData.js'
import { urlTransformer } from '../utils/urlTransformer.js'
import {
  createRepositoriesElement,
  createErrorElement,
} from '../repositories/index.js'

const urlConfig = {
  baseUrl: 'https://api.github.com',
  path: '/search/repositories',
  limit: 10,
}
export async function formHandler(event) {
  event.preventDefault()

  const [status, elements] = validate()

  if (status) {
    setError(elements)
    return
  }

  const { baseUrl, path, limit } = urlConfig
  const query = event.target.text.value

  const fetchUrl = urlTransformer(
    `${baseUrl}${path}?q=${query}&per_page=${limit}`
  )
  const [isError, data] = await fetchData(fetchUrl.href)

  if (isError) {
    createErrorElement('Ой ошибка...')
    return
  }

  createRepositoriesElement(data.items, 'Ничего не найдено :(')
}
