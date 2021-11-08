const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const production = require("./config.json").production;

let port;
if (production) {
    port = 5007;
} else {
    port = 8080;
}

// TODO: Make a list of code to keep from this server to use in the real dev server.
// TODO: make a list of code to keep from the other server.js file to use in the real dev server.
// TODO: copy this Mockserver.js file to a new server.js file and start fresh.

const app = express();

const whitelist = [
    "http://www.postmassive.com",
    "www.postmassive.com",
    "http://localhost:3000",
];
const corsOptions = {
    credentials: true, // This is important. // ugh, what does credentials: true do?
    origin: (origin, callback) => {
        if (whitelist.includes(origin)) {
            console.log("SERVER REQUEST ACCEPTED:", origin);
            return callback(null, true);
        }
        console.log(
            "errrrrrrrrrrrrrrr\nrrrrrrrrrrr\nrrrrrrrr",
            origin,
            "\n-------"
        );
        callback(new Error("Not allowed by CORS"));
    },
};

// misc stuff
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

let saltRounds;
if (process.env.NODE_ENV === "development") {
    saltRounds = 3;
} else {
    saltRounds = 7; // was once like 20
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
// The Post Page

app.use(api, require("./userActions/post/post"));

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
app.use(
    api + "/massives",
    require("./userActions/massiveActions/massiveActions")
);

// *** *** ***
// *** *** ***
// CRUD for DMs

// todo: implement later...

// ********
// get fake data for timeline
app.use(api + "/mock", require("./data/pages/pages"));

if (production) {
    app.listen(port, () => {
        console.log(`Example app listening at http://165.227.78.120:${port}`);
    });
} else {
    app.listen(port, () => {
        console.log(`Example app listening at http://127.0.0.1:${port}`);
    });
}
