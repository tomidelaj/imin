'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ParticipantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
});

ParticipantSchema.path('name').validate(function (value){
  return value.length <= 20;
}, 'Sender validation failed');

ParticipantSchema.statics.findByEventId = function(eventId, cb) {
  return this.find({
    event: new mongoose.Types.ObjectId(eventId)
  }, cb);
};

module.exports = mongoose.model('Participant', ParticipantSchema);
