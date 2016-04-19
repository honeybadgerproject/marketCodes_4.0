;(function() {
"use strict";


angular.module("app.search" , [])

/*.factory('SearchText', function() {
    return {
        text_search: ''
    };
})*/


// Root Controller
.controller("searchCtrl", ["$rootScope", "$scope", "$http", "UserFacebookID" ,
        function($rs, $scope, $http, UserFacebookID) {

        console.log(">>> inside search");
        $scope.searchlist = {};
        $scope.searchResults = [];
        $scope.projectSelectedId = {};


        $scope.process = function() {

          console.log(">>> buy..");

            var customer = {
              id: UserFacebookID.user.id,
              project_id: $scope.projectSelectedId
            };

            $scope.sucess = "";

            $http.post('/createBraintreeUser', customer).success(function(response) {

              console.log(response);
              var amount = { nonce: 'fake-valid-nonce' , amount: '10.00' };
              $http.post('/checkout', amount).success(function(response) {
                console.log(response);
                sucess = response;

                /// store the database
                $http.post('/storepayment', customer).success(function(response) {
                  console.log(response);
                });
              });

            });
        };

        $scope.selectProjectId = function(id_project) {
          console.log(id_project);
          $scope.projectSelectedId = id_project;
        };


          /* find the word in the database */
        $scope.search = function() {
          console.log(">>> search..");
          //console.log("search text: " + $scope.searchlist.text_search);
          $scope.searchResults = {
            project_title: 'project 1',
            project_overview: 'overview del proyecto 1',
            project_clasification:'1',
            user_owner: "10206398373092349",
            project_id: "56fee5854ce0e6d904bb5a49",
            price: "35"
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
