const dotenv = require('dotenv');
dotenv.config();

module.exports.datastores = {
  default: {
    adapter: 'sails-mongo',
    //url: 'mongodb://admin:E9aetuoxCfsGwpav@cluster0.fqs5xdf.mongodb.net:27017/?retryWrites=true&w=majority'
    url: process.env.MONGO_URL

  }


};
