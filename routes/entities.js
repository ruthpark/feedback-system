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
 * GET /entities/:entity_code/propositions
 * Get all propositions in entity
 * Response:
 *      - success: true if the server succeeded
 *          + content.propositions: the propositions in the entity
 *      - err: on error, an error message
 */
router.get('/:entity_code/propositions', requireLoggedIn, function(req,res) {
    var entityId = req.session.userId;
    Propositions.getAllPropositions(entityId, function(err, propositions) {
        if (err) {
            utils.sendErrorResponse(res, err.msg, 400);
        } else {
            utils.sendSuccessResponse(res, {propositions: propositions});
        }
    });
});

module.exports = router;
