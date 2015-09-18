'use strict';

angular.module('iminApp')
  .controller('GroupCreateCtrl', function($scope, $http) {

    $scope.model = {};

    $http.get('http://ipinfo.io/json').
     success(function(data) {
       $scope.model.location = data.city;
    });

    $scope.createGroup = function() {
      console.log('Create group...');
    };
  });
