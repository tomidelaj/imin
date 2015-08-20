'use strict';

angular.module('iminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('events', {
        url: '/event',
        templateUrl: 'app/event/templates/events.html',
        controller: 'EventCtrl'
      })
      .state('event', {
        url: '/event/:eventId',
        templateUrl: 'app/event/templates/event.html',
        controller: 'EventCtrl'
      });
  });
