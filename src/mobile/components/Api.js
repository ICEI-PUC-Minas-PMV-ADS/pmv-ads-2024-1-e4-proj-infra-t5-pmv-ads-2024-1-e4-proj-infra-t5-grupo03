import { GATEWAY_API_URL, AUTH_TOKEN } from '@env';

const api = (module, route) => {
  if (!module || !route) throw new Error('Módulo e rota são obrigatórios');

  const makeRequest = async (url, method = 'GET', data = null, headers = {}) => {
    const requestOptions = {
      method: method,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        token: AUTH_TOKEN,
        module: module,
        route: route,
      },
    };

    if (data) {
      requestOptions.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${GATEWAY_API_URL}`, requestOptions);
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('API request error:', error);
      throw new Error('Falha na requisição API');
    }
  };

  return {
    get: (url, headers = {}) => makeRequest(url, 'GET', null, headers),
    post: (url, data, headers = {}) => makeRequest(url, 'POST', data, headers),
    put: (url, data, headers = {}) => makeRequest(url, 'PUT', data, headers),
    delete: (url, data, headers = {}) => makeRequest(url, 'DELETE', data, headers),
  };
};

export { api };
