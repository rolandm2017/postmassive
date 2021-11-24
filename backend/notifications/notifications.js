const db = require("../_helpers/db");
const express = require("express");
const router = express.Router();

const Notification = require("../models/notification.model");

module.exports = router;

router.get("/:username", (req, res) => {
    console.log(10, "notifications");
    let whichUsersNotifications = req.body.username;
    let numberToGet = req.body.amount;
    Notification.find({ username: whichUsersNotifications })
        .sort("-date")
        .limit(numberToGet)
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
    let randomChoice = [];

    for (let i = 0; i < byWho.length; i++) {
        let randomInt = Math.random();
        if (randomInt > 0.5) {
            let selection = byWho[i];
            randomChoice.push(selection);
        }
    }
    if (randomChoice.length === 0) {
        randomChoice.push(byWho[Math.floor(Math.random() * byWho.length)]);
    }
    console.log(32, type, text, date, count, randomChoice);

    Notification.create(
        {
            username: username,
            type: type,
            text: text,
            date: date,
            count: count,
            byWho: randomChoice,
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
                randomChoice;
            res.status(200).send(successMsg);
        }
    );
    console.log("Saved new Notification!", 45);
    // ****
});

router.patch("/:username/:id", (req, res) => {
    // TODO: Convert to ARRAY of Ids instead of Singular Id so can batch see notifs
    // for "update was seen".
    let id = req.body.id;
    let grabbedNotification = Notification.find({ _id: id });
    grabbedNotification.updateOne(
        { $set: { seen: true } },
        function (err, success) {
            if (err) {
                console.log(err);
            }
            if (success) {
                res.status(200).send(
                    "HYPOTHETICALLY set notification to 'seen': " + id
                );
            }
        }
    );
});
