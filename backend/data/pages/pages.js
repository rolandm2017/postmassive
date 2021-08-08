const express = require("express");
const router = express.Router();
// const jwtShield = require("../_middleware/jwtShield");
const authorize = require("../../_middleware/authorize");

const users = require("../users").users;
const massive = require("../massive");
const notification = require("../notification");
const message = require("../message");
const profile = require("../profile");

module.exports = router;

router.get("/feed", authorize(), (req, res) => {
    console.log("Sending massives");
    const massives = [];
    for (let i = 0; i < 20; i++) {
        massives.push(massive());
    }
    res.json(massives);
});

router.get("/feed/:username", (req, res) => {
    // route for getting user specific feed
    console.log("Sending massives for", req.params.username);
    const massives = [];
    for (let i = 0; i < 20; i++) {
        massives.push(massive());
    }
    res.json(massives);
});

router.get("/notifications", authorize(), (req, res) => {
    console.log("Sending notifications");
    const keys = Object.keys(notification);
    const notifications = [];
    for (let i = 0; i < 20; i++) {
        const chosenNotification =
            notification[keys[(keys.length * Math.random()) << 0]]();
        console.log(i, chosenNotification);
        notifications.push(chosenNotification);
    }
    res.json(notifications);
});

router.get("/messages", authorize(), (req, res) => {
    console.log("Sending msgs");
    const msgs = [];
    for (let i = 0; i < 20; i++) {
        msgs.push(message());
    }
    const orderedMsgs = msgs.sort((a, b) => {
        return new Date(b.deliveryDate) - new Date(a.deliveryDate);
    });
    res.json(orderedMsgs);
});

router.get("/profile/:username", (req, res) => {
    console.log(55, req.params.username);
    // console.log("Received SPECIFIC user:", req.params.username);
    // want to get the object that has req.body.username as the value of the object's "username" key and return its profile
    const numberOfUsers = Object.keys(users).length;
    for (let i = 0; i < numberOfUsers; i++) {
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
