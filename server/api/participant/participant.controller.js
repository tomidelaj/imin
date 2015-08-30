'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Participant = require('./participant.model');

// Get list of participants
exports.index = function(req, res) {
  Participant.findByEventId(req.event._id, function (err, participants) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(participants);
  });
};

// Get a single participant
exports.show = function(req, res) {
  return res.json(req.participant);
};

// Creates a new participant in the DB.
exports.create = function(req, res) {
  var participant = new Participant(req.body);
  participant.event = req.event._id;

  participant.save(function (err){
    if(err) { return handleError(res, err); }
    return res.status(201).json(participant);
  });
};

// Updates an existing participant in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }

  var participant = req.participant;
  var updated = _.merge(participant, req.body);
  updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(participant);
  });
};

// Deletes a participant from the DB.
exports.destroy = function(req, res) {
  req.participant.remove(function(err){
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
  });
};

exports.participantById = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Message is invalid');
  }

  Participant.findById(req.params.id, function(err, participant) {
    if (err) { return next(); }
    if (!participant) { return res.status(404).send('Not Found'); }

    if (!participant.event.equals(req.event._id)) { return res.status(404).send('Not Found'); }

    req.participant = participant;
    next();
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
