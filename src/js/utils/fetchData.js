let isError = false

export async function fetchData(url) {
  try {
    const response = await fetch(url)

    if (response.ok) return [isError, await response.json()]

    isError = true
    return [isError, response.statusText]
  } catch (error) {
    isError = true
    return [isError, error.message]
  }
}
