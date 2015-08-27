/* global io */
'use strict';

angular.module('iminApp')
  .factory('EventSocket', function(socketFactory) {

    var ioSocket = io('', {
      path: '/socket.io-client'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });

    var constructEndpoint = function(eventId, modelName, action) {
        return 'event:' + eventId + ':' + modelName + ':' + action;
    };

    return {
      socket: socket,

      syncUpdates: function(eventId, modelName, array, cb) {
        cb = cb || angular.noop;

        socket.on(constructEndpoint(eventId, modelName, 'save'), function(item) {
          var oldItem = _.find(array, {
            _id: item._id
          });
          var index = array.indexOf(oldItem);
          var event = 'created';

          // replace oldItem if it exists
          // otherwise just add item to the collection
          if (oldItem) {
            array.splice(index, 1, item);
            event = 'updated';
          } else {
            array.push(item);
          }

          cb(event, item, array);
        });

        /**
         * Syncs removed items on 'model:remove'
         */
        socket.on(constructEndpoint(eventId, modelName, 'remove'), function(item) {
          var event = 'deleted';
          _.remove(array, {
            _id: item._id
          });
          cb(event, item, array);
        });
      },

      /**
       * Removes listeners for a models updates on the socket
       *
       * @param modelName
       */
      unsyncUpdates: function(eventId, modelName) {
        socket.removeAllListeners(constructEndpoint(eventId, modelName, 'save'));
        socket.removeAllListeners(constructEndpoint(eventId, modelName, 'remove'));
      }
    };
  });
