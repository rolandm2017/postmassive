const express = require("express");
const router = express.Router();

const getMassive = require("./massiv");

module.exports = router;

router.get("/massives", (req, res) => {
    const massives = Array(20).fill(getMassive());
    res.json(massives);
});
router.get("/notifications", (req, res) => {
    const notifications = Array(20).fill(getNotifications());
    res.json(notifications);
});

router.get("/profile", (req, res) => {
    const randomProfile = getProfile();
    res.json(randomProfile);
});
router.get("/profile/:id", (req, res) => {
    const specificProfileById = getProfile(req.body.id);
    res.json(specificProfileById);
});
