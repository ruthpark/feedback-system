/*
 "If you want to build a ship, don't drum up people to collect wood and
  don't assign them tasks and work, but rather teach them to long for the
  endless immensity of the sea."
 */

var express = require('express');
var router = express.Router();
var utils = require('../utils/utils.js');

var Propositions = require('../models/Propositions');

var Constants = require('../Constants');

// TODO: authhelper in utils to ensure logged in

/**
 * PUT /propositions/:proposition_id/upvote
 * Upvote proposition
 */
router.put('/:proposition_id/upvote', requireLoggedIn, function(req, res) {
});

module.exports = router;