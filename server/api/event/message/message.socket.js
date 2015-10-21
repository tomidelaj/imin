/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Message = require('./message.model');

exports.register = function(io) {
  Message.schema.post('save', function(doc) {
    onSave(io, doc);
  });
  Message.schema.post('remove', function(doc) {
    onRemove(io, doc);
  });
}

function onSave(io, doc, cb) {
  io.to(doc.event.toString()).emit('message:save', doc);
}

function onRemove(io, doc, cb) {
  io.to(doc.event.toString()).emit('message:remove', doc);
}
