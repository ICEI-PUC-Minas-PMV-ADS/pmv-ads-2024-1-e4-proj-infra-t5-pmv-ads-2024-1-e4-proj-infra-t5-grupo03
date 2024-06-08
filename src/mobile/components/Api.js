import axios from 'axios'

const api = (module, route, method, data) => {
  if (!module || !route) throw new Error('Módulo e rota são obrigatórios')

  // if (data) {
  //   requestOptions.body = JSON.stringify(data);
  // }
  console.log(process.env.GATEWAY_API_URL)
  const http = axios.post(
    process.env.GATEWAY_API_URL ?? 'http://localhost:1337/makeRequest',
    data,
    {
      headers: {
        token: process.env.AUTH_TOKEN ?? '12345',
        module: module,
        route: route,
        method: method
      },
    }


  )
  return http.data || http;
}

export { api }

