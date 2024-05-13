import axios from 'axios'

const api = (module, route) => {
  if (!module || !route) throw new Error('Módulo e rota são obrigatórios')

  const http = axios.create({
    baseURL: process.env.GATEWAY_API_URL,
    headers: {
      token: process.env.AUTH_TOKEN,
      module: module,
      route: route,
    },
  })
  http.post('/')
  return {
    get: (axiosConfig = {}) =>
      http.post('/', undefined, { ...axiosConfig, headers: { method: 'GET' } }),
    post: (data, axiosConfig = {}) =>
      http.post('/', data, { ...axiosConfig, headers: { method: 'POST' } }),
    put: (data, axiosConfig = {}) =>
      http.post('/', data, { ...axiosConfig, headers: { method: 'PUT' } }),
    delete: (data, axiosConfig = {}) =>
      http.post('/', data, { ...axiosConfig, headers: { method: 'DELETE' } }),
  }
}

export { api }
