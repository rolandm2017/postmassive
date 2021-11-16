const config = require("../config.json");
const mongoose = require("mongoose");
const local = config.local;

const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

if (local) {
    console.log("CONNECTED LOCALLY to the db");
    mongoose.connect(config.localConnect, connectionOptions);
} else {
    mongoose.connect(config.connectionString, connectionOptions);
    console.log(
        "mongoose is connected to db remotely",
        config.connectionString
    );
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
