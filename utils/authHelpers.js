var AuthHelpers = function(){
 	var that = Object.create(AuthHelpers);
 	var utils = require('../utils/utils.js');

 	that.requireLoggedIn = function(req, res, next) {
	    if (!req.session.userId) {
	        utils.sendErrorResponse(res, 'Must be logged in.', 403);
	    } else {
	        next();
	    }
	};

	Object.freeze(that);
	return that;
}
module.exports = AuthHelpers();