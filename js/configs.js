(function() {
  'use strict';
  angular.module('gitApiConfig', [])
    .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            controller: 'SearchRepoCtrl'
          })
          .when('/:org/:repo/issues/', {
            // controller: 'NavigateCtrl',
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
})();
