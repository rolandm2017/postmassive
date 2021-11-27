const express = require("express");
const router = express.Router();

const Massive = require("../models/massive.model");

module.exports = router;

router.get("/:id", (req, res) => {
    let id = req.params.postNumber;
    console.log(10, id);
    Massive.find({ postNumber: postNumber }, function (obj) {
        console.log(obj);
    });
    // ### *** ###
    // FIXME: MAJOR issue with Posting Massives and the postNumber.
    // edit (2 wks later): ok what is it? its the incrementing right?
    // ### *** ###
});
