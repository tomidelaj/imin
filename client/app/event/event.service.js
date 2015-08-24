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

angular.module('iminApp').factory('EventParticipantFactory', function($resource) {

  var baseUrl = 'api/events/:eventId/participants/:participantId';

  return function(eventId) {
    return $resource(baseUrl, {
      participantId: '@_id',
      eventId: eventId
    });
  };
});
