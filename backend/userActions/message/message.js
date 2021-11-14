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

router.get("/:recipient", (req, res) => {
    let recip = req.params.recipient;
    let sender = req.body.sender;
    Message.find({ recipient: recip, sender: sender })
        .sort("-date")
        .exec((err, docs) => {
            if (err) {
                console.log(18, err);
            }
            res.json(docs);
        });
});

router.post("/:recipient", (req, res) => {
    let recipient = req.params.recipient;
    let sender = req.body.sender;
    let messageToSend = req.body.msgText;
    let now = new Date.now();
    Message.create({
        recipient: recipient,
        sender: sender,
        text: messageToSend,
        date: now,
        linksSomeonesMassive: false,
        linkedMassiveId: false,
        hasImage: false,
        imageURL: null,
    }).exec((err, created) => {
        if (created) {
            res.status(200).send();
        }
        console.log(25, err);
    });
    //recipient,sender,text,date,linksSomeonesMassive,linkedMassiveId,hasImage,imageURL
});

router.delete("/:recipient", (req, res) => {
    let recipient = req.params.recipient;
    let targetMessage = req.body.msgId;
    Message.findOneAndDelete({
        recipient: recipient,
        text: targetMessage,
    }).then((err, success) => {
        if (success) {
            res.status(200).send();
        }
        console.log(29, err);
    });
});
