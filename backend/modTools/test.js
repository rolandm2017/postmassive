const Massive = require("../models/massive.model");
const User = require("../models/user.model");

const express = require("express");
const router = express.Router();

router.get("/getHighestViews", (req, res) => {
    console.log("here! a route to order views by");
    Massive.find({})
        .sort({ views: -1 })
        .limit(2)
        .exec(function (err, massives) {
            if (err) {
                console.log(err);
            }
            console.log(massives);
            res.status(200).json(massives);
        }); // fixme: .exec() is just a fancy promise
});

router.get("/post/getHighest", (req, res) => {
    // throw Error("stop now");
    // let username = req.body.username;
    // let displayName = req.body.displayName;
    let content = req.body.content;
    let username = req.body.username;

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
    let currentHighestPostNumber = Massive.find({})
        .sort({ postNumber: -1 })
        .limit(3)
        .then((massives) => {
            res.json({ massives });
        });
});

router.post("/makeHighestViews", (req, res) => {
    Massive.find({})
        .sort({ views: -1 })
        .limit(1)
        .then((massive) => {
            if (massive) {
                console.log(26, massive[0].views);
            }
            let currentViews = massive[0].views;
            let novelHighestViews = currentViews + 100;
            console.log(31, novelHighestViews, massive[0].views, massive[0]);
            // make a new one
            let newMassive = new Massive({
                postNumber: 1, // will have to autoincrement this somehow...
                postedByUser: "aardvark",
                displayName: "Infinity000",
                text: "I will sell your wares",
                date: Date.now(),
                replies: Math.ceil(Math.random() * 10),
                amps: Math.ceil(Math.random() * 10),
                likes: Math.ceil(Math.random() * 100),
                hasImage: false,
                quotesSomeone: false,
                views: novelHighestViews,
                replies: Math.ceil(Math.random() * 10),
                amplifies: Math.ceil(Math.random() * 20),
                stylings: [{}, {}, {}],
            });

            newMassive.save(function (err, success) {
                if (err) {
                    console.log(53, err);
                }
                console.log(53, success, "winning");
                res.json(success);
            });
        });
});

router.post("/post/makeHighestPostNumber", (req, res) => {
    Massive.find({})
        .sort({ postNumber: -1 })
        .limit(1)
        .then((massives) => {
            console.log(massives[0], 97);
            let newHighestPostNum = massives[0].postNumber;
            const username = "Sarcasm";
            const displayName = "Steve";
            const text = "lorem ipsum doloret si";
            const datePosted = Date.now();
            newHighestPostNum++;
            let newMassive = new Massive({
                postNumber: newHighestPostNum, // will have to autoincrement this somehow...
                postedByUser: username,
                displayName: displayName,
                text: text,
                date: datePosted,
                replies: Math.ceil(Math.random() * 10),
                amps: Math.ceil(Math.random() * 10),
                likes: Math.ceil(Math.random() * 100),
                hasImage: false,
                quotesSomeone: false,
                views: Math.ceil(Math.random() * 1000),
                replies: Math.ceil(Math.random() * 10),
                amplifies: Math.ceil(Math.random() * 20),
                stylings: [{}, {}, {}],
            });
            newMassive.save(function (err, success) {
                if (err) {
                    console.log(53, err);
                }
                console.log(120, success);
                res.status(200).send(success);
            });
        }); // fixme: .exec() is just a fancy promise
});

router.get("/getUserProfile", (req, res) => {
    const username = req.body.username;
    User.findOne({ username: username }).then((user) => {
        res.status(200).json(user);
    });
});

router.put("/giveUserDisplayName", (req, res) => {
    const username = req.body.username;
    const displayName = req.body.displayName;
    User.update(
        { username: username },
        { $set: { displayName: displayName } }
    ).then((x) => {
        res.json(x);
    });
});

router.delete("/post/remove/:id", (req, res) => {
    // here is how req.params.id works. input was http://127.0.0.1:8080/api/test/post/remove/61a645eb9cba4136985a7d49
    let deleteId = req.body.deleteId;
    let deleteAnother = req.params.id;
    console.log(deleteId, "you're the greatest!", deleteAnother);
    Massive.findOneAndDelete({ _id: deleteId }).then((x) => {
        console.log(x, 155);
    });
    res.status(200).send("deleted successfully!");
});

module.exports = router;
