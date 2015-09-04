/* angular Global*/ ;
(function() {
  'use strict';
  angular.module('gitApi', ['ngRoute', 'gitDerective', 'gitApiCtrl', 'gitFactory']);
  //controllers

  //directives

  // config
  angular.module('gitApi')
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'template/search.html',
            controller: 'SearchRepoCtrl'
          })
          .when('/:org/:repo/issues/', {
            // controller: 'ListIessuesCtrl',
            templateUrl: 'template/nav.html'
          })
          .when('/:org/:repo/issues/:number', {
            // controller: 'CommentsCtrl',
            templateUrl: 'template/nav.html'
          })
          .otherwise({
            temlpate: '<h1> NO page here<h1>'
          });

      }
    ]);
  // factory
})();
// curl https: //api.github.com/repos/codeception/codeception/issues\?page\=5
