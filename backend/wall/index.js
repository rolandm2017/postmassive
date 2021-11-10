const express = require("express");
const router = express.Router();

const introduce = require("./introduce");
const retrieve = require("./retrieve");
const refresh = require("./refresh");

module.exports = router;

router.get("/introduce", (req, res) => {
    let postsForWall = introduce(req.body.username);
    console.log(12, postsForWall);
    postsForWall.then((posts) => {
        console.log(14, posts);
        let postsToSendOut = posts;
        res.json(postsToSendOut);
    });
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
