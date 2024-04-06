module.exports.routes = {
  //Games
  'get /games': 'GamesController.getAll',
  'get /gamesById/:id': 'GamesController.getById',
  'get /releases': 'GamesController.getReleases',
  //Users
  'post /login': 'UsersController.login',
  'post /generateToken': 'UsersController.generateToken',
  'post /resetPassword': 'UsersController.resetPassword',
  //Evaluations
  'get /evaluations/findByGame/:game_id': 'EvaluationsController.getByGame',
  'get /evaluations/findByUser/:user_id': 'EvaluationsController.getByUser',
  //Collections
  'get /collections/findByUser/:user_id/:status?': 'CollectionsController.getByUser',
  'get /collections/findByStatus/:status': 'CollectionsController.getByStatus',
   'get /crypt': 'CollectionsController.crypt'

};
