const config = require("../config.json");
const mongoose = require("mongoose");
const local = config.localConnect;

const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

if (local) {
    console.log("CONNECTED LOCALLY to the db", config.localConnect);
    mongoose.connect(config.localConnect, connectionOptions);
} else {
    console.log(config.connectionString);
    mongoose.connect(config.connectionString, connectionOptions);
}

module.exports = {
    User: require("../models/user.model"),
    RefreshToken: require("../models/refresh-token.model"),
    isValidId,
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}
