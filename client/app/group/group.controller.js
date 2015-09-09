'use strict';

angular.module('iminApp')
  .controller('GroupCtrl', function($scope, $location, $stateParams, Groups, ngDialog) {

    var getEvents = function() {
      Groups.events({
        groupId: $stateParams.groupId
      }).$promise.then(function(events) {
        $scope.events = events;
      });
    };

    $scope.group = Groups.get({
      groupId: $stateParams.groupId
    });

    getEvents();

    $scope.pending = Groups.pending({
      groupId: $stateParams.groupId
    });

    $scope.createEventDialog = function() {
      ngDialog.open({
        template: 'app/group/views/new-event-modal.html',
        controller: 'NewEventCtrl',
        showClose: true,
        data: {
          groupId: $stateParams.groupId
        }
      }).closePromise.then(function(data) {
        if (_.has(data.value, 'eventCreated')) {
          getEvents();
        }
      });
    };

  });
