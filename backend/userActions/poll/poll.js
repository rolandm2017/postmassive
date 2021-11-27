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
    Poll.find({}).find().sort({ _id: -1 }).limit(10);
});

router.get("/:id", (req, res) => {
    let id = req.params.id;
    let username = req.body.username;
    console.log(id, 19, username);
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

    // let currentHighestPostNumber = await Poll.find({})
    //     .sort({ postNumber: "desc" })
    //     .limit(1)
    //     .exec((err, poll) => {
    //         if (err) {
    //             console.log(7, err);
    //             reject(err);
    //         } else {
    //             if (poll) {
    //                 return poll;
    //             } else {
    //                 console.log("strange result for poll:", poll);
    //                 return { postNumber: 0 };
    //             }
    //         }
    //     }).postNumber;
    // let newHighestPostNum = currentHighestPostNumber + 1;

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

    let pollToUpdate = await Poll.findOne(filter);
    let pollOptions = pollToUpdate.options;

    let newPollValue = NaN;
    for (let i = 0; i < pollToUpdate.options.length; i++) {
        if (pollOptions[i].label === voteTarget) {
            newPollValue = pollOptions[i].votes + 1;
            pollOptions[i].votes = newPollValue;
            console.log(pollOptions, 130, 130);
        }
    }
    pollToUpdate.options = pollOptions;
    await pollToUpdate.save();
    // throw "k"
    res.status(200).send(
        "successfully updated poll value for " +
            voteTarget +
            " to value " +
            newPollValue
    );
    // function (err, initialPollValue) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     const options = initialPollValue.options;
    //     let index;
    //     let updatedOptions = [...options];
    //     let currentVotesForVoteTarget = null;
    //     console.log(129, options);
    //     for (let i = 0; i < options.length; i++) {
    //         if (options[i].label === voteTarget) {
    //             index = i;
    //             // console.log(132, options[i].label, voteTarget);
    //             // currentVotesForVoteTarget = options[i].votes;
    //             updatedOptions[i].votes = updatedOptions[i].votes + 1;
    //         }
    //     }

    //     Poll.findOneAndUpdate(
    //         filter,
    //         updatedOptions,
    //         function (err, updatedPoll) {
    //             if (err) {
    //                 console.log(err);
    //             }

    //             res.status(200).json(updatedPoll);
    //         }
    //     );
    // }
    // );

    // console.log(139, pollToUpdate);
    // let poll = await pollToUpdate.save();
    // console.log(93);
    // res.status(200).json(poll); // fixme: sending vote 2x doesnt increase poll value 2x
});

module.exports = router;
