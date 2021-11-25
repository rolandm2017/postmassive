const express = require("express");
const router = express.Router();

const introduceWallForTheDay = require("./introduce");
const retrieve = require("./retrieve");
const refresh = require("./refresh");

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
