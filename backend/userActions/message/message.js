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
    let recip = req.body.recipient;
    let sender = req.body.sender;
    let numberOfMsgs = req.body.number;
    Message.find({ recipient: recip, sender: sender })
        .sort("-date")
        .limit(numberOfMsgs)
        .then((msgs) => res.status(200).json(msgs));
});

router.post("/send", (req, res) => {
    let recipient = req.body.recipient;
    let sender = req.body.sender;
    let messageToSend = req.body.content;
    let now = Date.now();
    Message.create(
        {
            recipient: recipient,
            sender: sender,
            text: messageToSend,
            date: now,
            linksSomeonesMassive: false,
            linkedMassiveId: false,
            hasImage: false,
            imageURL: null,
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
