const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// like, amplify, reply, follow, quote ** drop quote maybe

const notificationSchema = new Schema({
    user: { type: String, required: true },
    type: { type: String, required: true }, // type is like, amp, reply, follow, quote
    text: { type: String, required: false }, //
    date: { type: Date, required: true },
    //
    //
    count: { type: Number },
    byWho: { type: String },
});

module.exports = mongoose.model("Notification", messageSchema);
