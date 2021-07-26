const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const port = 8080;

// TODO: Make a list of code to keep from this server to use in the real dev server.
// TODO: make a list of code to keep from the other server.js file to use in the real dev server.
// TODO: copy this Mockserver.js file to a new server.js file and start fresh.

const app = express();

// misc stuff
app.use(cors({ origin: true }));
app.use(cookieParser());
app.use(bodyParser.json());

let saltRounds;
if (process.env.NODE_ENV === "development") {
    saltRounds = 10;
} else {
    saltRounds = 17;
}

module.exports = {
    saltRounds: saltRounds,
};

// ****
// TODO: Make MongoDb set up when the server is set up, NOT when the first request comes in!
// ****

const api = "/api";

// *** *** ***
// *** *** ***
// Page Stuff

app.use(api, require("./data/pages/pages"));

// *** *** ***
// *** *** ***
// Auth stuff

app.use(api + "/signup/validate", require("./accountCreation/accountCreation"));
app.use(api + "/auth", require("./accountCreation/accountCreation"));

app.use(api + "/auth", require("./authentication/authentication"));

// *** *** ***
// *** *** ***
// CRUD for User account info, including their bio & user settings

// app.use(api + "/user", require("./userActions/userActions")); // TODO: add these

// *** *** ***
// *** *** ***
// CRUD for Massives
// app.use(api + "/massives", require("./massiveActions/massiveActions"));

// *** *** ***
// *** *** ***
// CRUD for DMs

// todo: implement later...

// ********
// get fake data for timeline
app.use(api + "/mock", require("./data/pages/pages"));

app.listen(port, () => {
    console.log(`Example app listening at http://127.0.0.1:${port}`);
});
