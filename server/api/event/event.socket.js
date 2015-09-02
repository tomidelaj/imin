/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Event = require('./event.model');

exports.register = function(io) {
  Event.schema.post('save', function (doc) {
    onSave(io, doc);
  });
  Event.schema.post('remove', function (doc) {
    onRemove(io, doc);
  });

  Event.schema.post('update', function (doc) {
    onRemove(io, doc);
  });
}

function onSave(io, doc, cb) {
  io.emit('event:save', doc);
}

function onRemove(io, doc, cb) {
  io.emit('event:remove', doc);
}

function onUpdate(io, doc, cb) {
  io.to(doc._id).emit('event:update', doc);
}
