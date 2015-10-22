'use strict';

// https://github.com/ncb000gt/node-cron

var CronJob = require('cron').CronJob,
  Event = require('../../api/event/event.model');

module.exports = function() {

  // Handle repeatable events every 15 minutes
  new CronJob('* * * * * *', function() {
    console.log('finding')
    Event.find({
      repeatable: {
        isRepeatable: true,
        hasRepeated: false
      }
    }, function(err, docs) {
      debugger;
    });
  }, null, true, 'Europe/Ljubljana');
};
