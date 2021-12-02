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

router.get("/getAllMsgsForUser", (req, res) => {
    let username = req.query.username;
    console.log(username, 18);
    Message.find({ users: username })
        .sort("-date")
        .then((msgs) => {
            console.log(msgs, 22);
            res.status(200).json(msgs);
        });
});

router.get("/getMsgsBetweenUsers", (req, res) => {
    let user1 = req.query.user1;
    let user2 = req.query.user2;
    console.log([user1, user2]);
    Message.find({ users: user1 })
        .sort("-date")
        .limit(10)
        .then((msgs) => {
            let msgsWithUserTwo = [];
            msgs.forEach((msg) => {
                if (msg.users.indexOf(user2) > -1) {
                    msgsWithUserTwo.push(msg);
                }
            });
            res.status(200).json(msgsWithUserTwo); // order the usernames properly on the frontend
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
