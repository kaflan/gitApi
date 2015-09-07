;
(function() {
  'use strict';
  angular.module('gitFactory', [])
    .factory('getListIssues', function($http, $q) {
      return {
        issues: [],
        query: function(org, repo) {
          return this.queryPage(org, repo, 1);
        },
        queryPage: function(org, repo, page) {
          var self = this;
          // cache
          if (this.issues[page]) {
            return $q(function(resolve) {
              resolve(self.issues[page]);
            });
          }
          var url = 'https://api.github.com/repos/' + org + '/' + repo + '/issues\?page\=' + page;
          var localUrl = '../page5.json';
          return $http.get(localUrl).then(function(res) {
            var list = angular.copy(res.data);
            return self.issues[page] = list;
          });
        }
      };
    })
    // factory get comments list from git hub
    .factory('getListComments', function($http) {
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
