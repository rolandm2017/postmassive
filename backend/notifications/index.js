const db = require("../_helpers/db");
const express = require("express");
const router = express.Router();

const Notification = require("../models/notification.model");

module.exports = router;

router.get("/:username", (req, res) => {
    console.log(10, "notifications");
    let whichUsersNotifications = req.query.username;
    Notification.find({ username: whichUsersNotifications })
        .sort("-date")
        .limit(10)
        .exec((err, docs) => {
            if (err) {
                console.log(18, err);
            }
            res.json(docs);
        });
});

router.post("/:username", (req, res) => {
    console.log(24, "notifications");
    // create a notification (admin only) via Postman.
    let username = req.params.username;
    let type = req.body.type;
    let text = req.body.text;
    let date = Date.now();
    let count = Math.ceil(Math.random() * 100);
    let byWho = req.body.byWho.split(",");

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
                console.log(444444);
                throw err;
            }
            let successMsg =
                "created notification for: " +
                username +
                "\n...with users: " +
                byWho.toString();
            res.status(200).send(successMsg);
        }
    );
    console.log("Saved new Notification!", 45);
    // ****
});

router.put("/:username/:id", (req, res) => {
    // for "update was seen".
    let id = req.query.id;
    let grabbedNotification = Notification.find({ _id: id });
    grabbedNotification.update({ $set: { seen: true } });
});
