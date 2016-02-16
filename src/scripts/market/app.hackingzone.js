;(function() {
"use strict";

angular.module("app.hackingzone" , [])


// Root Controller
.controller("hackingCtrl", ["$scope", "$http", "$modal","UserFacebookID",
        function($scope, $http, $modal, UserFacebookID) {

        /*---- project selected and global variables ----*/
        $scope.collaboratorlist = {};
        $scope.resourcelist = {};
        $scope.collaborator = {};
        $scope.resource = {};



        $scope.addnewresource = function(newresource) {
          console.log(newresource);
          //console.log($scope.resource);
          if(UserFacebookID.user.id) {
        	console.log(UserFacebookID.user.id);
        	console.log(UserFacebookID.project_id);
        	var resource_project = {
        		resource_name: newresource.resource_name,
        		user_owner: UserFacebookID.user.id,
            	id_project: UserFacebookID.project_id
        	}
        	console.log(resource_project);
            //newresource.user_owner = UserFacebookID.user.id;
            //newresource.id_project = UserFacebookID.project_id;
            $http.post('/resourcelist', resource_project).success(function(response) {
              console.log(response);
              if($scope.modalInstance)
              {
                  $scope.modalInstance.close();
              }
              refreshResourceList();
            });
          }
        };


        $scope.openDialogResource = function() {

            $scope.modalInstance = $modal.open({
                    templateUrl: 'views/ui/modalResource.html',
                    scope: $scope
                });
                console.log('modal opened');
                $scope.modalInstance.result.then(function () {
                    console.log($scope.selected);
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });

        };

        $scope.refreshResourceList = function() {

            console.log("------refreshResourceList------");

            if(UserFacebookID.user.id) {

              var listParams = {
                user_owner: UserFacebookID.user.id,
                project_id: UserFacebookID.project_id
              };

              console.log(listParams);

              $http.post('/resourcelistowner/', listParams).success(function(response) {
                console.log("refresh contributor list");
                $scope.contributorslist = response;
                console.log($scope.contributorslist);
              });
            }

        };

        $scope.refreshHackingZoneList = function() {

          console.log("------refreshHackingList------");

          /*if(UserFacebookID.user.id) {

            var listParams = {
              user_owner: UserFacebookID.user.id,
              project_id: UserFacebookID.project_id
            };
              console.log(listParams);

            $http.post('/contributorslistowner/', listParams).success(function(response) {
              console.log("refresh contributor list");
              $scope.contributorslist = response;
              console.log($scope.contributorslist);
            });
          }*/

        };


}])




// #end
})()
