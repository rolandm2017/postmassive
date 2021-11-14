const express = require("express");
const router = express.Router();

const User = require("../../models/user.model");

module.exports = router;

router.get("/:username", (req, res) => {
    let username = req.query.username;
    console.log(11, username);
    User.findOne({ username: username }, function (err, userData) {
        if (err) {
            console.log(171717, err);
        } else {
            let publiclyViewableData = safeguard(userData); // total failures: 0 failures
            res.status(200).json(publiclyViewableData);
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

router.post("/init/:username", (req, res) => {
    console.log("HERE", 59);
    let username = req.params.username;
    let displayName = req.body.displayName;
    let bio = req.body.bio;
    let location = req.body.location;
    let url = req.body.url;

    let query = { username: username };
    User.findOneAndUpdate(
        query,
        {
            username: username,
            displayName: displayName,
            bio: bio,
            location: location,
            url: url,
            followers: 0,
            following: 0,
            DMsAreOpen: true,
            postCount: 0,
        },
        function (err, success) {
            if (err) {
                console.log(76, err);
            } else if (success) {
                let successMsg =
                    "successfully created profile for " + displayName;
                console.log(successMsg);
                res.status(200).send(successMsg);
            }
        }
    );
});

router.put("/:username", (req, res) => {
    // Oh my gosh, WET code? Why, yes!
    // Repeat code on purpose, thanks!
    let username = req.params.username;
    const { displayName, bio, location, url } = req.body;

    let query = { username: username };
    User.findOneAndUpdate(query, {
        $set: {
            displayName: displayName,
            bio: bio,
            location: location,
            url: url,
        },
    });
    res.status(200).send();
});

router.patch("/:username", (req, res) => {
    // Oh my gosh, WET code? Why, yes!
    // Repeat code on purpose, thanks!
    let username = req.params.username;
    const { displayName, bio, location, url } = req.body;
    let query = { username: username };
    User.findOneAndUpdate(query, {
        $set: {
            displayName: displayName,
            bio: bio,
            location: location,
            url: url,
        },
    });
});

router.patch("/:username/dms", (req, res) => {
    let username = req.params.username;
    let dmStatus = req.body.dmStatus;
    User.findOneAndUpdate(
        { username: username },
        { $set: { DMsAreOpen: dmStatus } }
    ).then((err, query) => {
        if (err) {
            console.log(115, err);
        }
        console.log(87, query);
        res.status(200).send("changed DM status to " + dmStatus);
        // TODO: respond to user with success message, a brief popup saying "DMs are closed now."
        // TODO: implement "close DMs for 3 days/week/month" & the Open version
    });
});
