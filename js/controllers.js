(function (){
  'use strict';
  var app = angular.module('gitApi');
  var number;
  var list = null;
   // Issuess  ctrl
  app.controller('IssuesCtrl', function($scope, getListIssues, getIssuesInfo) {
    number = Number(getIssuesInfo.number);
    getListIssues.query().then(function() {
      var issue = list.filter(function(item) {
        return item.number === number;
      });
      if (!issue.length) return;
      $scope.issue = issue[0];
    });
  });
  // comments ctrl
  app.controller('CommentsCtrl', function() {

  });
  //
  app.controller('SearchCtrl', ['$scope',
    function($scope) {
      $scope.model;
    }
  ]);
})();