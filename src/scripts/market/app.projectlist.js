;(function() {
"use strict";


angular.module("app.projectlist" , [])

// Root Controller
.controller("projectListCtrl", ["$rootScope", "$scope", "$http", "$timeout", "$window", "Facebook", "UserFacebookID" ,
        function($rs, $scope, $http, $timeout, $window, Facebook, UserFacebookID) {



          $scope.initStage = function(newproject) {
            newproject.phase = "stage";
          };

          $scope.stage1 = function(newproject) {
            newproject.phase = "Stage 1";
          };

          $scope.stage2 = function(newproject) {
            newproject.phase = "Stage 2";
          };

          $scope.stage3 = function(newproject) {
            newproject.phase = "Stage 3";
          };


		///// >>> emit
    	var refreshProjectList = function(){
    		console.log("/////>>>> refreshProjectList in emit");
    		$scope.$emit('refreshProjectList', {});// res - your data
    	};

          $scope.addnewproject = function(newproject) {
            console.log("------addnewproject------");
            // asign last updated project and created on
            newproject.last_update = new Date();
            newproject.created_on = new Date();
            // change the add user_owner by and array
            newproject.user_owner = [ { owner: UserFacebookID.user.id ,
                                      role: 'admin' } ];
            // asign the name for the user
            newproject.user_name = "nombre temporal"; //UserFacebookID.user.name;
            newproject.project_style = "solid";

            newproject.phase = "";
            newproject.icon_phase = "";

            if(newproject.classification === "1") {
            	newproject.phase = "panel-footer clearfix panel-footer-sm panel-footer-info";
                newproject.icon_phase = "right ion ion-ios-flask-outline icon";
            }
            else if(newproject.classification === "2") {
            	newproject.phase = "panel-footer clearfix panel-footer-sm panel-footer-success";
            	newproject.icon_phase = "right ion ion-ios-pulse icon";
            }
            else {
            	newproject.phase = "panel-footer clearfix panel-footer-sm panel-footer-pink";
            	newproject.icon_phase = "right ion ion-ios-cloud-download-outline icon";
            }

            /** get email **/
          /*  var email;
            $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: UserFacebookID.access_token, fields: "email", format: "json" }}).then(function(result) {
              console.log(result);
              console.log(result.data.email);
              email = result.data.email;
            }, function(error) {
                alert("Error: " + error);
            });*/

            newproject.email = UserFacebookID.email;

            $http.post('/projectlist', newproject).success(function(response) {
              console.log(response);
              refreshProjectList();
            });

            console.log(newproject);
          };

          $scope.remove = function() {
            console.log("remove");
          };

          $scope.edit = function() {
            console.log("edit");
          };

          $scope.select = function(id) {
            console.log("into select");
          };

          $scope.update = function() {
            console.log("update");
          };

          /*---- selected project ----*/
          $scope.selectProjectLabel = function(setLabel, id) {
            console.log("selectProjectLabel");
          };

          $scope.isSelectedProjectLabel  = function(checkLabel) {
            console.log("isSelectedProjectLabel");
          };

          $scope.classLabelFa = function(checkLabel, id) {
            console.log("classLabelFa");
          };




}])

// Root Controller
.controller("refreshProjectListCtrl", ["$scope", "$http", "$cookies", "$cookieStore", "UserFacebookID" ,
        function($scope, $http, $cookies, $cookieStore, UserFacebookID) {

          /*---- project selected and global variables ----*/
        	$scope.tabIndexLabel = 0;
        	$scope.projectlist = {};
        	$scope.project = {};
        	//$scope.style_css = {item: ''};

        	/*$scope.refreshProjectListHtml = function() {
        			console.log("refreshProjectListHtml");
        	};*/

        $scope.refreshProjectList = function() {
        	refreshProjectList();
        };

        var refreshProjectList = function() {
        	console.log("------refreshProjectList------");
    		// Get cookie
        UserFacebookID.user = $cookieStore.get('userCached');
          console.log(UserFacebookID.user);

    		$http.get('/refreshProjectWithUser/' + UserFacebookID.user.id).success(function(response) {
    			console.log("refresh");
    			$scope.projectlist = response;
    		});

        };


        //// >> on for emit
        $scope.$on('refreshProjectList', function () {
          console.log("////>> called by emit " );
          refreshProjectList();
        });


        $scope.select = function(id) {
          console.log("into select");
          UserFacebookID.project_id = id;
        };

        $scope.remove = function(id) {
          console.log(id);
          $http.delete('/projectlist/' + id).success(function(response) {
        	  refreshProjectList();
          });
        };

}])




// #end
})()
