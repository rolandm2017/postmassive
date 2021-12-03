const express = require("express");
const router = express.Router();

const introduceWallForTheDay = require("./introduce");
const retrieve = require("./retrieve");
const refresh = require("./refresh");

const Massives = require("../models/massive.model");

module.exports = router;

router.get("/introduce", (req, res) => {
    // magic; there is a promise in Introduce that works magic.
    const getOnlyStylizedPosts = req.body.stylizedOnly;
    if (getOnlyStylizedPosts) {
        introduceWallForTheDay(req.body.username, getOnlyStylizedPosts).then(
            (massives) => {
                console.log(17, 17, massives.length, "massives.length");
                res.json(massives);
            }
        );
    } else {
        introduceWallForTheDay(req.body.username).then((massives) => {
            console.log(23, 23, massives.length, "massives.length");
            res.json(massives);
        });
    }
});

router.get("/retrieve", (req, res) => {
    let retrievedAdditionalPosts = retrieve(req.body.username, req.body.marker);
    retrievedAdditionalPosts.then((posts) => {
        let postsToSendOut = posts;
        res.json(postsToSendOut);
    });
});

router.get("/refresh", (req, res) => {
    // updates currently displayed posts .... might be yagni
    let refreshedPosts = refresh(req.body.username, req.body.marker);
    refreshedPosts.then((refreshed) => {
        let r = refreshed;
        res.json(r);
    });
});

// http://127.0.0.1:8080/api/wall/profile/:username

router.get("/profile/:username", (req, res) => {
    console.log(req.params.username);
    Massives.find({ postedByUser: req.params.username })
        .sort({ date: "desc" })
        .then((massives) => {
            console.log(44, massives);
            res.status(200).json(massives);
        });
});
