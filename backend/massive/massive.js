const express = require("express");
const router = express.Router();

const Massive = require("../models/massive.model");

module.exports = router;

router.get("/:id", (req, res) => {
    let id = req.params.id;
    console.log(10, id);
    Massive.findOne({ _id: id }, function (err, massive) {
        if (err) {
            console.log(12, err);
        } else if (massive) {
            res.status(200).send(massive);
        } else {
            console.loge(err, massive);
            throw "You shouldn't be able to get here you know...";
        }
    });
});
