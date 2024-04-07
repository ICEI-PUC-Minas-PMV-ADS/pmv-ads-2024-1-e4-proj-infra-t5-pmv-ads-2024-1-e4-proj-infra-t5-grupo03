module.exports.routes = {
  //Evaluations
  'get /evaluations/findByGame/:game_id': 'EvaluationsController.getByGame',
  'get /evaluations/findByUser/:user_id': 'EvaluationsController.getByUser',
};
