// file for MAKING posts

const db = require("../../_helpers/db");
const {
    BOLD,
    ITALIC,
    UNDERLINED,
    HIGHLIGHTED,
} = require("../../_helpers/textStyleConstants");

const Massive = require("../../models/massive.model");

const express = require("express");
const router = express.Router();

router.get("/post", (req, res) => {
    let userWhoWantsToPost = req.body.username;
    // TODO: base everything off of the User's unique ... circumstances... this code is just placeholder
    let dataForPotentialPost = new Object();
    dataForPotentialPost.viewPotential = Math.ceil(Math.random() * 1000);
    dataForPotentialPost.costCalculation = showCostOfPosting();

    res.json(dataForPotentialPost);
});

// function showCostOfPosting() {
// access the auctioneer module.
// return 10;
// }

router.post("/post", async (req, res) => {
    let username = req.body.username;
    // let displayName = req.body.displayName;
    let content = req.body.content;
    let postFloor = req.body.floor;
    console.log("Posting a massive...", content, req.body);
    let priceIsAuthorizedByUser = req.body.authorization; // true/false
    let datePosted = Date.now();

    let getCostOfPosting = createCostOfPosting(); // fixme: should be moved to the post screen
    let userDoc = await db.User.findOne({ username: username });
    let displayName = userDoc.displayName;

    console.log(38, username, content, postFloor, datePosted, displayName);
    let currentHighestPostNumber = Massive.find({})
        .sort({ postNumber: "desc" })
        .limit(1)
        .exec((err, post) => {
            if (err) {
                console.log(7, err);
                reject(err);
            } else {
                return post;
            }
        }).postNumber;
    let newHighestPostNum = currentHighestPostNumber + 1;
    console.log(47, req.body);
    // ### *** ###
    // FIXME: MAJOR issue with Posting Massives and the postNumber.
    // ### *** ###
    let newMassive = new Massive({
        postNumber: newHighestPostNum, // will have to autoincrement this somehow...
        postedByUser: username,
        displayName: displayName,
        text: content,
        date: datePosted,
        replies: Math.ceil(Math.random() * 10),
        amps: Math.ceil(Math.random() * 10),
        likes: Math.ceil(Math.random() * 100),
        hasImage: false,
        quotesSomeone: false,
        views: Math.ceil(Math.random() * 1000),
        replies: Math.ceil(Math.random() * 10),
        amplifies: Math.ceil(Math.random() * 20),
    });
    newMassive.save(function (err) {
        if (err) {
            console.log(53, err);
        }
    });
    res.status(200).send();
});

router.delete("/post", (req, res) => {
    // NOTE: we don't delete posts from the db except manualy.
    // If it has to get deleted, we just remove it from the pullable wall content
    // TODO: pass authorization into the delete route.
    const postIdToRemove = req.body.postId;
    const authorizingUser = req.body.username;
    db.Massive.findOneAndUpdate(
        { _id: postIdToRemove, postedByUser: authorizingUser },
        { postIsAccessible: false }
    ).then((x) => {
        res.json({ success: "postRemoved" });
    });
});

// function getExpectedViewsForPost() {
// access info about how many people will visit the site today
// return null;
// }

function createCostOfPosting(username) {
    // LATER: access auctioneer to get cost for post
    return 1; // floating point $1.23 = 1.23
}

function postThePost(username, content, priceIsAuthorizedByUser) {
    // user says "ok, deal"
    massivesDb.create({});
}

function chooseStyling(styleType, startPosition, endPosition, substring) {
    // allows user to choose styling
    if (styleType === BOLD) {
    } else if (styleType === ITALIC) {
    } else if (styleType === UNDERLINED) {
    } else if (styleType === HIGHLIGHTED) {
    } else {
        throw "Not yet implemented!";
    }
}

module.exports = router;
