const express = require("express");
const router = express.Router();

const Massive = require("../models/massive.model");

module.exports = router;

router.get("/:id", (req, res) => {
    let id = req.params.id;
    console.log(10, id);
    Massive.find({ postNumber: id }, function (doc) {
        console.log(doc)
        res.status(200).json(doc)
    });
    // ### *** ###
    // FIXME: MAJOR issue with Posting Massives and the postNumber.
    // edit (2 wks later): ok what is it? its the incrementing right?
    // ### *** ###
});
