;
(function() {
  'use strict';
  angular.module('gitFactory', [])
    .factory('getListIssues', function($http) {
      return {
        query: function(org, repo) {
          var url = 'https://api.github.com/repos/' + org + '/' + repo + '/issues';
          return $http.get(url).then(function(res) {
            var list = angular.copy(res.data);
            return list;
          });
        }
      };
    });
  // factory get comments list from git hub
  angular.module('gitApi').factory('getListComments', function($http) {
    return {
      query: function(org, repo, number) {
        var url = 'https://api.github.com/repos/' + org + '/' + repo + '/issues' + '/' + number + '/' + 'comments';
        return $http.get(url).then(function(res) {
          var list = angular.copy(res.data);
          return list;
        });
      }
    };
  });
})();
