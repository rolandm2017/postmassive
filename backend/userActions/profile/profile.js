const express = require("express");
const router = express.Router();

const User = require("../../models/user.model");

module.exports = router;

router.get("/get", (req, res) => {
    let username = req.query.username;
    console.log(11, username);
    User.findOne({ username: username }, function (err, userData) {
        if (err) {
            console.log(171717, err);
        } else {
            console.log(userData, 15);
            if (userData === null) {
                res.status(200).send("no user profile for " + username);
            } else {
                let publiclyViewableData = safeguard(userData); // total failures: 0 failures
                console.log("successfully retrieved userData for " + username);
                res.status(200).json(publiclyViewableData);
            }
        }
    });
});

router.get("/profiles", (req, res) => {
    // 12/3 note: what even is this thing? it needed a docstring bad when I wrote it.
    let amount = req.body.amount;
    let usernames = req.body.usernames;

    console.log(amount, usernames, 31, req.params, req.query);
    let lowercaseUsernames = [];
    usernames.forEach((u) => {
        lowercaseUsernames.push(u.toLowerCase());
    });
    let query;
    if (amount) {
        console.log(26, amount);
        query = User.find({}).sort({ date: -1 }).limit(amount);
    } else if (usernames) {
        console.log(30, lowercaseUsernames);
        query = User.find({ username: { $in: lowercaseUsernames } })
            .sort({ date: -1 })
            .limit(usernames.length);
    } else {
        console.log(amount, usernames);
        throw Error("How did this happen?");
    }
    query.exec(function (err, profiles) {
        if (err) {
            console.log(38, err, amount, usernames);
        } else {
            let profileInfos = [];
            console.log(profiles, 48);
            profiles.forEach((profile) => {
                profileInfos.push(safeguard(profile));
            });
            console.log(
                "successfully retrieved userData for " +
                    profileInfos.length +
                    " number of profiles"
            );
            res.status(200).json(profileInfos);
        }
    });
});

function safeguard(privateData) {
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

router.put("/init", (req, res) => {
    // e.g. http://127.0.0.1:8080/api/profile/init?username=crono
    // e.g. http://127.0.0.1:8080/api/profile/init?username=robo
    let username = req.query.username;
    let displayName = req.body.displayName;
    let bio = req.body.bio;
    let location = req.body.location;
    let url = req.body.url;

    let query = { username: username };
    User.findOneAndUpdate(query, {
        displayName: displayName,
        bio: bio,
        location: location,
        url: url,
        followers: 0,
        following: 0,
        DMsAreOpen: true,
        postCount: 0,
    }).then((updatedUser) => {
        if (updatedUser === null) {
            res.status(400).send("couldn't find user in db, try again");
        } else {
            console.log(117, updatedUser);
            res.status(200).json(updatedUser);
        }
    });
});

router.patch("/:username", (req, res) => {
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
    // flip value of DMs
    let username = req.params.username;
    let dmStatus = req.body.dmStatus;
    User.findOneAndUpdate(
        { username: username },
        { $set: { DMsAreOpen: dmStatus } }
    ).then((err, query) => {
        if (err) {
            console.log(115, err);
        } else if (query) {
            console.log(87, query);
            let dmStatusPost;
            if (dmStatus) {
                dmStatusPost = "open";
            } else {
                dmStatusPost = "closed";
            }
            res.status(200).send("changed DM status to " + dmStatusPost, query);
        } else {
            throw "You shouldn't be able to get here you know...";
        }
    });
});
