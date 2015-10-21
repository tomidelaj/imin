'use strict';

var mongoose = require('mongoose'),
    Event = require('../event.model'),
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

ParticipantSchema.post('save', function (doc) {
  Event.where({_id: doc.event}).update({$inc: {"stats.participants": 1}}, function(err){
    if (err) throw err;
  });
});

ParticipantSchema.post('remove', function (doc) {
  Event.where({_id: doc.event}).update({$inc: {"stats.participants": -1}}, function(err){
    if (err) throw err;
  });
});



module.exports = mongoose.model('Participant', ParticipantSchema);
