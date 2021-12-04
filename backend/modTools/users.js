const Massive = require("../models/massive.model");
const User = require("../models/user.model");

const express = require("express");
const router = express.Router();

// // TODO: Make moderator routes require actual moderator permissions.
// // BEFORE PRODUCTION!

router.get("/getAllUsers", (req, res) => {
    User.find({}).then((userDocs) => {
        res.status(200).json(userDocs);
    });
});

// function filterOutBoringInfo(userDocs) {

// }

module.exports = router;
