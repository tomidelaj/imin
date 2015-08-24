/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Group = require('../api/group/group.model');
var Event = require('../api/event/event.model');
var Message = require('../api/message/message.model');
var Participant = require('../api/participant/participant.model');
var Thing = require('../api/thing/thing.model');
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
  }, function (err, group) {
    Event.create({
      name: "Event 1",
      date: new Date(),
      group: group._id
    }, function(err, event) {
      Message.create({
        sender: 'Mario',
        message: 'Prneste žogo',
        date: new Date(),
        event: event._id
      });
    });
  });
});

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
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
