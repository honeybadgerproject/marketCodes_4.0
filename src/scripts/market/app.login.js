;(function() {
"use strict";


angular.module("app.login" , [])

// disable spinner in loading-bar
.run(function($rootScope, $location, $cookieStore, UserFacebookID) {

  // register listener to watch route changes
  $rootScope.$on( "$routeChangeStart", function(event, next) {

    var current = $location.path();
    if(current == "/404") current = "/pages/signin";
    console.log("step 1... about to authenticate - toState: " + current  + " logged: " + UserFacebookID.logged);

    // Get cookie
   /* UserFacebookID.user = $cookieStore.get('userCached');
    if(UserFacebookID.user.status == "connected") {
    	UserFacebookID.logged == true;
        console.log(UserFacebookID.user);
    }*/

    console.log(UserFacebookID.logged);
    if ( UserFacebookID.logged == false ) {
      // no logged user, we should be going to #login (current path equal to signin)
      if ( current == "/pages/signin" ) {
        // already going to #login, no redirect needed
      //    $cookieStore.remove('userCached');
      } else {
        // not going to #login, we should redirect now (current path different to signin)
        console.log("step 2... save current state " + current);
        UserFacebookID.scopeState = current;
        console.log("step 3... jump to login  " +   UserFacebookID.scopeState);
        $location.path( "/pages/signin" );
        event.preventDefault();
      }
    }
    else {
    	if(current == "/pages/signin") $location.path( "/dashboard" );
    }

  });
})


// Root Controller
.controller("loginCtrl", ["$rootScope", "$scope", "$location", "$timeout", "$cookies", "$cookieStore", "$window", "Facebook", "UserFacebookID" ,
        function($rs, $scope, $location, $timeout, $cookies, $cookieStore, $window, Facebook, UserFacebookID) {

  //'loginCtrl', function($scope, $http, $timeout, $state, $cookies, $cookieStore, $window, Facebook, UserFacebookID
  //"$cookies", "$cookieStore",

  console.log("heloo wombath codes - inside LoginCtrl");



    // Define user empty data :/
    $scope.user = {};

    // Defining user logged status
    $scope.logged = false;

    // And some fancy flags to display messages upon user status change
    $scope.byebye = false;
    $scope.salutation = false;


    ///
    /// Watch for Facebook to be ready.
    ///There's also the event that could be used
    ///

    $scope.$watch(
      function() {
         return Facebook.isReady();
       },
       function(newVal) {
         if (newVal)
           $scope.facebookReady = true;
       }
    );

    var userIsConnected = false;

    Facebook.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        userIsConnected = true;
      }
    });

    ///
    /// IntentLogin
    ///
    $scope.IntentLogin = function() {
      if(!userIsConnected) {
         $scope.login();
       }
    };

    var IntentLoginHTML = function(){
      console.log("step 4... starting the facebook login");
      Facebook.login(function(response) {
        if (response.status == 'connected') {
          $scope.logged = true;
          UserFacebookID.logged = true;

          $scope.me();

          console.log("step 5... jumping to the previus state");
          if(UserFacebookID.scopeState != "/pages/signin") {
            $location.path(UserFacebookID.scopeState);
          }
        }

      }, {scope: 'email,user_likes'});
    };

    ///// >>> emit
     var refreshProjectList = function(){
      console.log("/////>>>> refreshProjectList in emit");
      $scope.$emit('refreshProjectList', {});// res - your data
    };

    ///
    /// Login
    ///
    $scope.login = function() {
      // start login at the beggining
      console.log("step 4... starting the facebook login");
      Facebook.login(function(response) {
        if (response.status == 'connected') {
          $scope.logged = true;
          UserFacebookID.logged = true;
          console.log("authenticate log 1..");
          console.log(response);

          $scope.me();

          console.log("step 5... jumping to the previus state");
          if(UserFacebookID.scopeState != "/pages/signin") {
            $location.path(UserFacebookID.scopeState);
            console.log("authenticate log 2.. jump previus state");
          }
        }

      }, {scope: 'email,user_likes'});
    };

    ///
    /// me
    ///
    $scope.me = function() {
      Facebook.api('/me', function(response) {
        ///
        /// Using $scope.$apply since this happens outside angular framework.
        ///

        console.log("authenticate log 4.. inside me");
        console.log(response);

        console.log("step 6... adding the user info");
        $scope.$apply(function() {
          $scope.user = response;
          UserFacebookID.user = response;
          console.log("authenticate log 3.. inside me");
          console.log(response);
        //  console.log(response.email);

          console.log("cookie >> step 1... adding the user info to cookie");
          // Put cookie
          //$cookies.userName =   UserFacebookID.user.name;
          //$scope.platformCookie = $cookies.userName;
          //$cookieStore.put('userCached', response);
          console.log("set cookie");

          console.log("1. send the current user to sever");
          console.log(UserFacebookID.user);
          //refreshProjectList();

        });
      });
    };

    ///
    /// Logout
    ///
    $scope.logout = function() {
      Facebook.logout(function() {
        $scope.$apply(function() {
          $scope.user   = {};
          $scope.logged = false;
          UserFacebookID.user = {};
          // Removing a cookie
          //$cookieStore.remove('userCached');
          console.log("remove cookie");
          UserFacebookID.logged = false;
          userIsConnected = false;
          $location.path("/pages/signin");
        //  event.preventDefault();
        });
      });
    };

    ///
    /// Taking approach of Events :D
    ///
    $scope.$on('Facebook:statusChange', function(ev, data) {
      console.log('Status: ', data);
      if (data.status == 'connected') {
        $scope.$apply(function() {
          $scope.salutation = true;
          $scope.byebye     = false;

          //UserFacebookID.user = $cookieStore.get('userCached');
          //console.log(UserFacebookID.user);
          //console.log("get cookie");

          //$scope.user   = {};
          $scope.logged = true;
          //UserFacebookID.user = {};
          UserFacebookID.logged = true;
          $location.path("/dashboard");
          //refreshProjectList();

        });
      } else {
        $scope.$apply(function() {
          $scope.salutation = false;
          $scope.byebye     = true;
          userIsConnected = false;
        //  $cookieStore.remove('userCached');
          // Dismiss byebye message after two seconds
          $timeout(function() {
            $scope.byebye = false;
          }, 2000)
        });
      }
    });



}])



// #end
})()
