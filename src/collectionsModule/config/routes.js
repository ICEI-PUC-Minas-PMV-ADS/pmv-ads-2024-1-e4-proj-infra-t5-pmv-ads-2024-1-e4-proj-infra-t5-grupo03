module.exports.routes = {
  //Collections
  'get /collections/findByUser/:user_id/:status?': 'CollectionsController.getByUser',
  'get /collections/findByStatus/:status': 'CollectionsController.getByStatus',
   'get /crypt': 'CollectionsController.crypt'

};
