export interface Options {
  method?: string
  headers?: Record<string, string>
  body?: any
  signal?: AbortSignal
}

export const helpHttp = () => {
  const customFetch = async (endpoint: string, options: Options) => {
    const defaultHeader = {
      accept: 'application/json'
    }

    const controller = new AbortController()
    options.signal = controller.signal

    options.method = options.method || 'GET'
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader

    options.body = JSON.stringify(options.body) || false
    if (!options.body) delete options.body
    // console.log(options)

    setTimeout(() => controller.abort(), 3500)

    try {
      const res = await fetch(endpoint, options)
      return await (res.ok
        ? res.json()
        : Promise.reject({
            err: true,
            status: res.status || '00',
            statusText: res.statusText || 'Ocurrio un ERROR'
          }))
    } catch (err) {
      return err
    }
  }

  const get = (url: string, options: Options = {}) => {
    customFetch(url, options)
  }

  const post = (url: string, options: Options = {}) => {
    options.method = 'POST'
    return customFetch(url, options)
  }

  const put = (url: string, options: Options = {}) => {
    options.method = 'PUT'
    return customFetch(url, options)
  }

  const del = (url: string, options: Options = {}) => {
    options.method = 'DELETE'
    // console.log(url)
    // console.log(options)
    return customFetch(url, options)
  }

  return {
    get,
    post,
    put,
    del
  }
}
