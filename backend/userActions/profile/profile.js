const express = require("express");

const router = express.Router();

module.exports = router;

const db = require("../../_helpers/db"); // fixme?: isnt this broken?

const user = "/user";
const massive = "/massive";
const message = "/message";

router.get("/:username", (req, res) => {
    let username = req.params.username;
    db.User.findOne({ username: username }, function (err, userData) {
        if (err) {
            console.log(err);
        } else {
            let publiclyViewableData = safeguard(userData);
            res.json(publiclyViewableData);
        }
    });
});

function safeguard(privateData) {
    // const publiclyViewableData = {
    //     username: privateData.username,
    //     privateData.displayName,
    //     privateData.bio,
    //     privateData.location,
    //     privateData.url,
    //     privateData.followers,
    //     privateData.following,
    //     privateData.DMsAreOpen,
    //     privateData.postCount,
    // };
    const {
        username,
        displayName,
        bio,
        location,
        url,
        followers,
        following,
        DMsAreOpen,
        postCount,
    } = privateData;

    return {
        username,
        displayName,
        bio,
        location,
        url,
        followers,
        following,
        DMsAreOpen,
        postCount,
    };
}

router.post("/:username", (req, res) => {
    // Oh my gosh, WET code? Why, yes!
    // Repeat code on purpose, thanks!
    let username = req.params.username;
    const { displayName, bio, location, url } = req.body;
    db.User.findOneAndUpdate(
        { username: username },
        {
            $set: {
                displayName: displayName,
                bio: bio,
                location: location,
                url: url,
            },
        }
    );
});

router.post("/:username/init", (req, res) => {
    let username = req.params.username;
    let displayName = req.body.displayName;
    let bio = req.body.bio;
    let location = req.body.location;
    let url = req.body.url;
});

router.put("/:username", (req, res) => {
    // Oh my gosh, WET code? Why, yes!
    // Repeat code on purpose, thanks!
    let username = req.params.username;
    const { displayName, bio, location, url } = req.body;
    db.User.findOneAndUpdate(
        { username: username },
        {
            $set: {
                displayName: displayName,
                bio: bio,
                location: location,
                url: url,
            },
        }
    );
    res.status(200).send();
});

router.put("/:username/dms", (req, res) => {
    let username = req.params.username;
    let dmStatus = req.body.dmStatus;
    db.User.findOneAndUpdate(
        { username: username },
        { $set: { DMsAreOpen: dmStatus } }
    ).then((query) => {
        console.log(87, query);
        // TODO: respond to user with success message, a brief popup saying "DMs are closed now."
        // TODO: implement "close DMs for 3 days/week/month" & the Open version
    });
});
