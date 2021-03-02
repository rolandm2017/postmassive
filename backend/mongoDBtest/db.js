const config = require("../config.json");
const mongoose = require("mongoose");

const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};
mongoose.connect(config.connectionString, connectionOptions);

module.exports = {
    Massive: require("./massive.model"),
    User: require("./user.model"),
    Message: require("./message.model"),
    isValidId,
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}
