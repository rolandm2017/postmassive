// file for MAKING posts

const db = require("../../_helpers/db");
const {
    BOLD,
    ITALIC,
    UNDERLINED,
    HIGHLIGHTED,
} = require("../../_helpers/textStyleConstants");

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

function showCostOfPosting() {
    // access the auctioneer module.
    return 10;
}

router.post("/post", (req, res) => {
    console.log("Posting a massive...");
    const user = req.body.user;
    const text = req.body.text;
    let priceIsAuthorizedByUser = req.body.authorization; // true/false
    const datePosted = Date.now();

    let getCostOfPosting = createCostOfPosting(); // fixme: should be moved to the post screen

    console.log(user, text, datePosted);
    throw "Success kinda";
    const newMassive = db.Massive({
        postedByUser: user,
        text: text,
        date: datePosted,
        replies: 0,
        amps: 0,
        likes: 0,
        hasImage: false,
        quotesSomeone: false,
    });
    newMassive.save(function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).send();
});

router.delete("/post", (req, res) => {
    // maybe this will be like a 10 second "nvm lemme not say that" button available for 10 seconds

    // NOTE: we don't delete posts from the db except manualy.
    // If it has to get deleted, we just remove it from the pullable wall content
    // TODO: pass authorization into the delete route.
    const postIdToRemove = req.body.params.postId;
    const authorizingUser = req.body.params.username;
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
