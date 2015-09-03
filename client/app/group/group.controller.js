'use strict';

angular.module('iminApp')
  .controller('GroupCtrl', function($scope, $location, $stateParams, Groups, ngDialog) {

    $scope.createEvent = function()
    {
      ngDialog.open({
        template: '<h1>Create event</h1><span>Yeah...</span></h1>',
        //controller: 'asdf',
        showClose:false,
        plain: true
      });
    }

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
