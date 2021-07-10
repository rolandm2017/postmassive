const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const accountSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    accountCreatedAt: { type: Date, required: true },
    verificationCode: { type: String, required: true },
    accountVerifiedAt: { type: Date },
    failedVerifications: { type: Number, required: true },
    activeAccount: { type: Boolean, required: true }, // "finished signup?"
    accountType: { type: String, required: true }, // user, moderator, admin,
    resetToken: {
        token: String,
        expires: Date,
    },
    passwordResetAt: { type: Date },
    verifiedAt: { type: Date },
    lastUpdatedInfo: { type: Date },
    acceptsTermsAndConditions: { type: Boolean, required: true },

    suspended: { type: Boolean, required: true },

    displayName: { type: String, required: true },
    bio: { type: String, required: true },
    location: { type: String, required: false },
    url: { type: String, required: false },
    followers: { type: Number, required: true },
    following: { type: Number, required: true },
    DMsAreOpen: { type: Boolean, required: true },
    postCount: { type: Number, required: true },
});

// schema.virtual("isVerified").get(function () {
//     return !!(this.verified || this.passwordReset);
// });

// schema.set("toJSON", {
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc, ret) {
//         // remove these props when object is serialized
//         delete ret._id;
//         delete ret.passwordHash;
//     },
// });

module.exports = mongoose.model("Account", accountSchema);
