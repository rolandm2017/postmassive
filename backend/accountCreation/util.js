const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

module.exports = {
    checkIfAllCharsAreAcceptedInName,
    userIsOlderThan13,
    getAttemptsByEmail,
    getUserVerificationCode,
    generateUserVerificationCode,
    hashPasswordCreateUserAccountAndSendVerificationCode,
    increaseFailedVerificationAttempts,
    approveAccountCreation,
};

function checkIfAllCharsAreAcceptedInName(fullName) {
    const pattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    if (pattern.test(fullName)) {
        return true;
    } else {
        return false;
    }
}

function userIsOlderThan13(date) {
    // same check as frontend code, just harder to hack 'cuz its from the server side, i guess
    const currentDate = new Date();
    const diff = Math.abs(currentDate - new Date(date));
    const differenceInDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const thirteenYearsInDays = 365 * 13;
    return differenceInDays > thirteenYearsInDays;
}

function getAttemptsByEmail(email) {
    // check how many times this user has tried to send their verification code
    return User.find({ email: email }, "failedAttempts", function (err, user) {
        if (err) throw err;
        return user.failedAttempts;
    });
}

async function getUserVerificationCode(email) {
    // retrieves verification code created for this email
    const thing = await User.find(
        { email: email },
        "verificationCode"
        // function (err, user) {
        //     if (err) throw err;
        //     console.log("was it retrieved", user, user[0].verificationCode);
        //     const verificationCode = user[0].verificationCode;
        //     console.log("but was it really??", verificationCode);
        //     return verificationCode;
        // }
    ).exec(); // fixme: .exec() is just a fancy promise
    console.log("thing", thing, thing[0]);
    const verificationCode = thing[0].verificationCode;
    console.log("55,", verificationCode, typeof verificationCode);
    return verificationCode;
}

function generateUserVerificationCode() {
    const possibleChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    VERIFICATION_CODE_LENGTH = 7; // fixme: import this from the same file as whats in the tests suite.
    for (let i = 0; i < VERIFICATION_CODE_LENGTH; i++) {
        code += possibleChars[Math.floor(Math.random() * possibleChars.length)];
    }
    return code;
}

function increaseFailedVerificationAttempts(email) {
    // increment counter for failed verifications.
    // limit is 3 but that limiting is handled outside of func
    User.findOne({ email: email }, function (err, user) {
        if (err) throw err;
        user.failedAttempts = user.failedAttempts + 1;
        // TODO: test whether this func really increments failedAttempts like it says it does

        user.save(function (err) {
            if (err) {
                console.log("ERROR:", err);
            }
        });
    });
}

function hashPasswordCreateUserAccountAndSendVerificationCode(
    password,
    saltRounds,
    req,
    res
) {
    console.log("crypting...");
    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) throw err;
        const verificationCode = generateUserVerificationCode();
        console.log("here is the code:", verificationCode);
        try {
            new User({
                fullName: req.body.fullName,
                email: req.body.email,
                dateOfBirth: req.body.birthdate,
                username: req.body.username.trim(),
                passwordHash: hash, // password is hashed by bcrypt
                //account credentials
                role: "user",
                accountCreatedAt: new Date(),
                // verification info
                isVerified: false,
                verificationCode: verificationCode,
                failedVerifications: 0,
                // misc
                suspended: false,
                acceptsTermsAndConditions: false,
                // public profile stuff
                displayName: req.body.username.trim(),
                bio: "",
                location: "",
                url: "",
                followers: [],
                following: [],
                DMsAreOpen: false,
                postCount: 0,
            })
                .save()
                .then((success) => {
                    // Step 3: Create account with email, username, pw, send verification code.
                    // Await step 4 before activating account.
                    // if account is not verified within 24 hrs, delete it.
                    console.log("Added an account to the database!");
                    // TODO: send email to user's supplied email with the verificationCode
                    // TEMP: send it to the frontend for whatever reason
                    console.log(verificationCode);
                    res.send(verificationCode);
                })
                .catch((err) => {
                    throw err;
                });
        } catch (error) {
            throw error;
        }
    });
}

function approveAccountCreation(email) {
    // approves account creation. basically removes auto-delete timer for this user's user doc
    User.findOne({ email: email }, function (err, user) {
        if (err) throw err;
        // user.finishedSignUp = true; // zombied 07-11
        user.isVerified = true;

        user.save(function (err) {
            if (err) {
                console.log("ERROR:", err);
            }
        });
    });
}
