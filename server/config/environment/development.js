'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/imin-dev'
  },

  seedDB: false,
  DEBUG: 'http*,socket.io:socket'
};
