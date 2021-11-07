const express = require("express");
// const cors = require("cors");

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// app.use(cors());

const router = express.Router();

module.exports = router;

const db = require("./db"); // fixme?: isnt this broken?

const user = "/user";
const massive = "/massive";
const message = "/message";

// TODO: add in authorization
// GET all massives from the server
router.get("/massive/get", (req, res) => {
    const filter = {};
    db.Massive.find(filter, function (err, massives) {
        if (err) {
            console.log(err);
        } else {
            console.log(massives);
            res.json(massives);
        }
    });
});

// POST a massive to the server
router.post("/massive/post", (req, res) => {
    console.log("55555555");
    const user = req.body.user;
    const text = req.body.text;
    const datePosted = Date.now();

    const newMassive = db.Massive({
        postedByUser: user,
        text: text,
        date: datePosted,
        replies: 0,
        amps: 0,
        likes: 0,
        hasImage: false,
        quotesSomeone: false,
    });
    newMassive.save(function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).send();
});

// GET a user's massives
// TODO: add in authorization
router.get("/massive/get/:username", (req, res) => {
    const filter = { postedByUser: req.params.username };
    console.log(filter);
    db.Massive.find(filter, function (err, massives) {
        if (err) {
            console.log(err);
        } else {
            console.log(massives);
            res.json(massives);
        }
    });
});

router.delete("/massive/del/:username/:postId", (req, res) => {
    // NOTE: we don't delete posts from the db except manualy.
    // If it has to get deleted, we just remove it from the pullable wall content

    // TODO: pass authorization into the delete route.
    const postIdToRemove = req.body.params.postId;
    const authorizingUser = req.body.params.username;
    db.Massive.findOneAndUpdate(
        { _id: postIdToRemove, postedByUser: authorizingUser },
        { postIsAccessible: false }
    ).then((x) => {
        res.json({ success: "postRemoved" });
    });
});
