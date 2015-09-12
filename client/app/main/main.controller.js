'use strict';

angular.module('iminApp')
  .controller('MainCtrl', function ($scope, $mdDialog, $location, ngDialog, Groups) {

    $scope.createGroupDialog = function() {
      $mdDialog.show({
        templateUrl: 'app/group/views/group-create-modal.html',
        controller: 'GroupCreateCtrl'
      });
    };

    $scope.createGroup = function () {
      var group = new Groups({
        slug: $scope.newGroup
      });

      group.$save(function (response) {
        $location.path('group/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.find = function () {
      $scope.groups = Groups.query();
    };
  });
