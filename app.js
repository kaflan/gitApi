(function() {
  'use strict';
  var http = require('http');
  var port = Number(process.env.PORT || 3000);
  var _ = require('lodash');
  var fs = require('fs');
  var express = require('express');
  var app = express();
  var passport = require('passport');
  var GitHubStrategy = require('passport-github2').Strategy;
  var GITHUB_CLIENT_ID = '--insert-github-client-id-here--';
  var GITHUB_CLIENT_SECRET = '--insert-github-client-secret-here--';

  app.use(express.static(__dirname + '/publick'));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function() {

        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  ));

  // app.listen(port);
  app.listen(port, function(){
  console.log('listening on', http.address().port);
});
  console.log('server Server running at ' + port);
  app.get('/', function(req, res) {
    res.render('index');
  });
})();
