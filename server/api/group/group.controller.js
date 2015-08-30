'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Group = require('./group.model');
var Event = require('../event/event.model');

// Get list of groups
exports.list = function(req, res) {
  Group.find(function (err, groups) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(groups);
  });
};

// Get a single group
exports.show = function(req, res) {
  return res.json(req.group);
};

// Creates a new group in the DB.
exports.create = function(req, res) {
  Group.create(req.body, function(err, group) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(group);
  });
};

// Updates an existing group in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }

  var updated = _.merge(req.group, req.body);
  updated.save(function (err) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(updated);
  });
};

// Deletes a group from the DB.
exports.destroy = function(req, res) {
  req.group.remove(function (err) {
    if(err) { return handleError(res, err); }
    return res.status(204).send('No Content');
  });
};

// Get a single group
exports.events = function(req, res) {
  Event.findByGroupId(req.params.id, function(err, events){
    if(err) { return handleError(res, err); }
    return res.json(events);
  });
};

exports.groupById = function(req, res, next, id){
  if (!mongoose.Types.ObjectId.isValid(id))
  {
    return res.status(400).send('Group is invalid');
  }

  Group.findById(req.params.id, function (err, group) {
    if(err) { return next(); }
    if(!group) { return res.status(404).send('Not Found'); }

    req.group = group;
    next();
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}
