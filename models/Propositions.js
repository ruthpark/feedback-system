//Model representing propositions. Note that a proposition is specific to a competition, so if the same person
//competes in different competitions, this would be represented as different propositions. 
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
var _ = require('underscore');

var propositionSchema = Schema({
    title: String,
    evidence: String,
    solution: String,
    thread: [{type: Schema.ObjectId, ref: 'Comment'}],
    tags: [{type: Schema.ObjectId, ref: 'Tag'}],
    lastEdited: { type: Date, default: Date.now },
    lastEditedBy: {type: Schema.ObjectId, ref: 'User'},
    snapshots: [{type: Schema.ObjectId, ref: 'Snapshot'}],
    entity: {type: Schema.ObjectId, ref: 'Entity'},
    status: String,
    upvotes: Number,
});

var propositionModel = mongoose.model('Proposition', propositionSchema);

// helpers
var errorUtils = require('../utils/errorUtils');
var Constants = require('../Constants');

var Propositions = (function(propositionModel) {
    var that = {};

    // TODO: might want to return propositions in a specific order (i.e. by time or by upvotes)
    // maybe populate edited by
    // only return info needed on feed - i.e. not everything, for security purposes..

    /**
     * Exposed function that returns all propostions in entity `entityId`
     * @param  {ObjectId} entityId
     * @param  {Function} callback      - called with the propositions of the entity
     *                                    found successfully, otherwise error
     */
    that.getAllPropositions = function(entityId, callback) {
        propositionModel.findOne({_id:propositionId}).exec(function(err,propositionResult) {
            if(err) callback(err);
            else {
                var climbs = propositionResult.climbs;
                var completedClimbs = climbs.filter(climb => climb.isCompleted);
                callback(null, completedClimbs);
            }
        })
    };

    /**
     * Exposed function that adds a proposition to an entity. 
     * @param {String}   title
     * @param {Array<String>}   tags
     * @param {ObjectId} entityId
     * @param {ObjectId} userId
     * @param {Function} callback               takes (err)
     */
     // TODO: replace tags with tag id's, or figure out how to ref by name
     // maybe have it return the new prop..? idk
    that.addProposition = function(title, tags, userId, entityId, callback) {
        if (title == null || title == "") {
            callback({
                msg: errorUtils.BlankField(),
            })
        } else {
            propositionModel.find({title: title, entity:entityId}).exec(function(err, propositions){
                if (err) callback({msg:err});
                else if (propositions.length) {
                    callback({
                        msg:errorUtils.PropositionAlreadyExists(title),
                    });
                } else{
                    var proposition = new propositionModel({
                        title: title,
                        tags: tags,
                        lastEditedBy: userId,
                        entity: entityId,
                        status: Constants.PropositionStatus.UNRESOLVED,
                        upvotes: 0,
                        snapshots: [],
                        thread: []
                    });

                    proposition.save(function(err) {
                        if (err) callback({msg: err});
                        else callback(null);
                    });
                };
            });
        }
    };

    //TODO: that.upvoteProposition



    Object.freeze(that);
    return that;

})(propositionModel);

module.exports = Propositions;