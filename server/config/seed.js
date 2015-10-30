/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Group = require('../api/group/group.model');
var Member = require('../api/group/member/member.model');
var Event = require('../api/event/event.model');
var Message = require('../api/event/message/message.model');
var Participant = require('../api/event/participant/participant.model');
var User = require('../api/user/user.model');
var mongoose = require('mongoose');

var p = new mongoose.Promise();
var userAdmin, userTest, groupFuzbal, groupBasket;

p
.then(function () {return User.remove({}).exec()})
.then(function () {return Group.remove({}).exec()})
.then(function () {return Member.remove({}).exec()})
.then(function () {return Event.remove({}).exec()})
.then(function () {return Message.remove({}).exec()})
.then(function () {return Participant.remove({}).exec()})
.then(function () {
    return User.create({
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    },{
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }).then(function (admin, test){
      userAdmin = admin;
      userTest = test;
    });
})
.then(function () {
    return Group.create({
    name: 'Fuzbal (Xlab)',
    slug: 'fuzbal',
    owner: userAdmin._id,
    description: 'Ale sisiji xlabovi'
  },{
    name: 'Basket',
    slug: 'basket',
    owner: userTest._id,
    description: 'Ale basketasi'
  }).then(function (fuzbal, basket) {
    groupFuzbal = fuzbal;
    groupBasket = basket;
  });
})
.then(function () {
    return Event.create({
      name: "Event Fuzbal 1",
      location: 'Dunajska',
      group: groupFuzbal._id,
      repeatable: {
        isRepeatable: true
      }
    },{
      name: "Event Basket 1",
      group: groupBasket._id,
      repeatable: {
        isRepeatable: true
      }
    });
})
.then(function (event) {
    Message.create({
        sender: 'Mariano',
        message: 'Prneste žogo',
        date: new Date(),
        event: event._id
      });

      Member.create({
        group: groupFuzbal._id,
        user: userTest._id
      });

      return Participant.create({
        name: 'Jure Polutnik',
        event: event._id
      });
});

p.fulfill();
