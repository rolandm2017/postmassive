const express = require("express");
const router = express.Router();

const introduce = require("./introduce");
const retrieve = require("./retrieve");
const refresh = require("./refresh");

module.exports = router;

router.get("/introduce", (req, res) => {
    let postsForWall = introduce(req.body.username);
    console.log(12, postsForWall);
    res.json(postsForWall);
});

router.get("/retrieve", (req, res) => {
    let retrievedAdditionalPosts = retrieve(req.body.username, req.body.marker);
    res.json(retrievedAdditionalPosts);
});

router.get("/refresh", (req, res) => {
    let refreshedPosts = refresh(req.body.username, req.body.marker);
    res.json(refreshedPosts);
});
