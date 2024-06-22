import axios from 'axios'

const api = (module, route, method, data, searchQuery, page) => {
  try {
    if (!module || !route) throw new Error('Módulo e rota são obrigatórios');
    console.log('Query:', searchQuery)
    
    const url = searchQuery ?
      (process.env.GATEWAY_API_URL + '?searchQuery=' + searchQuery || 'http://localhost:1337/makeRequest?searchQuery=' + searchQuery) :
      (process.env.GATEWAY_API_UR || 'http://localhost:1337/makeRequest');
    console.log(url)
     
    //const url = searchQuery ? 'http://localhost:1337/makeRequest?searchQuery=' + searchQuery : 'http://localhost:1337/makeRequest'
    const http = axios.post(
      url,
      data,
      {
        headers: {
          token: process.env.AUTH_TOKEN ?? '12345',
          module: module,
          route: route,
          method: method,
          searchquery: searchQuery,
          page: page || 1,
          searchQuery
        },
      }
    );

    return http.data || http;
  } catch (error) {
    throw error;
  }
}

export { api }

