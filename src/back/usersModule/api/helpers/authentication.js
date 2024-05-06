const dotenv = require('dotenv');
dotenv.config();

module.exports = {


  friendlyName: 'Authentication',


  description: 'Authentication something.',


  inputs: {
    token: {
      friendlyName: 'retrieveToken',
      description: 'The token to get the user',
      type: 'string',
      defaultsTo: ''
    }
  },


  exits: {

    success: {
      description: 'Authorized',
    },

    noTokenProvided: {
      description: 'No token provided'
    },

    wrongToken: {
      description: 'Wrong token provided'
    }

  },


  fn: async function (inputs, exits) {
    const token = inputs.token;
    if (!token) {
      sails.log.error('No token');
      throw 'noTokenProvided';
    };
    if(token !== process.env.AUTH_TOKEN){
      sails.log.error('Wrong token');
      throw 'wrongToken';
    };

    return exits.success();
  }


};

