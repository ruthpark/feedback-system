// users are part of one entity, and can belong to more than one group, as user or admin
// Note that a user is specific to a competition, so if the same person
//competes in different competitions, this would be represented as different users.
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
var _ = require('underscore');

// TODO: change email to actual credentials
// TODO: change groups to have key value pairs of groups and role (member vs admin)
var userSchema = Schema({
    firstName: String,
    lastName: String,
    email: String,
    groups: [{type: Schema.ObjectId, ref: 'Group'}],
    entity: {type: Schema.ObjectId, ref: 'Entity'},
    preferences: [{type: Schema.ObjectId, ref: 'Tag'}],
});

var userModel = mongoose.model('User', userSchema);

// helpers
var errorUtils = require('../utils/errorUtils');

var Users = (function(userModel) {

    Object.freeze(that);
    return that;

})(userModel);

module.exports = Users;