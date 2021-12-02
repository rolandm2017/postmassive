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
    Message.find({ users: username })
        .sort("-date")
        .then((msgs) => {
            // TODO: make msgs into a structure like
            // [{username: Robo, messagesByTime: []}]
            const updatedMsgs = msgs.map((msg) => {
                return {
                    username: username,
                    conversationPartner:
                        msg.users[msg.users.indexOf(username) === 0 ? 1 : 0],
                    msgs: msg.userMsgs,
                };
            });
            res.status(200).json(updatedMsgs);
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
            console.log(54, msgsWithUserTwo);
            res.status(200).json(msgsWithUserTwo); // order the usernames properly on the frontend
        });
});

router.post("/send", (req, res) => {
    let users = req.body.users;
    let alphabetizedUsers = users.sort(function (a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
    console.log(users, alphabetizedUsers);
    let userMsg = req.body.userMsg;
    let now = Date.now();
    userMsg.time = now;
    console.log(30, alphabetizedUsers, userMsg);
    Message.find({ users: alphabetizedUsers }).then((foundConvo) => {
        console.log(foundConvo, 79);
        if (foundConvo.length > 0) {
            Message.updateOne(
                { users: alphabetizedUsers },
                { $push: { userMsgs: userMsg } },
                function (err, updated) {
                    if (err) {
                        console.log(err);
                    }
                    if (updated) {
                        let successMsg =
                            "added to convo for " +
                            alphabetizedUsers[0] +
                            " & " +
                            alphabetizedUsers[1];
                        console.log(73, successMsg);
                        res.status(200).send(successMsg);
                    }
                }
            );
        } else {
            // there was none started between these two as of yet
            Message.create(
                {
                    users: alphabetizedUsers,
                    userMsgs: userMsg,
                },
                function (err, created) {
                    if (err) {
                        console.log(43, err);
                    }
                    if (created) {
                        let successMsg =
                            "created msg for " +
                            alphabetizedUsers[0] +
                            " & " +
                            alphabetizedUsers[1];
                        console.log(91, successMsg);
                        res.status(200).send(successMsg);
                    }
                }
            );
        }
    });
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

router.delete("/deleteAllMsgs", (req, res) => {
    Message.deleteMany({}, function (err, done) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send("all gone!");
        }
    });
});
