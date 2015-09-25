'use strict';

angular.module('iminApp')
  .controller('GroupCreateCtrl', function($scope, $http, $state, $mdDialog, Groups) {

    $scope.model = {};

    // TODO: move to service
    $http.get('http://ipinfo.io/json').
     success(function(data) {
       $scope.model.location = data.city;
    });

    $scope.createGroup = function () {
      var group = new Groups({
        slug: $scope.model.name
      });

      group.$save(function (response) {
        $mdDialog.hide();
        $state.go('group.upcoming', {groupId:response._id});
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  });
