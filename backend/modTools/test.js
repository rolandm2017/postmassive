const Massive = require("../models/massive.model");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("here!");
    res.status(200).send("hiya");
});

router.post("/", (req, res) => {
    res.status(200).send("hiya");
});

router.get("/post", (req, res) => {
    res.status(200).send("hiya");
});

// TEST
// TEST
// TEST
// TEST
// TEST
// TEST
router.get("/post/getHighest", async (req, res) => {
    // throw Error("stop now");
    let username = req.body.username;
    // let displayName = req.body.displayName;
    let content = req.body.content;
    let postFloor = req.body.floor;
    console.log("Posting a massive...", content, req.body);
    let priceIsAuthorizedByUser = req.body.authorization; // true/false
    let datePosted = Date.now();

    // fixme: I try to Post and get a bug because I can't db.User.FindOne to match this post's request.
    // i need to find this user so I can update their postCount.
    // the post needs to have a ... username and other fields attached to it ... just some fields ...
    // actual error:
    // (node:7032) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'displayName' of null
    // at C:\Users\jenfr\Documents\code\2021\postmassive\backend\userActions\post\post.js:42:31

    // console.log(
    //     38,
    //     username,
    //     content,
    //     postFloor,
    //     datePosted,

    //     req.body.stylings
    // );
    // .sort({ postNumber: 1 })
    console.log("you made it!");
    let currentHighestPostNumber = await Massive.find({}).exec((err, post) => {
        if (err) {
            console.log(7, err);
            reject(err);
        } else {
            return post;
        }
    });

    console.log(70, currentHighestPostNumber);
    // throw Error("stop now");
    let newHighestPostNum = currentHighestPostNumber + 1;
    res.send("youre here again");
    console.log(47, req.body);
    // ### *** ###
    // FIXME: MAJOR issue with Posting Massives and the postNumber.
    // ### *** ###
});

module.exports = router;
