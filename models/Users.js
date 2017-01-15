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
	var that = {};

	that.addUser = function(firstName, lastName, email, entityId, callback) {
		// if anything blank or email exists, respond with an error message
		userModel.find({email: email}).exec(function(err, users) {
			var user = new userModel({
				firstName: firstName,
				lastName: lastName,
				email: email,
				groups: [],
				entity: entityId,
				preferences: []
			});

			user.save(function(err, newUser) {
				if (err) callback({msg: err});
				else callback(null, newUser);
			})
		})
	}

	that.findUser = function(email, callback) {
		userModel.findOne({ email: email }, function(err, result) {
      	if (err) callback({ msg: err });
	      if (result !== null) {
	        callback(null, result);
	      } else {
	        callback({ msg: 'No such user!' });
	      }
	    });
	}

	that.checkPassword = function(email, password, callback) {
	    userModel.findOne({ email: email }, function(err, result) {
	      if (err) callback({ msg: err });
	      if (result !== null && password === result.password) {
	        callback(null, true);
	      } else {
	        callback(null, false);
	      }
	    });
	}


    Object.freeze(that);
    return that;

})(userModel);

module.exports = Users;