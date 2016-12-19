/*
 "The best teachers are those who show you where to look, but don't tell
 you what to see"
 */

var express = require('express');
var router = express.Router();
var utils = require('../utils/utils.js');

var Entities = require('../models/Entities');
var Users = require('../models/Users');
var Constants = require('../Constants');

/**
 * GET /auth/currentUser
 * Check who the current user is
 * No request body
 * Response:
 *      - success: true iff there is some user logged in
 */
router.get('/currentUser', function(req, res) {
});

/**
 * POST /auth/login
 */
router.post('/login', function(req, res) {
});

/**
 * POST /auth/logout
 * Attempt to log out user
 * No request parameters
 * Response:
 *      - success: true if climber gets logged out; false otherwise
 *      - err: on error, an error message
 */
router.post('/logout', function(req, res) {
    delete req.session.userId;
    delete req.session.entityId;
    utils.sendSuccessResponse(res);
});

module.exports = router;

