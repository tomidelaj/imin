'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Event = require('../event/event.model'),
  validators = require('../../components/validators/validators');

var MessageSchema = new Schema({
  sender: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
});

MessageSchema.path('sender').validate(validators.validateMessageSender, 'Sender validation failed');
MessageSchema.path('message').validate(validators.validateMessage, 'Message validation failed');

MessageSchema.statics.findByEventId = function(eventId, cb) {
  return this.find({
    event: new mongoose.Types.ObjectId(eventId)
  }, cb);
};

MessageSchema.post('save', function (doc) {
  Event.where({_id: doc.event}).update({$inc: {"stats.messages": 1}}, function(err){
    if (err) throw err;
  });
});

MessageSchema.post('remove', function (doc) {
  Event.where({_id: doc.event}).update({$inc: {"stats.messages": -1}}, function(err){
    if (err) throw err;
  });
});

module.exports = mongoose.model('Message', MessageSchema);
