
'use strict';

angular.module('iminApp')
  .controller('AuthCtrl', function ($scope, Auth, $state, $stateParams, $window) {
    $scope.user = {};
    $scope.errors = {};
    $scope.params = $stateParams;

    console.log($stateParams);

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to target or home
          $state.go($scope.params.target ? $scope.params.target : 'main');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to target or home
          $state.go($scope.params.target ? $scope.params.target : 'main');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {

      var target = $state.href($scope.params.target?$scope.params.target:'main');

      $window.location.href = '/auth/' + provider+'?target='+target;
    };
  });
