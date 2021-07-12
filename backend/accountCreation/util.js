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

function getUserVerificationCode(email) {
    // retrieves verification code created for this email
    return await User.find(
        { email: email },
        "verificationCode",
        function (err, user) {
            if (err) throw err;
            console.log(user.verificationCode);
            return user.verificationCode;
        }
    );
}

function generateUserVerificationCode() {
    const possibleChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 7; i++) {
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
                accountCreatedAt: new Date(),
                verificationCode: verificationCode,
                failedAttempts: 0,
                activeAccount: false,
                accountType: "user",
                postCount: 0,
                DMsAreOpen: false,
                following: [],
                followers: [],
                bio: "",
                displayName: req.body.username.trim(),
                suspended: false,
                acceptsTermsAndConditions: false,
                failedVerifications: 0,
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
                    res.send("verification_code_sent");
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
        user.finishedSignUp = true;
        user.activeAccount = true;

        user.save(function (err) {
            if (err) {
                console.log("ERROR:", err);
            }
        });
    });
}
