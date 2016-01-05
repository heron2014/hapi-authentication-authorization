/**
 * REALLY STUPID GET VALID USER - NOT FOR PRODUCITON USE.
 * Replace this with your own database lookup and make sure
 * you encrypt the passwords. Plain text passwords should not be used.
 * AGAIN THIS IS JUST TO GET THIS EXAMPLE WORKING!
 */

var Promise = require('bluebird');

module.exports = function (email, password){
    console.log('----helpers', email, password);
    return new Promise(function(fulfill, reject){
        console.log('First line inside promise');

        var users = [
            {
                id: 123,
                email: 'admin@admin.com',
                password: 'admin',
                scope: ['user', 'admin', 'user-123']
            },
            {
                id: 124,
                email: 'guest@guest.com',
                password: 'guest',
                scope: ['user', 'user-124']
            },
            {
                id: 125,
                email: 'other@other.com',
                password: 'other',
                scope: ['user', 'user-125']
            }
        ];

        // This is done to remove the password before being sent.
        function grabCleanUser(user) {
            console.log('clean user', user);
            var user = user;
            delete user.password;
            return user;
        };

        // very simple look up based on the user array above.
        if (email === users[0].email && password === users[0].password) {
            return fulfill(grabCleanUser(users[0]));
        } else if (email === users[1].email && password === users[1].password) {
            return fulfill(grabCleanUser(users[1]));
        } else if (email === users[2].email && password === users[2].password) {
            return fulfill(grabCleanUser(users[2]));
        } else {
            return reject(null);
        }
    });
};