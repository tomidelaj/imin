'use strict';

angular.module('iminApp').factory('Events', function($resource) {

  return $resource('api/events/:eventId', {
    eventId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});
