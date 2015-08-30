'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Message = require('./message.model');

// Get list of messages
exports.index = function(req, res) {
  Message.findByEventId(req.event._id, function(err, messages) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(messages);
  });
};

// Get a single message
exports.show = function(req, res) {
  return res.json(req.message);
};

// Creates a new message in the DB.
exports.create = function(req, res) {
  var message = new Message (req.body);
  message.event = req.event._id;

  message.save(function (err){
    if (err) { return handleError(res, err); }
    return res.status(201).json(message);
  });
};

// Updates an existing message in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  var message = req.message;

  var updated = _.merge(message, req.body);
  updated.save(function(err) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(message);
  });
};

// Deletes a message from the DB.
exports.destroy = function(req, res) {
  req.message.remove(function(err) {
    if (err) { return handleError(res, err); }
    return res.status(204).send('No Content');
  });
};

exports.messageById = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Message is invalid');
  }

  Message.findById(req.params.id, function(err, message) {
    if (err) { return next(); }
    if (!message) { return res.status(404).send('Not Found'); }
    if (!message.event.equals(req.event._id)) { return res.status(404).send('Not Found'); }

    req.message = message;
    next();
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
