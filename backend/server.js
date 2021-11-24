const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const production = require("./config.json").production;
const postman = require("./config.json").postman;

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
    "https://www.postmassive.com",
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
if (!postman) {
    app.use(cors(corsOptions)); // CORS OFF for Postman backend-only dev, ON for frontEnd dev
}
// app.use(cors());
// if (!production) {
//     console.log("Proxy engaged, localhost:3000 -> 127.0.0.1");
//     app.use(
//         "/api",
//         createProxyMiddleware({
//             target: "http://localhost:3000/",
//             changeOrigin: true,
//         })
//     );
// }

// misc stuff
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

// TODO: Make MongoDb set up when the server is set up, NOT when the first request comes in!

const api = "/api";

// *** *** ***
// Auth stuff

app.use(api + "/signup/validate", require("./accountCreation/accountCreation"));
app.use(api + "/auth", require("./accountCreation/accountCreation"));
app.use(api + "/auth", require("./authentication/authentication"));

// The Post Page

app.use(api + "/post", require("./userActions/post/post"));

// CRUD for User profile info, their bio & user settings

app.use(api + "/profile", require("./userActions/profile/profile"));
// app.use(api + "/settings", require("./userActions/settings/settings"));

// Retrieve Wall updates
app.use(api + "/wall", require("./wall/index"));

app.use(api + "/massive", require("./massive/massive"));

// *** *** ***
// notifications
app.use(api + "/notifications", require("./notifications/notifications"));

// *** *** ***
// *** *** ***
// CRUD for DMs

app.use(api + "/message", require("./userActions/message/message"));

//

app.get(api + "/test", (req, res) => {
    // so you can see if going to the https://147.182.152.13:${port}/api/test returns 'foo' to confirm server runs on that ip
    res.send("foo");
});

if (production) {
    app.listen(8080, () => {
        console.log(`Example app listening at https://147.182.152.13:${port}`);
    });
    https.createServer(sslOptions, app).listen(port);
    // copying from https://www.sitepoint.com/how-to-use-ssltls-with-node-js/
} else {
    console.log("PORT:", port);
    app.listen(port, () => {
        console.log(`Example app listening at http://127.0.0.1:${port}`);
    });
}
