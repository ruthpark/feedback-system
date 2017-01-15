/*
 "If you want to build a ship, don't drum up people to collect wood and
  don't assign them tasks and work, but rather teach them to long for the
  endless immensity of the sea."
 */

var express = require('express');
var router = express.Router();
var utils = require('../utils/utils.js');
var AuthHelpers = require('../utils/authHelpers.js');
var requireLoggedIn = AuthHelpers.requireLoggedIn;

var Propositions = require('../models/Propositions');

var Constants = require('../Constants');

// TODO: authhelper in utils to ensure logged in, and entity id set

/**
 * GET /propositions
 * Get all propositions in current entity
 * Response:
 *      - success: true if the server succeeded
 *          + content.propositions: the propositions in the entity
 *      - err: on error, an error message
 */
router.get('/', requireLoggedIn, function(req,res) {
    var entityId = req.session.entityId;
    Propositions.getAllPropositions(entityId, function(err, propositions) {
        if (err) {
            utils.sendErrorResponse(res, err.msg, 400);
        } else {
            utils.sendSuccessResponse(res, {propositions: propositions});
        }
    });
});

/**
 * POST /propositions/create
 * Create new proposition in current entity
 * Response:
 *      - success: true if the server succeeded
 *      - err: on error, an error message
 */
router.post('/create', requireLoggedIn, function(req, res) {
    var entityId = req.session.entityId;
    var title = req.body.title;
    var tags = req.body.tags;
    Propositions.addProposition(title, tags, userId, entityId, function(err) {
        if (err) {
            utils.sendErrorResponse(res, err.msg, 400);
        } else {
            utils.sendSuccessResponse(res, {});
        }
    });
});

/**
 * PUT /propositions/:proposition_id/upvote
 * Upvote proposition
 */
router.put('/:proposition_id/upvote', requireLoggedIn, function(req, res) {
});

module.exports = router;
