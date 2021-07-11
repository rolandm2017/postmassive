// This bunch of routes is for account registration.

const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

module.exports = router;

const validation = require("./util");
const {
    alphanumeric,
    brandName,
    offensiveSlang,
    offensiveWord,
} = require("./qualifiers");

router.post("/personal", (req, res) => {
    // Step 1: Verify name, email, date of birth
    console.log(req.body);
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const nameIsOk = validation.checkIfAllCharsAreAcceptedInName(req.body.name);
    const emailIsOk = emailPattern.test(req.body.email);
    const ageIsOk = validation.userIsOlderThan13(req.body.date);
    if (nameIsOk && emailIsOk && ageIsOk) {
        User.find({ email: req.body.email }, function (err, users) {
            if (err) throw err;
            const theresAlreadyAnAccountSignedUpWithThatEmail =
                users.length > 0;
            if (theresAlreadyAnAccountSignedUpWithThatEmail) {
                res.send("email_is_taken");
                throw "Trying to sign up with an email that's already taken";
            } else {
                res.send("personal_accepted");
            }
        });
    } else if (!nameIsOk) {
        // "not formatted like a real name"
        res.send("bad_name");
    } else if (!emailIsOk) {
        // "that's not an email..."
        res.send("bad_email");
    } else if (!ageIsOk) {
        // "you aren't old enough to use PM"
        res.send("bad_age");
    } else {
        res.send(400);
        throw Error("How did you get here?");
    }
});

router.post("/username", (req, res) => {
    // TODO: fill this in with an actual confirmation from the server that the username isn't malformed
    res.send("accepted");
});

router.post("/usernameAndPassword", (req, res) => {
    // Step 2: Verify username and password as OK.
    // If username & pw are OK, create account in DB, send a verification code to user's email
    const username = req.body.username.trim();
    let totalUnderscores = 0;
    if (alphanumeric.test(username)) {
        for (let i = 0; i < username.length; i++) {
            if (username[i] === "_") {
                totalUnderscores++;
            }
        }
        const invalidCharCombo = totalUnderscores > 2 || username.includes(" ");
        const invalidNameLength = username.length > 16 || username.length === 0;
        const bannedWordDetected =
            brandName.test(username) ||
            username.includes("Admin") ||
            offensiveWord.test(username) ||
            offensiveSlang.test(username);
        if (invalidCharCombo) {
            res.send("error");
        } else if (invalidNameLength) {
            res.send("error");
        } else if (bannedWordDetected) {
            res.send("banned_word_detected");
        } else {
            console.log("108108108_________108-_____108");
            // when the username is accepted...
            // check the password and then...
            // Look into the db for any user account using the email the user just signed up with
            // to prevent signing up with the same email twice
            const passwordValidator = /^[A-Za-z0-9!@#$%^&*()_+]{6, 30}$/;
            if (passwordValidator.test(req.body.password)) {
                User.find({ email: req.body.email }, function (err, users) {
                    if (err) throw err;
                    const theresAlreadyAnAccountSignedUpWithThatEmail =
                        users.filter((user) => user.finishedSignUp === true)
                            .length > 0;
                    if (theresAlreadyAnAccountSignedUpWithThatEmail) {
                        // TODO: log this error to the database if it ever happens. record time,
                        // date, data, "doc" and payload
                        throw "Trying to sign up with an email that's already taken";
                    } else {
                        verification.hashPasswordCreateUserAccountAndSendVerificationCode(
                            req.body.password,
                            saltRounds,
                            res
                        );
                    }
                });
            } else {
                res.send("invalid_password");
            }
        }
    } else {
        res.send("banned_chars_detected");
    }
});

router.post("/validateVerificationCodeAndSignUp", (req, res) => {
    // Step 4: Awaiting verification code. After it is accepted, the db goes,
    // "Ok, the username/account associated with this email is good to go. User can log in & use PM now"
    // this route is used when the user finally gets past name,email,dob,username,pw,verification code
    const failedAttempts = validation.getAttemptsByEmail(req.body.email);
    if (failedAttempts >= 3) {
        res.send("too_many_fails");
    } else {
        const receivedCode = req.body.verificationCode;
        const generatedPassword = validation.getUserCode(req.body.email);
        if (receivedCode === generatedPassword) {
            validation.approveAccountCreation(req.body.email);
            res.send("code_accepted");
        } else {
            validation.increaseFailedVerificationAttempts(req.body.email);
            res.send("wrong_code");
        }
    }
});
