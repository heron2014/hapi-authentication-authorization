exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/',
    config: {
      description: 'return the admin page only for admin scope'
      handler: function (request, reply) {
        return reply.view('admin');
      }
        
      }
      
    
  });

  return next();
};

exports.register.attributes = {
  name: 'Admin'
}