var getValidatedUser = require('./helpers/getValidatedUser');
var Joi = require('joi');
var Boom = require('boom');
var Promise = require('bluebird');

exports.register = function (server, options, next) {

  server.auth.strategy('standard', 'cookie', {
        password: 'somecrazycookiesecretthatcantbeguesseswouldgohere', // cookie secret
        cookie: 'app-cookie', // Cookie name
        isSecure: false, // required for non-https applications
        ttl: 24 * 60 * 60 * 1000 // Set session to 1 day
    });

   server.auth.default({
      strategy: 'standard',
      scope: ['admin']
    });

  server.route([
  {
    method:'GET',
    path: '/login',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      return reply.view('login');
    }
  },
  {
    method: 'POST',
        path: '/submitlogin',
        config: {
            auth: false,
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().min(2).max(200).required()
                }
            },
            handler: function(request, reply) {
                console.log('checking request...',request.payload);
                getValidatedUser(request.payload.email, request.payload.password)
                    .then(function(user){

                        if (user) {
                          console.log('inside', user);
                          console.log('request auth', request.auth);
                            request.auth.session.set(user);
                            return reply.redirect('/');
                        } else {
                            return reply(Boom.unauthorized('Bad email or password'));
                        }

                    })
                    .catch(function(err){
                        return reply(Boom.badImplementation());
                    });

            }
        }
  }])

  return next();
};

exports.register.attributes = {
  name: 'Login'
}



