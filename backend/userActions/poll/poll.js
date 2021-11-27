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

router.get("/", (req, res) => {
    console.log(14, "requesting");
    Poll.find({})
        .find()
        .sort({ pollId: -1 })
        .limit(10)
        .exec(function (err, success) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(success);
            }
        });
});

router.get("/:id", (req, res) => {
    let id = req.params.id;
    console.log(20, "requesting", id);
    let username = req.body.username;
    console.log(id, 22, username);
    if (id === "unknown") {
        // get random poll
        console.log("random poll");
        Poll.find({}, function (err, success) {
            if (err) {
                console.log(err);
            }
            res.status(200).json(success);
        });
    } else {
        console.log(31, "fetching poll id ", id);
        Poll.findOne({ pollId: id }, function (err, success) {
            if (err) {
                console.log(err);
            }
            res.status(200).json(success);
        });
    }
});

function generateID() {
    let potentialIdChars = "0123456789abcdefghijklmnopqrstuvwzxy";
    let idLength = 16;
    let pollId = "";

    for (let i = 0; i < idLength; i++) {
        let charIndex = Math.floor(Math.random() * potentialIdChars.length);
        pollId = pollId + potentialIdChars.slice(charIndex, charIndex + 1);
    }
    return pollId;
}

router.post("/submit", async (req, res) => {
    let username = req.body.username;
    let content = req.body.content;
    let pollLabels = req.body.pollOptions;

    let pollId = generateID();
    let pollOptions = pollLabels.map((label) => {
        return { label: label, votes: 0 };
    });

    let now = Date.now();
    let highestPostNum = 0;
    Poll.create(
        // postNumber, monetaryCost, postedByUser, text, date, replies,
        // amps, likes, views, hasImage, quotesSomeone, pollId
        {
            _id: pollId,
            postNumber: highestPostNum,
            monetaryCost: 1,
            postedByUser: username,
            text: content,
            date: now,
            replies: 10,
            amps: 10,
            likes: 10,
            views: 10,
            hasImage: false,
            quotesSomeone: false,
            pollId: pollId,
            options: pollOptions,
        },
        function (err, poll) {
            if (err) {
                console.log(err);
            }
            console.log(70);
            res.status(200).json({ poll });
        }
    );
});

router.put("/vote", async (req, res) => {
    // let username = req.body.username;
    let pollId = req.body.pollId;
    let voteTarget = req.body.voteTarget;

    const filter = { pollId: pollId };

    let updateTarget = await Poll.findOne(filter);
    console.log(123, updateTarget.pollId, updateTarget.options);
    let oldOptions = updateTarget.options;

    let newPollValue;
    for (let i = 0; i < updateTarget.options.length; i++) {
        if (oldOptions[i].label === voteTarget) {
            console.log(oldOptions[i].votes, 128128);
            let currentVoteTargetValue = oldOptions[i].votes;
            newPollValue = currentVoteTargetValue + 1;
            oldOptions[i].votes = newPollValue;
            console.log(oldOptions, 130, 130);
        }
    }

    let newOptions = [...oldOptions];
    console.log(newOptions, 138);

    updateTarget.options = newOptions;
    updateTarget.markModified("options"); // genius helper from StackOverflow gave me "markModified"
    console.log(updateTarget.options, 141);
    await updateTarget.save();
    res.status(200).send(
        "successfully updated poll value for " +
            voteTarget +
            " to value " +
            newPollValue
    );
    // res.status(200).json(poll); // fixme: sending vote 2x doesnt increase poll value 2x
});

router.delete("/", (req, res) => {
    const pollToDelete = req.body.pollId;
    const confirmDelete = req.body.confirmDelete;
    if (confirmDelete) {
        Poll.findOneAndDelete(
            { pollId: pollToDelete },
            function (fail, succeed) {
                if (fail) {
                    console.log(fail);
                } else {
                    res.status(200).json(succeed);
                }
            }
        );
    }
});

module.exports = router;
