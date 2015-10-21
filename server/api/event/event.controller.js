'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Event = require('./event.model');

// Get list of events
exports.index = function(req, res) {
  Event.find(function (err, events) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(events);
  });
};

// Get a single event
exports.show = function(req, res) {
  return res.json(req.event);
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

  var updated = _.merge(req.event, req.body);
  updated.save(function (err) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(updated);
  });
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
  var event = req.event;

  event.remove(function(err){
    if(err) { return handleError(res, err); }
    return res.status(204).send('No Content');
  });

};

exports.eventById = function(req, res, next, id){
  if (!mongoose.Types.ObjectId.isValid(id))
  {
    return res.status(400).send('Event is invalid');
  }

  Event.findById(req.params.id, function (err, event) {
    if(err) { return next(); }
    if(!event) { return res.status(404).send('Not Found'); }

    req.event = event;
    next();
  });
};



function handleError(res, err) {
  return res.status(500).send(err);
}
