// TODO: might want an auth helper in utils at some point

var error_utils = (function() {

    var that = {};

    // AlreadyExists
    that.PropositionAlreadyExists = function(propTitle) {
        return "There is already a problem called '" + propTitle + "'.";
    };

    // TODO: once credentials figured out.. username/email for now?
    that.UserAlreadyExists = function(credentials) {
        return "There is already an account under these credentials.";
    };

    that.EntityAlreadyExists = function(entityCode) {
        return "There is already an entity with code '" + entityCode +"'. Please choose a different code";
    };



    // DoesNotExist
    that.PropositionDoesNotExist = function(propositionId, entityCode) {
        return "We could not find a proposition with the id '" + propositionId + "' in '" + entityCode ;
    };

    that.EntityDoesNotExist = function(entityCode) {
        return "We could not find an entity with the code '" + entityCode ;
    };



    // bad form
    that.BlankField = function() {
        return "Fields may not be left blank.";
    };

    // TODO or other form of auth
    that.InvalidEmail = function() {
        return "Invalid email address.";
    };



    // Other
    // TODO: more specific for creating/editing tags.. and other admin things
    that.InvalidPermissions = function() {
        return "You do not have permissions to perform this action. Please sign in as an administrator to perform this action";
    };

    that.UnexpectedError = function() {
        return "An unexpected error occurred.";
    };


    Object.freeze(that);
    return that;
})();

module.exports = error_utils;