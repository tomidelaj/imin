'use strict';

angular.module('iminApp').factory('Events', function($resource) {

  var baseUrl = 'api/events/:eventId';

  return $resource(baseUrl, {
    eventId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});


angular.module('iminApp').factory('EventMessageFactory', function($resource) {

  var baseUrl = 'api/events/:eventId/messages';

  return function(eventId) {
    return $resource(baseUrl, {
      eventId: eventId
    });
  };
});
