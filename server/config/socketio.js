/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {

  socket.on('join', function(doc) {
    onJoinRoom(socket, doc)
  });

  socket.on('leave', function(doc) {
    onLeaveRoom(socket, doc)
  });
}

function onJoinRoom (socket, eventId)
{
    socket.join(eventId);
    socket.broadcast.to(eventId).emit('addUser', socket.username);
}

function onLeaveRoom (socket, eventId)
{
    socket.leave(eventId);
    socket.broadcast.to(eventId).emit('removeUser', socket.username);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  require('../api/participant/participant.socket').register(socketio);
  require('../api/message/message.socket').register(socketio);
  require('../api/event/event.socket').register(socketio);
  require('../api/group/group.socket').register(socketio);

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
};
