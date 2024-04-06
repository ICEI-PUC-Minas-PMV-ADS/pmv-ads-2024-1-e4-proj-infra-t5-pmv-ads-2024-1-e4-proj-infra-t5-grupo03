# games-list

# API Gateway

Agora toda requisição devera ser feita ao API Gateway e não ao módulo, o gateway irá fazer a requisição ao módulo correto e retornar! Tudo é feito através da rota POST /makeRequest. Nela você envia ou não o body e ele repassa, no headers você coloca as informações da requisição, sendo elas:

- method: qual o metodo HTTP você quer utilizar(GET, POST, PUT, DELETE, PATCH);
- module: qual módulo você deseja chamar;
- route: qual rota você quer chamar;
- token: o token de autorização;

Ainda tem a query de pesquisa em algumas rotas, sendo composta de dois campos:

- searchQuery: a query de pesquisa em si;
- page: qual a página da pesquisa você quer

