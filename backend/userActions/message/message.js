const db = require("../../_helpers/db");
const {
    BOLD,
    ITALIC,
    UNDERLINED,
    HIGHLIGHTED,
} = require("../../_helpers/textStyleConstants");

const Message = require("../../models/message.model");

const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/getMsgs", (req, res) => {
    let username = req.query.username;
    Message.find({ users: username })
        .sort("-date")
        .then((msgs) => {
            res.status(200).json(msgs);
        });
});

router.get("/:username", (req, res) => {
    let username = req.params.username;
    let peopleWhoMessagedUser = [];
    let msgsSentByUser = [];
    Messages.find({ recipient: username })
        .sort("-date")
        .then((messages) => {
            for (let i = 0; i < messages.length; i++) {
                peopleWhoMessagedUser.push(messages[i]);
            }
        });
});

router.post("/send", (req, res) => {
    let users = req.body.users;
    let userMsgs = req.body.userMsgs;
    let now = Date.now();
    console.log(30, users, userMsgs);
    userMsgs.time = now;

    Message.create(
        {
            users: users,
            userMsgs: userMsgs,
        },
        function (err, created) {
            if (err) {
                console.log(43, err);
            }
            if (created) {
                let successMsg =
                    "created msg for " + users[0] + " & " + users[1];
                console.log(50, successMsg);
                res.status(200).send(successMsg);
            }
        }
    );
});

router.delete("/delete", (req, res) => {
    let sender = req.body.sender;
    let targetMessage = req.body.id;

    Message.findOneAndDelete(targetMessage, function (err, success) {
        if (err) {
            console.log(70, err);
        } else if (success) {
            res.status(200).send("successfully deleted msg for " + sender);
        }
    });
});
