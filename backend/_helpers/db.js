const config = require("../config.json");
const mongoose = require("mongoose");
const local = config.local;

const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

// THIS SHOULD BE ONLY MONGO CONNECTION
// THIS SHOULD BE ONLY MONGO CONNECTION
// THIS SHOULD BE ONLY MONGO CONNECTION
// THIS SHOULD BE ONLY MONGO CONNECTION
// THIS SHOULD BE ONLY MONGO CONNECTION

if (local) {
    console.log("CONNECTED LOCALLY to the db", config.localConnect);
    mongoose.connect(config.localConnect, connectionOptions);
} else {
    console.log("mongoose connects: remote db", config.connectionString);
    mongoose.connect(config.connectionString, connectionOptions);
}

module.exports = {
    Massive: require("../models/massive.model"),
    User: require("../models/user.model"),
    Message: require("../models/message.model"),
    isValidId,
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}
