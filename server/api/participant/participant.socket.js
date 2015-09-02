/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Participant = require('./participant.model');

exports.register = function(io) {
  Participant.schema.post('save', function (doc) {
    onSave(io, doc);
  });
  Participant.schema.post('remove', function (doc) {
    onRemove(io, doc);
  });
}

function onSave(io, doc, cb) {
  console.log('Event:  '+doc.event.toString());
  io.to(doc.event.toString()).emit('participant:save', doc);
}

function onRemove(io, doc, cb) {
  io.to(doc.event.toString()).emit('participant:remove', doc);
}
