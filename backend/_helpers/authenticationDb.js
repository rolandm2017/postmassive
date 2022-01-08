const mongoose = require("mongoose");

module.exports = {
    User: require("../models/user.model"),
    RefreshToken: require("../models/refresh-token.model"),
    isValidId,
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}
