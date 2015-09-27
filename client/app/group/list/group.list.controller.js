'use strict';

angular.module('iminApp')
  .controller('GroupListCtrl', function($scope, $location, $stateParams, Groups) {

    $scope.find = function() {
      $scope.groups = Groups.query();
    };

    $scope.create = function() {
      var group = new Groups({
        slug: $scope.newGroup
      });

      group.$save(function(response) {
        $location.path('group/' + response.slug);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  });
