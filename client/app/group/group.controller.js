'use strict';

angular.module('iminApp')
  .controller('GroupCtrl', function($scope, $location, $stateParams, Groups) {

    $scope.group = Groups.get({
      groupId: $stateParams.groupId
    });

    Groups.events({
      groupId: $stateParams.groupId
    }).$promise.then(function(events){
      $scope.events = events;
    });

    $scope.pending = Groups.pending({
      groupId: $stateParams.groupId
    });
  });
