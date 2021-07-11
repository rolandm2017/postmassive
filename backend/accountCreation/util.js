const User = require("../models/user.model");

module.exports = {
    checkIfAllCharsAreAcceptedInName,
    userIsOlderThan13,
    getAttemptsByEmail,
    getUserCode,
    generateUserVerificationCode,
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

function getUserCode(email) {
    // retrieves verification code created for this email
    return User.find(
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
    res
) {
    console.log("crypting...");
    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) throw err;
        const verificationCode = generateUserVerificationCode();
        console.log("here is the code:", verificationCode);
        new User({
            fullName: req.body.name,
            email: req.body.email,
            dateOfBirth: req.body.date,
            username: username,
            passwordHash: hash, // password is hashed by bcrypt
            createdAt: new Date(),
            verificationCode: verificationCode,
            failedAttempts: 0,
            activeAccount: false,
            accountType: "user",
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
