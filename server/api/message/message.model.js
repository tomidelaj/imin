'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validators = require('../validators');

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

module.exports = mongoose.model('Message', MessageSchema);
