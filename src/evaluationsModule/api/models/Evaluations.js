const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  datastore: 'default',
  migrate: process.env.NODE_ENV == 'production' ? 'safe' : 'alter',
  attributes: {
    user_id: {
      type: 'string',
      required: true,
    },
    game_id: {
      type: 'number',
      required: true,
    },
    note: {
      type: 'number',
      required: true,
      min: 0,
      max: 5,
    },
    review: {
      type: 'string',
      required: false
    },
    playtime: {
      type: 'number',
      required: false
    }
  },

};

