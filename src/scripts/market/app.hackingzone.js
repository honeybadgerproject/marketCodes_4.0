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
              refreshHackingZoneList();
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
            refreshHackingZoneList();
        };

        var refreshHackingZoneList = function() {
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

        $scope.removeresource = function(id) {
          console.log(id);
          $http.delete('/resourcelist/' + id).success(function(response) {
            refreshResourceList();
          });
        };

        /*---- tabs ----*/

        $scope.tabIndex = 0;

        $scope.selectTab = function(setTab) {
          console.log("set Tab: " + setTab);
          $scope.tabIndex = setTab;
        };

        $scope.isSelected  = function(checkTab) {
            console.log("check Tab: " + checkTab);
          return $scope.tabIndex === checkTab;
        };


        var refreshNoteList = function() {
          if(UserFacebookID.user.id) {

            var listParams = {
              user_owner: UserFacebookID.user.id,
              project_id: UserFacebookID.project_id
            };

            $http.post('/notelistowner' , listParams).success(function(response) {
              console.log("refresh tab");
              $scope.notelist = response;
              console.log($scope.notelist);
              $scope.note = {
                user_owner: "",
                id_tab: "note",
                tab_name: "note",
                tab_content: ""
              };
            });
          }
        };

        refreshNoteList();


        $scope.addnewtab = function() {
          //console.log(newtab);
          console.log("add ntew note");

          if(UserFacebookID.user.id) {

            var newnote = {
              user_owner: UserFacebookID.user.id,
              id_tab: "note",
              tab_name: "note",
              id_project: UserFacebookID.project_id ,
              tab_content: ""
            };
            console.log(newnote);
            $http.post('/notelist', newnote).success(function(response) {
              console.log(response);
              refreshNoteList();
            });
          }
        };

        $scope.removetab = function(id) {
          console.log(id);
          $http.delete('/notelist/' + id).success(function(response) {
            refreshNoteList();
          });
        };


        $scope.edittab = function(id) {

          console.log(id);
          console.log("into tab");
          $http.get('/notelist/' + id).success(function(response) {
            $scope.note = response;
          });
        };

        $scope.updatetab = function(newtab) {

          //newtab.tab_name = $scope.note.tab_name;
          //newtab.tab_content = $scope.note.tab_content
          console.log("add this edit tab");
          console.log(newtab);
          console.log("end add this edit tab");
          console.log(newtab._id);


          $http.put('/notelist/' + newtab._id, newtab).success(function(response) {
            refreshNoteList();
          });
        };

        /*---- tabs private----*/

        $scope.tabIndexPrivate = 0;

        $scope.selectTabPrivate = function(setTab) {
          console.log("set Tab: " + setTab);
          $scope.tabIndexPrivate = setTab;
        };

        $scope.isSelectedPrivate  = function(checkTab) {
            console.log("check Tab: " + checkTab);
          return $scope.tabIndexPrivate === checkTab;
        };


        var refreshNoteListPrivate = function() {
          if(UserFacebookID.user.id) {

            var listParams = {
              user_owner: UserFacebookID.user.id,
              project_id: UserFacebookID.project_id
            };

            $http.post('/notelistownerprivate' , listParams).success(function(response) {
              console.log("refresh tab");
              $scope.notelistprivate = response;
              console.log($scope.notelistprivate);
              $scope.noteprivate = "";
            });
          }
        };

        refreshNoteListPrivate();


        $scope.addnewtabprivate = function() {
          //console.log(newtab);
          console.log("add new private note");

          if(UserFacebookID.user.id) {

            var newnote = {
              user_owner: UserFacebookID.user.id,
              id_tab: "note",
              tab_name: "note",
              id_project: UserFacebookID.project_id ,
              tab_content: ""
            };
            console.log(newnote);
            $http.post('/notelistprivate', newnote).success(function(response) {
              console.log(response);
              refreshNoteListPrivate();
            });
          }
        };

        $scope.removetabprivate = function(id) {
          console.log(id);
          $http.delete('/notelistprivate/' + id).success(function(response) {
            refreshNoteListPrivate();
          });
        };


        $scope.edittabprivate = function(id) {

          console.log(id);
          console.log("into tab");
          $http.get('/notelistprivate/' + id).success(function(response) {
            $scope.noteprivate = response;
          });
        };

        $scope.updatetabprivate = function(newtab) {
          console.log("add this edit tab");
          console.log(newtab);
          console.log("end add this edit tab");
          console.log(newtab._id);

          $http.put('/notelistprivate/' + newtab._id, newtab).success(function(response) {
            refreshNoteListPrivate();
          });
        };



}])




// #end
})()
