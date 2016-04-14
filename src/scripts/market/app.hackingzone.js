;(function() {
"use strict";

angular.module("app.hackingzone" , [])


// Root Controller
.controller("hackingCtrl", ["$scope", "$http", "$modal","UserFacebookID",
        function($scope, $http, $modal, UserFacebookID) {

        /*---- project selected and global variables ----*/
        $scope.collaboratorlist = {};
        $scope.resourcelist = {};
        $scope.buddylist = {};
        $scope.buddy = {};
        $scope.collaborator = {};
        $scope.resource = {};

      //  $scope.resourcePanelList = { number1: '1', number2: '2', number3: '3', number4:'4',number5:'5' };

        $scope.resource = {};
    		// demo one
    		$scope.resourceTypes = [
    		    { name: 'github',     logo: 'images/resource/github.jpg'},
    		    { name: 'asana',      logo: 'images/resource/asana.jpg'},
    		    { name: 'bitbucket',  logo: 'images/resource/bitbucket.jpg'},
    		    { name: 'slack',      logo: 'images/resource/slack.jpg'},
    		    { name: 'evernote',   logo: 'images/resource/evernote.jpg'},
    		];

        /***** contributor section  *********/

        var refreshContributorsList = function() {

          console.log("-------- refreshContributorList ---------");

          if(UserFacebookID.user.id) {

            var listParams = {
              user_owner: UserFacebookID.user.id,
              project_id: UserFacebookID.project_id
            };

            console.log(listParams);

            $http.post('/buddylistowner/', listParams).success(function(response) {
              console.log("refresh contributor list");
              $scope.contributorlist = response;
              $scope.contributor = "";
              console.log($scope.contributorlist);
            });
          }
        };




        $scope.addnewcontributor = function(newcontributor) {
          console.log(newcontributor);
          console.log($scope.contributor);

          /*
          {_id: "56de2ad0bf89ad822824470b", user_owner: "10206398373092349", user_name: "Yabin Monroy", user_email: "wombath_x@hotmail.com"}
          */

          // update the projectlist with the new user


          if(UserFacebookID.user.id) {

            var arrayContributor = { id_project: UserFacebookID.project_id  ,
                                    user_buddy: newcontributor.user_buddy ,
                                    role: "super"  };

            /*var arrayContributor = { id_project: UserFacebookID.project_id  ,
                                    user_owner: { owner: newcontributor.top_user , role: "super" } };*/
            console.log(">>>>>   top user");
            console.log(arrayContributor);

            //newcontributor.user_owner = UserFacebookID.user.id;
            //newcontributor.id_project = UserFacebookID.project_id;
            $http.post('/buddylist', arrayContributor).success(function(response) {
              console.log(response);

              if($scope.modalInstance)
              {
                $scope.modalInstance.close();
              }

              refreshContributorsList();
            });
          };
        };

        $scope.removecontributor = function(id) {
          console.log(id);
          $http.delete('/cbuddylistowner/' + id).success(function(response) {
            refreshContributorsList();
          });
        };

        $scope.openDialogContributor = function() {

            $scope.modalInstance = $modal.open({
                    templateUrl: 'views/ui/modalContributor.html',
                    scope: $scope
                });
                console.log('modal opened');
                $scope.modalInstance.result.then(function () {
                    console.log($scope.selected);
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });

        };

        /*****  resources section   ****/

        $scope.addnewresource = function(newresource) {
          console.log(newresource);
          //console.log($scope.resource);
          if(UserFacebookID.user.id) {
        	console.log(UserFacebookID.user.id);
        	console.log(UserFacebookID.project_id);

        /*  $scope.resourceTypes = [
              { name: 'github',     logo: 'images/resource/github.jpg'},
              { name: 'asana',      logo: 'images/resource/asana.jpg'},
              { name: 'bitbucket',  logo: 'images/resource/bitbucket.jpg'},
              { name: 'slack',      logo: 'images/resource/slack.jpg'},
              { name: 'evernote',   logo: 'images/resource/evernote.jpg'},
          ];*/

          if(newresource.resource_name == 'github') newresource.resource_logo = $scope.resourceTypes[0].logo;
          else if(newresource.resource_name == 'asana')  newresource.resource_logo = $scope.resourceTypes[1].logo;
          else if(newresource.resource_name == 'bitbucket')  newresource.resource_logo = $scope.resourceTypes[2].logo;
          else if(newresource.resource_name == 'slack')  newresource.resource_logo = $scope.resourceTypes[3].logo;
          else if(newresource.resource_name == 'evernote')  newresource.resource_logo = $scope.resourceTypes[4].logo;
          else  newresource.resource_logo = 'blank';


        	var resource_project = {
        		resource_name: newresource.resource_name,
        		user_owner: UserFacebookID.user.id,
            id_project: UserFacebookID.project_id,
            resource_logo:  newresource.resource_logo,
            resource_title: newresource.resource_title,
            resource_target: newresource.resource_target
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
              refreshResourceZoneList();
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

        $scope.refreshHackingZoneList = function() {
            refreshResourceList();
            refreshContributorsList();
          //  refreshNoteList();
          //  refreshNoteListPrivate();

        };

        var refreshResourceList = function() {
          console.log("------refreshResourceList------");

          if(UserFacebookID.user.id) {

            var listParams = {
              user_owner: UserFacebookID.user.id,
              project_id: UserFacebookID.project_id
            };

            console.log(listParams);

            $http.post('/resourcelistowner/', listParams).success(function(response) {
              console.log("refresh contributor list");
              $scope.resourcelist = response;
              console.log($scope.resourcelist);
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

      //  refreshNoteList();


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

      //  refreshNoteListPrivate();


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
