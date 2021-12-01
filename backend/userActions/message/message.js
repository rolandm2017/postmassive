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
    let recip = req.query.user1;
    let sender = req.query.user2;
    let foundMsgs = [];
    const orderOne = { recipient: recip, sender: sender };
    const orderTwo = { recipient: sender, sender: recip };
    Message.find(orderOne)
        .sort("-date")
        .then((msgs) => {
            for (let i = 0; i < msgs.length; i++) {
                foundMsgs.push(msgs[i]);
            }
            Message.find(orderTwo)
                .sort("-date")
                .then((msgs) => {
                    console.log(msgs, 28);
                    for (let i = 0; i < msgs.length; i++) {
                        foundMsgs.push(msgs[i]);
                    }
                    const orderedMsgs = foundMsgs.sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    });
                    res.status(200).json(orderedMsgs);
                });
        });
});

router.post("/send", (req, res) => {
    let recipient = req.body.recipient;
    let sender = req.body.sender;
    console.log(30, recipient, sender);
    let messageToSend = req.body.content;
    let now = Date.now();
    Message.create(
        {
            recipient: recipient,
            sender: sender,
            text: messageToSend,
            date: now,
        },
        function (err, created) {
            if (err) {
                console.log(43, err);
            }
            if (created) {
                let successMsg =
                    "created msg for " + recipient + " & " + sender;
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
