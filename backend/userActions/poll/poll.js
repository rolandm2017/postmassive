const db = require("../../_helpers/db");
const {
    BOLD,
    ITALIC,
    UNDERLINED,
    HIGHLIGHTED,
} = require("../../_helpers/textStyleConstants");

const Poll = require("../../models/poll.model");

const express = require("express");
const router = express.Router();

router.get("/poll", (req, res) => {});

router.post("/poll/submit", (req, res) => {
    let username = req.body.username;
    let pollLabels = req.body.pollOptions;

    let potentialIdChars = "0123456789abcdefghijklmnopqrstuvwzxy";
    let idLength = 8;
    let pollId = "";

    for (let i = 0; i < idLength; i++) {
        let charIndex = Math.floor(Math.random() * potentialIdChars.length);
        pollId = pollId + potentialIdChars.slice(charIndex, charIndex + 1);
    }

    let pollOptions = pollLabels.map((label) => {
        return { label: label, votes: 0 };
    });

    let poll = await Poll.create({ options: pollOptions });
});

router.put("/poll/vote", async (req, res) => {
    let username = req.body.username;
    let pollId = req.body.pollId;
    let voteTarget = req.body.voteTarget;
    let newHigh;

    let pollToUpdate = await Poll.findOne(
        { pollId: pollId },
        function (err, poll) {
            if (err) console.log(err);
            let currentCount = poll.voteTarget;
            let newCount = currentCount + 1;
            poll.voteTarget = newCount;
            newHigh = newCount;
        }
    );
    await pollToUpdate.save();
    res.status(200).send("success! voteCount is now " + newHigh);
});
