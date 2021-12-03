const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const messageSchema = new Schema({
    users: { type: Array, required: true },
    userMsgs: { type: Array, required: true }, //
    // **
    // * KISS - I won't need more than what I already have
    // **

    // this area is for if its somoene linking a massive or an image
    // linksSomeonesMassive: { type: Boolean, required: true },
    // linkedMassiveId: { type: String, required: false }, //
    // hasImage: { type: Boolean, required: true },
    // imageURL: { type: String, required: false },
    // **
    // * KISS - I won't need more than what I already have
    // **
});

module.exports = mongoose.model("Message", messageSchema);
