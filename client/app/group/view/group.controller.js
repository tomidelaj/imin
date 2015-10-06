'use strict';

angular.module('iminApp')
  .controller('GroupCtrl', function($scope, $location, $state, $stateParams, Groups, ngDialog) {

    $scope.getEvents = function() {
      return Groups.events({
        groupId: $stateParams.groupId
      });
      //.$promise.then(function(events) {
      //  $scope.events = events;
      //});
    };

     $scope.getPending = function() {
      return Groups.pending({
        groupId: $stateParams.groupId
      });
    };

    $scope.group = Groups.get({
      groupId: $stateParams.groupId
    });

    //getEvents();

    //$scope.pending = Groups.pending({
      //groupId: $stateParams.groupId
    //});

    $scope.createEventDialog = function() {
      ngDialog.open({
        template: 'app/event/views/new-event-modal.html',
        controller: 'NewEventCtrl',
        showClose: true,
        data: {
          groupId: $stateParams.groupId
        }
      }).closePromise.then(function(data) {
        if (_.has(data.value, 'eventCreated')) {

          //$scope.pending = Groups.pending({
            //groupId: $stateParams.groupId
          //});

          $state.reload();
        }
      });
    };

  });
