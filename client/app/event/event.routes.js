'use strict';

angular.module('iminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('event', {
        url: '/event/:eventId',
        templateUrl: 'app/event/views/event.html',
        controller: 'EventCtrl'
      })
      .state('events', {
        url: '/event',
        templateUrl: 'app/event/views/events.html',
        controller: 'EventCtrl'
      });
  });
