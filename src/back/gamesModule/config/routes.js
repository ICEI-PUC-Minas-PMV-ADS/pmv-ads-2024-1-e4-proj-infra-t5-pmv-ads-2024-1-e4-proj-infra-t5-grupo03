module.exports.routes = {
  //Games
  'get /games': 'GamesController.getAll',
  'get /gamesById/:id': 'GamesController.getById',
  'get /releases': 'GamesController.getReleases',
 

};
