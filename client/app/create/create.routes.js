'use strict';

angular.module('iminApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('create', {
        url: '/create',
        abstract: true,
        templateUrl: 'app/create/create.html',
        controller: 'CreateCtrl'
      })
      .state('create.group', {
        url: '/group',
        templateUrl: 'app/create/state-create-group.html',
        authenticate: true
      })
      .state('create.event', {
        url: '/event',
        templateUrl: 'app/create/state-create-event.html',
        authenticate: true
      });

    $urlRouterProvider.when('/create', '/create/group');
  });
