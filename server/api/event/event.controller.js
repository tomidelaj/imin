'use strict';

var _ = require('lodash');
var Event = require('./event.model');
var Message = require('../message/message.model');
var Participant = require('../participant/participant.model');

// Get list of events
exports.index = function(req, res) {
  Event.find(function (err, events) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(events);
  });
};

// Get a single event
exports.show = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.status(404).send('Not Found'); }
    return res.json(event);
  });
};

// Creates a new event in the DB.
exports.create = function(req, res) {
  Event.create(req.body, function(err, event) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(event);
  });
};

// Updates an existing event in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Event.findById(req.params.id, function (err, event) {
    if (err) { return handleError(res, err); }
    if(!event) { return res.status(404).send('Not Found'); }
    var updated = _.merge(event, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(event);
    });
  });
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.status(404).send('Not Found'); }
    event.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.messagesIndex = function(req, res) {
  Message.findByEventId(req.params.id, function(err, messages) {
    if(err) { return handleError(res, err); }
    return res.json(messages);
  });
};

exports.messageCreate = function(req, res) {
  Message.create(req.body, function(err, event) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(event);
  });
};

exports.participantsList = function (req, res) {
  Participant.findByEventId(req.params.id, function(err, messages) {
    if(err) { return handleError(res, err); }
    return res.json(messages);
  });
};

exports.participantsCreate = function (req, res) {
  Participant.create(req.body, function(err, event) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(event);
  });
};

exports.participantsDelete = function (req, res) {
  Participant.findById(req.params.participantId, function (err, participant) {
    if(err) { return handleError(res, err); }
    if(!participant) { return res.status(404).send('Not Found'); }
    participant.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
