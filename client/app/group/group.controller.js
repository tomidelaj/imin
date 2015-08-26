'use strict';

angular.module('iminApp')
  .controller('GroupCtrl', function ($scope, $location, $stateParams, Groups) {
    $scope.find = function () {
      $scope.groups = Groups.query();
    };


    $scope.remove = function (group) {

      group.$remove();

      for (var i in $scope.groups) {
        if ($scope.groups[i] === group) {
          $scope.group.splice(i, 1);
        }
      }
    };

    $scope.create = function () {
      var group = new Groups({
        slug: $scope.newGroup
      });

      group.$save(function (response) {
        $location.path('group/' + response.slug);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };


    $scope.initData = function () {
      $scope.group = Groups.get({
        groupId: $stateParams.groupId
      });

      Groups.events({
        groupId: $stateParams.groupId
      }).$promise.then(function(events){
        $scope.events = events;
      });
    };
  });
