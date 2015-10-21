/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Group = require('../api/group/group.model');
var Event = require('../api/event/event.model');
var Message = require('../api/event/message/message.model');
var Participant = require('../api/event/participant/participant.model');
var User = require('../api/user/user.model');

Event.find({}).remove(function () { });

Group.find({}).remove(function() {
  Group.create({
    name: 'Fuzbal (Xlab)',
    slug: 'fuzbal',
    description : 'Ale sisiji xlabovi'
  }, function (err, group) {
    Event.create({
      name: "Event 1",
      group: group._id
    }, function (err, event){
      Message.create({
        sender: 'Mariano',
        message: 'Prneste žogo',
        date: new Date(),
        event: event._id
      });

      Participant.create({
        name: 'Jure Polutnik',
        event: event._id
      });

      Participant.create({
        name: 'Primoz Hadalin',
        event: event._id
      });
    });

    Event.create({
      name: "Event 2",
      group: group._id
    });

    Event.create({
      name: "Event 3",
      users: [],
      group: group._id
    });
  });

  Group.create({
    name : 'Basket (Xlab)',
    slug : 'basket',
    description : '...'
  }, function (err, group) {});
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
