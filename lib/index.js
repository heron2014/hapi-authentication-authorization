
var Hapi = require('hapi');

var Inert = require('inert'); //Static file and directory handlers plugin for hapi.js
var Vision = require('vision'); //Templates rendering support for hapi.js 
var Handlebars = require('handlebars');
var Home = require('./home');
var Login = require('./login');
var Cookie = require('hapi-auth-cookie');

exports.init = function (port, next) {

  var server = new Hapi.Server();
  server.connection({port: port});

  var plugins = [Inert, Vision, Cookie, Home, Login];

  server.register(plugins, function (err) {
    
   
    if (err) {
      return next(err);
    }
    
    server.views({
      engines: {
        html: Handlebars
      },
      relativeTo: __dirname + '/../views',
      path: '.',
      layout: 'default',
      layoutPath: 'layout'
     
    });
    
// Set our server authentication strategy
    // server.auth.strategy('standard', 'cookie', {
    //     password: 'somecrazycookiesecretthatcantbeguesseswouldgohere', // cookie secret
    //     cookie: 'app-cookie', // Cookie name
    //     isSecure: false, // required for non-https applications
    //     ttl: 24 * 60 * 60 * 1000 // Set session to 1 day
    // });

    //every page has a default scope of admin, you need to be admin to access any page unless you specify in root scope
    // server.auth.default({
    //   strategy: 'standard',
    //   scope: ['admin']
    // });

  //base strategy it prevents us for accidently creating a routes which might not be secure
    // server.auth.default({
    //   strategy: 'standard',
    //   scope: ['admin']
    // });

    server.start(function (err) {

      return next(err, server);
    });
  });
};  