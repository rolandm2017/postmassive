const express = require("express");

const router = express.Router();

module.exports = router;

const db = require("../../_helpers/db"); // fixme?: isnt this broken?

const user = "/user";
const massive = "/massive";
const message = "/message";

// ###
//
// ###

// TODO: add in authorization
// GET all massives from the server

// GET a user's massives
// TODO: add in authorization
router.get("/massive/get/:username", (req, res) => {
    const filter = { postedByUser: req.params.username };
    console.log(filter);
    db.Massive.find(filter, function (err, massives) {
        if (err) {
            console.log(err);
        } else {
            console.log(massives);
            res.json(massives);
        }
    });
});
