const express = require("express");
const cors = require("cors");

const port = 8080;

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

const mongoose = require("mongoose");
const db = require("./db");

const user = "user";
const massive = "massive";
const message = "message";

// POST a massive to the server
app.post("/massive/post", (req, res) => {
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

// GET all massives from the server
app.get("/massive/get", (req, res) => {
    const filter = {};
    db.Massive.find(filter, function (err, massives) {
        if (err) {
            console.log(err);
        } else {
            console.log(massives);
            res.json(massives);
        }
    });

    // res.send(allMassives);
});

// GET a user's massives
app.get("/massive/get/:username", (req, res) => {
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

app.get(user + "", (req, res) => {});

app.listen(port, () => {
    console.log(`Example app listening at http://127.0.0.1:${port}`);
});
