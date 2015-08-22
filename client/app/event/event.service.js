'use strict';

angular.module('iminApp').factory('Events', function($resource) {

  var baseUrl = 'api/events/:eventId';

  return $resource(baseUrl, {
    eventId: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    messages: {
      url: baseUrl + '/messages',
      method: 'GET',
      isArray: true
    }
  });
});
