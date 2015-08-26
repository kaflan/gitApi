(function() {
  'use strict';
  var app = module('gitApi');
  var list;
  app.factory('getListIssues', function($http, parseUrl) {
    var url = 'https://api.github.com/repos/' + parseUrl.org + '/' + parseUrl.repo + '/issues';
    return {
      query: function() {
        return $http.get(url).then(function(res) {
          list = angular.copy(res.data);
          // list = $scope.data;
          return list;
        });
      }
    };
  });
})();