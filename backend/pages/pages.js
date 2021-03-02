const express = require("express");
const router = express.Router();
// const jwtShield = require("../_middleware/jwtShield");
const authorize = require("../_middleware/authorize");

const users = require("../data/users").users;
const massiv = require("../data/massiv");
const notification = require("../data/notification");
const message = require("../data/message");
const profile = require("../data/profile");

module.exports = router;

router.get("/feed", authorize(), (req, res) => {
    console.log("Sending massivs");
    const massivs = [];
    for (let i = 0; i < 20; i++) {
        massivs.push(massiv());
    }
    res.json(massivs);
});

router.get("/feed/:username", (req, res) => {
    // route for getting user specific feed
    console.log("Sending massivs for", req.params.username);
    const massivs = [];
    for (let i = 0; i < 20; i++) {
        massivs.push(massiv());
    }
    res.json(massivs);
});

router.get("/notifications", authorize(), (req, res) => {
    console.log("Sending notifications");
    const keys = Object.keys(notification);
    const notifications = [];
    for (let i = 0; i < 20; i++) {
        notifications.push(
            notification[keys[(keys.length * Math.random()) << 0]]()
        );
    }
    res.json(notifications);
});

router.get("/messages", authorize(), (req, res) => {
    console.log("Sending msgs");
    const msgs = [];
    for (let i = 0; i < 20; i++) {
        msgs.push(message());
    }
    res.json(msgs);
});

router.get("/profile/:username", (req, res) => {
    // console.log("Received SPECIFIC user:", req.params.username);
    // want to get the object that has req.body.username as the value of the object's "username" key and return its profile
    for (let i = 0; i < Object.keys(users).length; i++) {
        if (users[i].username === req.params.username) {
            console.log("Fetching profile for", req.params.username);
            res.json(users[i].profile);
        }
    }
});

router.get("/profile/:username/feed", (req, res) => {
    // TODO: get user-specific posts
});

function sendUsers() {
    return Object.keys(users).map(function (user) {
        return {
            username: users[user].profile.username,
            displayName: users[user].profile.displayName,
            bio: users[user].profile.bio,
        };
    });
}

router.get("/followers/:username", (req, res) => {
    console.log(req.params);
    res.json(sendUsers());
});

router.get("/following/:username", (req, res) => {
    console.log(req.params);
    res.json(sendUsers());
});
