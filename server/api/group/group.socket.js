/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Group = require('./group.model');

exports.register = function(io) {
  Group.schema.post('save', function (doc) {
    onSave(io, doc);
  });
  Group.schema.post('remove', function (doc) {
    onRemove(io, doc);
  });

  Group.schema.post('update', function (doc) {
    onRemove(io, doc);
  });
}

function onSave(io, doc, cb) {
  io.emit('group:save', doc);
}

function onRemove(io, doc, cb) {
  io.emit('group:remove', doc);
}

function onUpdate(io, doc, cb) {
  io.to(doc._id).emit('group:update', doc);
}
