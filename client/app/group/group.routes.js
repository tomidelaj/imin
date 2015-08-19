'use strict';

angular.module('iminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('viewGroup', {
        url: '/group/:groupId',
        templateUrl: 'app/group/views/view-group.html',
        controller: 'GroupCtrl'
      })
      .state('group', {
        url: '/group',
        templateUrl: 'app/group/views/group.html',
        controller: 'GroupCtrl'
      })
  });
