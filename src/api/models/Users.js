const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    datastore: 'default',
    migrate: process.env.NODE_ENV == 'production' ? 'safe' : 'alter',
    attributes: {
      nickname: {
        type: 'string',
        required: true
      },
      email: {
        type: 'string',
        required: true,
        unique: true
      },
      password: {
        type: 'string',
        required: true
      },
      nintendo_account: {
        type: 'string',
        required: false
      },
      steam_account: {
        type: 'string',
        required: false
      },
      microsoft_account: {
        type: 'string',
        required: false
      },
      epic_account: {
        type: 'string',
        required: false
      },
      role: {
        type: 'string',
        defaultsTo: 'user'
      },
      retrieveToken: {
        type: 'string',
        required: false
      }
    },

};

