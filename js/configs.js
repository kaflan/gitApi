(function() {
  'use strict';
  var app = angular.module('gitApi');
  //config
  app.config(['$routeProvider',
    function($routeProvider) {
      //costile 
      $routeProvider
        .when(':/org/:repo/issues', {
          templateUrl: 'template/nav.html',
          controller: 'ListIssuesCtrl'
        })
        .when('/:org/:repo/issues/:number', {
          templateUrl: 'template/issues.html',
          controller: 'IssuesCtrl'
        })
        .otherwise({
          temlpate: '<h1> NO page here<h1>'
        });
    }
  ]);
})();