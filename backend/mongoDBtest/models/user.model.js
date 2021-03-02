const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    username: { type: String, required: true },
    displayName: { type: String, required: true },
    bio: { type: String, required: true },
    location: { type: String, required: false },
    url: { type: String, required: false },
    joinDate: { type: Date, required: true },
    birthday: { type: Date, required: true },
    followers: { type: Number, required: true },
    following: { type: Number, required: true },
    DMsAreOpen: { type: Boolean, required: true },
    postCount: { type: Number, required: true },
    suspended: { type: Boolean, required: true }, // "finished signup?"
    accountType: { type: String, required: true }, // user, moderator, admin, verified
});

module.exports = mongoose.model("User", userSchema);
