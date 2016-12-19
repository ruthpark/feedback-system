var BASE_URL = 'http://localhost:3000/entities';

var request = require('request-promise-native');

export default {

	// used for non-localhost environments
	setBaseUrl: (url) => {
		BASE_URL = url + "/propositions";
	},

	// content.propositions
	getAllPropositions: () => {
		return request({
			uri: BASE_URL,
			method: 'GET',
			json: true,
		});
	},

	// content.proposition
	createProposition: (title, tags) => {
		return request({
			uri: BASE_URL + '/create',
			method: 'POST',
			body: {
				title: title,
				tags: tags
			},
			json: true,
		});
	},
}


// getAllProps by upvote order

// upvote prop()