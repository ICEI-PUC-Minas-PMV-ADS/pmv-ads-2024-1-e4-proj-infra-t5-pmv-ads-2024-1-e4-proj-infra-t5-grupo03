module.exports.http = {
  middleware: {
    order: [
      'morgan',
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'poweredBy',
      'helmet',
      'authentication',
      'router',
      'www',
      'favicon',
    ],

    morgan: require('morgan')('dev'),
    helmet: require('helmet')(),
    authentication: async function (req, res, next) {
      try {
        await sails.helpers.authentication(req.headers.token);
        next();
      } catch (err) {
        res.status(err.status || 401)
        return res.json(err);
      }

    },
  },
};
