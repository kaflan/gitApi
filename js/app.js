1! function() {
    "use strict";
    angular.module("gitApiConfig", []).config(["$routeProvider", function(t) {
      t.when("/", {
        controller: "SearchRepoCtrl"
      }).when("/:org/:repo/issues/", {
        templateUrl: "template/nav.html"
      }).when("/:org/:repo/issues/:number", {
        templateUrl: "template/nav.html"
      }).otherwise({
        temlpate: "<h1> NO page here<h1>"
      })
    }])
  }(),
  function() {
    "use strict";
    angular.module("gitApiCtrl", []).controller("NavigateCtrl", ["$scope", "getListIssues", "$routeParams", function(t, e, r) {
      e.query(r.org, r.repo).then(function(e) {
        t.issues = angular.copy(e)
      }), t.issuesItem = function() {
        t.number = r.number, t.org = r.org, t.repo = r.repo;
        var e = t.issues.filter(function(e) {
          return e.number == t.number
        });
        e.length && (t.issue = e[0])
      }
    }]).controller("SearchRepoCtrl", ["$scope", "$location", "getListIssues", function(t, e, r) {
      "" === e.$$path && (t.startPage = !0), t.searchRepo = function() {
        r.query(t.org, t.repo).then(function(e) {
          t.data = angular.copy(e)
        }), t.startPage = !1, e.path("/" + t.org + "/" + t.repo + "/issues")
      }
    }]).controller("CommentsCtrl", ["getListComments", "$scope", "$routeParams", function(t, e, r) {
      void 0 !== r.number && (t.query(r.org, r.repo, r.number).then(function(t) {
        e.comments = angular.copy(t), console.log("if work 1", e.issues);
        var n = e.issues.filter(function(t) {
          return t.number == r.number
        });
        n.length && (e.issue = n[0], console.log("if work", e.issue))
      }), console.log("if work 2", e.issues))
    }])
  }(),
  function() {
    "use strict";
    angular.module("gitDerective", []).directive("issues", function() {
      return {
        controller: "NavigateCtrl",
        restrict: "E",
        templateUrl: "template/showIssues.html"
      }
    }).directive("comments", function() {
      return {
        controller: "CommentsCtrl",
        restrict: "E",
        templateUrl: "template/comments.html"
      }
    })
  }(),
  function() {
    "use strict";
    angular.module("gitFactory", []).factory("getListIssues", ["$http", function(t) {
      return {
        query: function(e, r) {
          var n = "https://api.github.com/repos/" + e + "/" + r + "/issues";
          return t.get(n).then(function(t) {
            var e = angular.copy(t.data);
            return e
          })
        }
      }
    }]), angular.module("gitApi").factory("getListComments", ["$http", function(t) {
      return {
        query: function(e, r, n) {
          var o = "https://api.github.com/repos/" + e + "/" + r + "/issues/" + n + "/comments";
          return t.get(o).then(function(t) {
            var e = angular.copy(t.data);
            return e
          })
        }
      }
    }])
  }(),
  function() {
    "use strict";
    angular.module("gitApi", ["ngRoute", "ngResource", "gitDerective", "gitApiConfig", "gitApiCtrl", "gitFactory"])
  }();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZ3MuanMiLCJjb250cm9sbGVycy5qcyIsImRpcmVjdGl2ZS5qcyIsImZhY3RvcnkuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwiY29uZmlnIiwiJHJvdXRlUHJvdmlkZXIiLCJ3aGVuIiwiY29udHJvbGxlciIsInRlbXBsYXRlVXJsIiwib3RoZXJ3aXNlIiwidGVtbHBhdGUiLCIkc2NvcGUiLCJnZXRMaXN0SXNzdWVzIiwiJHJvdXRlUGFyYW1zIiwicXVlcnkiLCJvcmciLCJyZXBvIiwidGhlbiIsImRhdGEiLCJpc3N1ZXMiLCJjb3B5IiwiaXNzdWVzSXRlbSIsIm51bWJlciIsImlzc3VlIiwiZmlsdGVyIiwiaXRlbSIsImxlbmd0aCIsIiRsb2NhdGlvbiIsIiQkcGF0aCIsInN0YXJ0UGFnZSIsInNlYXJjaFJlcG8iLCJwYXRoIiwiZ2V0TGlzdENvbW1lbnRzIiwidW5kZWZpbmVkIiwiY29tbWVudHMiLCJjb25zb2xlIiwibG9nIiwiZGlyZWN0aXZlIiwicmVzdHJpY3QiLCJmYWN0b3J5IiwiJGh0dHAiLCJ1cmwiLCJnZXQiLCJyZXMiLCJsaXN0Il0sIm1hcHBpbmdzIjoiQ0FBQSxXQUNBLFlBQ0FBLFNBQUFDLE9BQUEsbUJBQ0FDLFFBQUEsaUJBQ0EsU0FBQUMsR0FDQUEsRUFDQUMsS0FBQSxLQUNBQyxXQUFBLG1CQUVBRCxLQUFBLHVCQUVBRSxZQUFBLHNCQUVBRixLQUFBLDhCQUVBRSxZQUFBLHNCQUVBQyxXQUNBQyxTQUFBLGdDQ2xCQSxXQUNBLFlBRUFSLFNBQUFDLE9BQUEsaUJBQ0FJLFdBQUEsZ0JBQUEsU0FBQSxnQkFBQSxlQUFBLFNBQUFJLEVBQUFDLEVBQUFDLEdBQ0FELEVBQUFFLE1BQUFELEVBQUFFLElBQUFGLEVBQUFHLE1BQUFDLEtBQUEsU0FBQUMsR0FDQVAsRUFBQVEsT0FBQWpCLFFBQUFrQixLQUFBRixLQUVBUCxFQUFBVSxXQUFBLFdBQ0FWLEVBQUFXLE9BQUFULEVBQUFTLE9BQ0FYLEVBQUFJLElBQUFGLEVBQUFFLElBQ0FKLEVBQUFLLEtBQUFILEVBQUFHLElBQ0EsSUFBQU8sR0FBQVosRUFBQVEsT0FBQUssT0FBQSxTQUFBQyxHQUNBLE1BQUFBLEdBQUFILFFBQUFYLEVBQUFXLFFBRUFDLEdBQUFHLFNBQ0FmLEVBQUFZLE1BQUFBLEVBQUEsUUFLQWhCLFdBQUEsa0JBQUEsU0FBQSxZQUFBLGdCQUFBLFNBQUFJLEVBQUFnQixFQUFBZixHQUNBLEtBQUFlLEVBQUFDLFNBQ0FqQixFQUFBa0IsV0FBQSxHQUVBbEIsRUFBQW1CLFdBQUEsV0FDQWxCLEVBQUFFLE1BQUFILEVBQUFJLElBQUFKLEVBQUFLLE1BQUFDLEtBQUEsU0FBQUMsR0FDQVAsRUFBQU8sS0FBQWhCLFFBQUFrQixLQUFBRixLQUVBUCxFQUFBa0IsV0FBQSxFQUNBRixFQUFBSSxLQUFBLElBQUFwQixFQUFBSSxJQUFBLElBQUFKLEVBQUFLLEtBQUEsZUFLQVQsV0FBQSxnQkFBQSxrQkFBQSxTQUFBLGVBQUEsU0FBQXlCLEVBQUFyQixFQUFBRSxHQUNBb0IsU0FBQXBCLEVBQUFTLFNBQ0FVLEVBQUFsQixNQUFBRCxFQUFBRSxJQUFBRixFQUFBRyxLQUFBSCxFQUFBUyxRQUFBTCxLQUFBLFNBQUFDLEdBQ0FQLEVBQUF1QixTQUFBaEMsUUFBQWtCLEtBQUFGLEdBQ0FpQixRQUFBQyxJQUFBLFlBQUF6QixFQUFBUSxPQUNBLElBQUFJLEdBQUFaLEVBQUFRLE9BQUFLLE9BQUEsU0FBQUMsR0FDQSxNQUFBQSxHQUFBSCxRQUFBVCxFQUFBUyxRQUlBQyxHQUFBRyxTQUNBZixFQUFBWSxNQUFBQSxFQUFBLEdBQ0FZLFFBQUFDLElBQUEsVUFBQXpCLEVBQUFZLFVBRUFZLFFBQUFDLElBQUEsWUFBQXpCLEVBQUFRLGVDakRBLFdBQ0EsWUFFQWpCLFNBQUFDLE9BQUEsbUJBQ0FrQyxVQUFBLFNBQUEsV0FDQSxPQUNBOUIsV0FBQSxlQUNBK0IsU0FBQSxJQUNBOUIsWUFBQSw4QkFJQTZCLFVBQUEsV0FBQSxXQUNBLE9BQ0E5QixXQUFBLGVBQ0ErQixTQUFBLElBQ0E5QixZQUFBLCtCQ2hCQSxXQUNBLFlBQ0FOLFNBQUFDLE9BQUEsaUJBQ0FvQyxRQUFBLGlCQUFBLFFBQUEsU0FBQUMsR0FDQSxPQUNBMUIsTUFBQSxTQUFBQyxFQUFBQyxHQUNBLEdBQUF5QixHQUFBLGdDQUFBMUIsRUFBQSxJQUFBQyxFQUFBLFNBQ0EsT0FBQXdCLEdBQUFFLElBQUFELEdBQUF4QixLQUFBLFNBQUEwQixHQUNBLEdBQUFDLEdBQUExQyxRQUFBa0IsS0FBQXVCLEVBQUF6QixLQUNBLE9BQUEwQixVQU1BMUMsUUFBQUMsT0FBQSxVQUFBb0MsUUFBQSxtQkFBQSxRQUFBLFNBQUFDLEdBQ0EsT0FDQTFCLE1BQUEsU0FBQUMsRUFBQUMsRUFBQU0sR0FDQSxHQUFBbUIsR0FBQSxnQ0FBQTFCLEVBQUEsSUFBQUMsRUFBQSxXQUFBTSxFQUFBLFdBQ0EsT0FBQWtCLEdBQUFFLElBQUFELEdBQUF4QixLQUFBLFNBQUEwQixHQUNBLEdBQUFDLEdBQUExQyxRQUFBa0IsS0FBQXVCLEVBQUF6QixLQUNBLE9BQUEwQixhQ3BCQSxXQUNBLFlBQ0ExQyxTQUFBQyxPQUFBLFVBQUEsVUFBQSxhQUFBLGVBQUEsZUFBQSxhQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBhbmd1bGFyLm1vZHVsZSgnZ2l0QXBpQ29uZmlnJywgW10pXG4gICAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJyxcbiAgICAgIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgICAgLndoZW4oJy8nLCB7XG4gICAgICAgICAgICBjb250cm9sbGVyOiAnU2VhcmNoUmVwb0N0cmwnXG4gICAgICAgICAgfSlcbiAgICAgICAgICAud2hlbignLzpvcmcvOnJlcG8vaXNzdWVzLycsIHtcbiAgICAgICAgICAgIC8vIGNvbnRyb2xsZXI6ICdOYXZpZ2F0ZUN0cmwnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZS9uYXYuaHRtbCdcbiAgICAgICAgICB9KVxuICAgICAgICAgIC53aGVuKCcvOm9yZy86cmVwby9pc3N1ZXMvOm51bWJlcicsIHtcbiAgICAgICAgICAgIC8vIGNvbnRyb2xsZXI6ICdDb21tZW50c0N0cmwnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZS9uYXYuaHRtbCdcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vdGhlcndpc2Uoe1xuICAgICAgICAgICAgdGVtbHBhdGU6ICc8aDE+IE5PIHBhZ2UgaGVyZTxoMT4nXG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgXSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIG5hdmlnYXRpb24gY29udHJvbGxlclxuICBhbmd1bGFyLm1vZHVsZSgnZ2l0QXBpQ3RybCcsIFtdKVxuICAgIC5jb250cm9sbGVyKCdOYXZpZ2F0ZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIGdldExpc3RJc3N1ZXMsICRyb3V0ZVBhcmFtcykge1xuICAgICAgZ2V0TGlzdElzc3Vlcy5xdWVyeSgkcm91dGVQYXJhbXMub3JnLCAkcm91dGVQYXJhbXMucmVwbykudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICRzY29wZS5pc3N1ZXMgPSBhbmd1bGFyLmNvcHkoZGF0YSk7XG4gICAgICB9KTtcbiAgICAgICRzY29wZS5pc3N1ZXNJdGVtID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRzY29wZS5udW1iZXIgPSAkcm91dGVQYXJhbXMubnVtYmVyO1xuICAgICAgICAkc2NvcGUub3JnID0gJHJvdXRlUGFyYW1zLm9yZztcbiAgICAgICAgJHNjb3BlLnJlcG8gPSAkcm91dGVQYXJhbXMucmVwbztcbiAgICAgICAgdmFyIGlzc3VlID0gJHNjb3BlLmlzc3Vlcy5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHJldHVybiBpdGVtLm51bWJlciA9PSAkc2NvcGUubnVtYmVyO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFpc3N1ZS5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgJHNjb3BlLmlzc3VlID0gaXNzdWVbMF07XG4gICAgICB9O1xuICAgIH0pXG5cbiAgLy8gcmVwbyBhbmQgb3JnIGNvbnRyb2xsZXIgc2VhcmNoXG4gIC5jb250cm9sbGVyKCdTZWFyY2hSZXBvQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uLCBnZXRMaXN0SXNzdWVzKSB7XG4gICAgaWYgKCRsb2NhdGlvbi4kJHBhdGggPT09ICcnKSB7XG4gICAgICAkc2NvcGUuc3RhcnRQYWdlID0gdHJ1ZTtcbiAgICB9XG4gICAgJHNjb3BlLnNlYXJjaFJlcG8gPSBmdW5jdGlvbigpIHtcbiAgICAgIGdldExpc3RJc3N1ZXMucXVlcnkoJHNjb3BlLm9yZywgJHNjb3BlLnJlcG8pLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAkc2NvcGUuZGF0YSA9IGFuZ3VsYXIuY29weShkYXRhKTtcbiAgICAgIH0pO1xuICAgICAgJHNjb3BlLnN0YXJ0UGFnZSA9IGZhbHNlO1xuICAgICAgJGxvY2F0aW9uLnBhdGgoJy8nICsgJHNjb3BlLm9yZyArICcvJyArICRzY29wZS5yZXBvICsgJy9pc3N1ZXMnKTtcbiAgICB9O1xuICB9KVxuXG4gIC8vc2hvdyBjb21tZW50cyBjb250cm9sbGVyXG4gIC5jb250cm9sbGVyKCdDb21tZW50c0N0cmwnLCBmdW5jdGlvbihnZXRMaXN0Q29tbWVudHMsICRzY29wZSwgJHJvdXRlUGFyYW1zKSB7XG4gICAgaWYgKCRyb3V0ZVBhcmFtcy5udW1iZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZ2V0TGlzdENvbW1lbnRzLnF1ZXJ5KCRyb3V0ZVBhcmFtcy5vcmcsICRyb3V0ZVBhcmFtcy5yZXBvLCAkcm91dGVQYXJhbXMubnVtYmVyKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgJHNjb3BlLmNvbW1lbnRzID0gYW5ndWxhci5jb3B5KGRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZygnaWYgd29yayAxJywgJHNjb3BlLmlzc3Vlcyk7XG4gICAgICAgIHZhciBpc3N1ZSA9ICRzY29wZS5pc3N1ZXMuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gaXRlbS5udW1iZXIgPT0gJHJvdXRlUGFyYW1zLm51bWJlcjtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdpZiB3b3JrJywgJHNjb3BlKTtcblxuICAgICAgICBpZiAoIWlzc3VlLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAkc2NvcGUuaXNzdWUgPSBpc3N1ZVswXTtcbiAgICAgICAgY29uc29sZS5sb2coJ2lmIHdvcmsnLCAkc2NvcGUuaXNzdWUpO1xuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZygnaWYgd29yayAyJywgJHNjb3BlLmlzc3Vlcyk7XG5cbiAgICB9XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAvLyBkaXJlY3RpdmUgIHNob3cgIDEgaXNzdWVcbiAgYW5ndWxhci5tb2R1bGUoJ2dpdERlcmVjdGl2ZScsIFtdKVxuICAgIC5kaXJlY3RpdmUoJ2lzc3VlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29udHJvbGxlcjogJ05hdmlnYXRlQ3RybCcsXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGUvc2hvd0lzc3Vlcy5odG1sJ1xuICAgICAgfTtcbiAgICB9KVxuICAgIC8vIGRpcmVjdGl2ZSBzaG93IGFsbCBjb21tZW50c1xuICAgIC5kaXJlY3RpdmUoJ2NvbW1lbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb250cm9sbGVyOiAnQ29tbWVudHNDdHJsJyxcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZS9jb21tZW50cy5odG1sJ1xuICAgICAgfTtcbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgYW5ndWxhci5tb2R1bGUoJ2dpdEZhY3RvcnknLCBbXSlcbiAgICAuZmFjdG9yeSgnZ2V0TGlzdElzc3VlcycsIGZ1bmN0aW9uKCRodHRwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBxdWVyeTogZnVuY3Rpb24ob3JnLCByZXBvKSB7XG4gICAgICAgICAgdmFyIHVybCA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zLycgKyBvcmcgKyAnLycgKyByZXBvICsgJy9pc3N1ZXMnO1xuICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQodXJsKS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgdmFyIGxpc3QgPSBhbmd1bGFyLmNvcHkocmVzLmRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIC8vIGZhY3RvcnkgZ2V0IGNvbW1lbnRzIGxpc3QgZnJvbSBnaXQgaHViXG4gIGFuZ3VsYXIubW9kdWxlKCdnaXRBcGknKS5mYWN0b3J5KCdnZXRMaXN0Q29tbWVudHMnLCBmdW5jdGlvbigkaHR0cCkge1xuICAgIHJldHVybiB7XG4gICAgICBxdWVyeTogZnVuY3Rpb24ob3JnLCByZXBvLCBudW1iZXIpIHtcbiAgICAgICAgdmFyIHVybCA9ICdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zLycgKyBvcmcgKyAnLycgKyByZXBvICsgJy9pc3N1ZXMnICsgJy8nICsgbnVtYmVyICsgJy8nICsgJ2NvbW1lbnRzJztcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmwpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgdmFyIGxpc3QgPSBhbmd1bGFyLmNvcHkocmVzLmRhdGEpO1xuICAgICAgICAgIHJldHVybiBsaXN0O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn0pKCk7XG4iLCIvKiBhbmd1bGFyIEdsb2JhbCovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgYW5ndWxhci5tb2R1bGUoJ2dpdEFwaScsIFsnbmdSb3V0ZScsICduZ1Jlc291cmNlJywgJ2dpdERlcmVjdGl2ZScsICdnaXRBcGlDb25maWcnLCAnZ2l0QXBpQ3RybCcsICdnaXRGYWN0b3J5J10pO1xuICAvL2NvbnRyb2xsZXJzXG5cbiAgLy9kaXJlY3RpdmVzXG5cbiAgLy8gY29uZmlnXG5cbiAgLy8gZmFjdG9yeVxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
