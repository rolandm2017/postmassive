const { number } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const pollSchema = new Schema({
    _id: { type: String },
    postNumber: { type: Number, required: true },
    postIsAccessible: { type: Boolean, required: false }, // if this is ever False, its b/c a user 'deleted' their post.
    monetaryCost: { type: Number, required: true, default: 1 }, // postNumber, monetaryCost, postedByUser, text, date, replies, amps, likes,
    //
    postedByUser: { type: String, required: true },
    // displayName: { type: String, required: true }, // this totally isnt needed
    text: { type: String, required: true },
    date: { type: String, required: true },
    // engagement
    replies: { type: Number, required: true, default: 0 },
    amps: { type: Number, required: true, default: 0 },
    likes: { type: Number, required: true, default: 0 },
    views: { type: Number, required: true, default: 0 },
    // modifiers
    hasImage: { type: Boolean, required: true, default: false }, // false ??
    imageURL: { type: String, required: false },
    // indicates whether the massive is a quote tweet.
    quotesSomeone: { type: Boolean, required: true, default: false },
    quotedMassiveId: { type: String, required: false },
    // markings for highlighting
    stylings: { type: Array }, // this is better than like 5
    // flooring
    viewsFloor: { type: Number, required: true, default: 100 }, // default guaranteed engagement
    likesFloor: { type: Number, required: true, default: 3 }, // default guaranteed engagement
    repliesFloor: { type: Number, required: true, default: 1 }, // default guaranteed engagement
    emoji: {
        type: Object,
    },
    pollId: { type: String, required: true },
    options: { type: Array }, // array of Poll objects
    // TODO: should really make these a "simplified" version for PM.
});

module.exports = mongoose.model("Poll", pollSchema);
