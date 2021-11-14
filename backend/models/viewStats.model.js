const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const viewerSchema = new Schema({
    timeOnSite: {},
    timeOnSiteToday: {},
});

module.exports = mongoose.model("Views", messageSchema);
