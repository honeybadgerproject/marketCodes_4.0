;(function() {
"use strict";


angular.module("app.search" , [])

// Root Controller
.controller("searchCtrl", ["$rootScope", "$scope", "$http",
        function($rs, $scope, $http) {

          console.log(">>> inside search");
          $scope.searchlist = {};
          $scope.searchResults = { };

          /* find the word in the database */
        $scope.search = function() {
          console.log(">>> search..");
          console.log("search text: " + $scope.searchlist.text_search);
          $scope.searchResults = {
            project_title: 'project 1',
            project_overview: 'overview del proyecto 1',
            project_clasification:'1'
          };

        ///  if($scope.searchlist.text_search)
      //    {

          /*  $http.get('/search/' + $scope.searchlist.text_search).success(function(response) {
              console.log("search...");


              $scope.searchResults = response;
            });*/

            $scope.searchlist.counter = 1;
            $scope.searchResults = {
              project_title: 'project 1',
              project_overview: 'overview del proyecto 1',
              project_clasification:'1'
            };


        //  };

      };

}])  //#end controller

// #end
})()
