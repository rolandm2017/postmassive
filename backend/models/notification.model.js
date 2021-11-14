const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// like, amplify, reply, follow, quote ** drop quote maybe

const notificationSchema = new Schema({
    username: { type: String, required: true },
    type: { type: String, required: true }, // type is like, amp, reply, follow, quote
    text: { type: String, required: false }, //
    date: { type: Date, required: true },
    //
    //
    count: { type: Number },
    byWho: { type: Array },
    //
    seen: { type: Boolean, required: false }, // if unseen, no field. If seen, field &&true
});

module.exports = mongoose.model("Notification", notificationSchema);
