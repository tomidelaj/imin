'use strict';

// https://github.com/ncb000gt/node-cron

var moment = require('moment'),
  CronJob = require('cron').CronJob,
  Event = require('../../api/event/event.model');

module.exports = function() {

  // Handle repeatable events every 15 minutes
  new CronJob('* */15 * * * *', function() {
    Event.find({
        "repeatable.isRepeatable": true,
        "repeatable.hasRepeated": false,
        date: {
          // Hande event 1 hour after it ends
          $lte: moment().add(1, 'hours').toDate()
        }
      }, function(err, docs) {
        docs.forEach(function(event, index, array) {
          // Set current event as obsolete
          event.repeatable.hasRepeated = true;
          event.save();

          // Create new event
          var newEvent = Event.create({
            name: event.name,
            date: moment().add(1, 'weeks').toDate(),
            group: event.group,
            repeatable: {
              isRepeatable: true
            }
          });
        });
      })
      // TODO move timezone to settings
  }, null, true, 'Europe/Ljubljana');
};
