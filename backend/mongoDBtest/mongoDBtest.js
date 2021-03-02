const express = require("express");

const port = 8080;

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser);

// TODO:
// 0) do work to connect server to mongoDB
// 1) make route for POST massive to PM
// 2) make route for GET all massives from PM
// 3) make route for GET all massives from specific user
// 4) make route for POST massive to PM, associated with specific user
// 5) associate time
// 6) make massives have likes, amps & comment count
// 7)

// todo: connect server to mongodb

// HOW DO I MAKE THE SERVER CONNECT TO MONGODB?

const user = "user";
const massive = "massive";
const message = "message";

// POST a massive to the server
app.post("/massive/post", (req, res) => {
    console.log(req.body);
});

// GET all massives from the server
app.get("/massive/get", (req, res) => {});

// GET a user's massives
app.get("/massive/get/:id", (req, res) => {});

app.get(user + "", "asdf");

app.listen(port, () => {
    console.log(`Example app listening at http://127.0.0.1:${port}`);
});
