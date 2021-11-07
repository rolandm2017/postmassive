const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const massiveSchema = new Schema({
    postNumber: { type: Number, required: true },
    postIsAccessible: { type: Boolean, required: false }, // if this is ever False, its b/c a user 'deleted' their post.
    //
    postedByUser: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String, required: true },
    // engagement
    replies: { type: Number, required: true },
    amps: { type: Number, required: true },
    likes: { type: Number, required: true },
    // modifiers
    hasImage: { type: Boolean, required: true }, // false ??
    imageURL: { type: String, required: false },
    // indicates whether the massive is a quote tweet.
    quotesSomeone: { type: Boolean, required: true },
    quotedMassiveId: { type: String, required: false },
    // markings for highlighting
    highlightRange: { type: Object },
    underlineRange: { type: Object },
    italicsRange: { type: Object },
    boldRange: { type: Object },
    fontSize: { type: Number },
    upsizedFontRange: { type: Object },
    // flooring
    viewsFloor: { type: Number, required: true },
    likesFloor: { type: Number, required: true },
    repliesFloor: { type: Number, required: true },
});

module.exports = mongoose.model("Massive", massiveSchema);
