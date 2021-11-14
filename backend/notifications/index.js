const db = require("../../_helpers/db");
const express = require("express");
const router = express.Router();

const Notification = require("../../models/notification.model");

router.get("/:username", (req, res) => {
    let recip = req.params.recipient;
    let sender = req.body.sender;
    Notification.find({ recipient: recip, sender: sender })
        .sort("-date")
        .limit(10)
        .exec((err, docs) => {
            if (err) {
                console.log(18, err);
            }
            res.json(docs);
        });
});

router.post("/:username/", (req, res) => {
    // create a notification (admin only) via Postman.
    let username = req.params.username;
    let type = req.body.type;
    let text = req.body.text;
    let date = Date().now();
    let count = Math.ceil(Math.random() * 100);
    let byWho = "Captain Placeholder";

    Notification.create(
        {
            username: username,
            type: type,
            text: text,
            date: date,
            count: count,
            byWho: byWho,
        },
        function (err) {
            if (err) {
                throw err;
            }
        }
    );
    console.log("Saved new Notification!", 45);
    // ****
});

router.update("/:username/:id", (req, res) => {
    // for "update was seen".
});
