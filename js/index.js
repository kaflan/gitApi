/* angular Global*/ ;
(function() {
  'use strict';
  angular.module('gitApi', ['ngRoute', 'gitDerective', 'gitApiCtrl', 'gitFactory', 'hc.marked', 'gitApiFilter']);
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
            controller: 'ListIessuesCtrl',
            templateUrl: 'template/nav.html'
          })
          .when('/:org/:repo/issues/:number', {
            // controller: 'IssueCtrl',
            templateUrl: 'template/nav.html'
              // controllerAs: 'ListIessuesCtrl'
          })
          .otherwise({
            temlpate: '<h1> NO page here<h1>'
          });
      }
    ])
    .config(['markedProvider', function(markedProvider) {
      markedProvider.setOptions({
        gfm: true
      });
    }]);
})();
// curl https: //api.github.com/repos/codeception/codeception/issues\?page\=5
