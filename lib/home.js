exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/',
    config: {
      description: 'return the home page',
      auth: false, //everyone can access this page
      handler: function (request, reply) {
        return reply.view('home');
      }
        
      }
      
    
  });

  return next();
};

exports.register.attributes = {
  name: 'Home'
};