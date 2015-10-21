'use strict';

var express = require('express');

var router = express.Router();

// Insert routes below
//router.use('/messages', require('./message'));
router.use('/events', require('./event'));
router.use('/groups', require('./group'));
router.use('/users', require('./user'));

module.exports = router;
