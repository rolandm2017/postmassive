import {
    formCheck,
    usernameServerCheck,
    usernameIsValid,
    emailIsValid,
    validPassword,
    verifyUsernameAndPassword,
    verifyCode,
} from "./Validation";

import { useAuth } from "../../auth/use-auth";

export {
    handleAddUsernameOrEmail,
    sendLogInIfInfoIsValid,
    bundleAcceptedAccountInfoAndSendVerificationCode,
    handlePageOne,
    handlePageTwo,
    handlePageThree,
    handleFinish,
};

const auth = useAuth();

function handleAddUsernameOrEmail(usernameOrEmail, setUsername, setEmail) {
    // accepts username || email, verifies valid input on frontend, displays err msg if it is invalid.
    // stores username || email if valid so its ready to be sent to server when user clicks Log In.
    if (usernameOrEmail.indexOf("@") === -1) {
        // its a username in this case
        console.log("setting username...", usernameOrEmail);
        setUsername(usernameOrEmail);
        // empty out the email in case it was set before the code learned user is using their username
        setEmail("");
    } else {
        console.log("setting email...", usernameOrEmail);
        // its an email in this case
        // empty out the username in case it was set before the code learned user is using their email
        setUsername("");
        setEmail(usernameOrEmail);
    }
}

const sendLogInIfInfoIsValid = (
    username,
    email,
    password,
    displayErrorInModal,
    setError,
    setDesktopLoginError
) => {
    // if email/username && pw are valid, log into PM. else, display error.
    let errMsg;
    // console.log("NINETY EIGHT", validPassword(password), password);
    if (usernameIsValid(username) || emailIsValid(email)) {
        // console.log("one oh four");
        if (validPassword(password)) {
            console.log("TEST:", username, email);
            // console.log("level two:", );
            auth.signIn(username, email, password, {
                pathname: "/home",
            }).catch((err) => {
                console.log("math!", err);
                if (displayErrorInModal) {
                    setError(err);
                } else {
                    setDesktopLoginError(err);
                }
            });
        } else {
            errMsg = "Invalid password.";
        }
    } else {
        errMsg = "Email or username is invalid.";
    }

    if (typeof errMsg === "string") {
        console.log("attempting to set err", errMsg);
        if (displayErrorInModal) {
            setError(errMsg);
        } else {
            setDesktopLoginError(errMsg);
        }
    }
};

const bundleAcceptedAccountInfoAndSendVerificationCode = (
    name,
    email,
    date,
    username,
    password
) => {
    const data = {
        fullName: name,
        email: email,
        birthdate: date,
        username: username,
        password: password,
    };
    return new Promise((resolve, reject) => {
        resolve(true);
    });
    // disabled this promise just for the demo
    // return new Promise((resolve, reject) => {
    //     Axios.post(
    //         process.env.REACT_APP_API_URL +
    //             "/signup/validate/createAccountAndSendVerification",
    //         data
    //     )
    //         .then((response) => resolve(response))
    //         .catch((err) => {
    //             // TODO: we are here
    //             console.log("THIS IS PROBABLY NOT WORKING", err);
    //             reject(err);
    //         });
    // });
};

const handlePageOne = (name, email, date, setShowPage, setError) => {
    // TODO: display error msg "server is down" if net::ERR_CONNECTION_REFUSED. Utilize a timer?
    formCheck(name, email, date, setError)
        .then((res) => {
            if (res === "personal_accepted") {
                setShowPage(2);
                setError("");
            } else if (res === "bad_name") {
                setError("Please write your full name.");
            } else if (res === "bad_email") {
                setError("You wrote your email incorrectly.");
            } else if (res === "bad_age") {
                setError("You must be at least 13 to use PostMassiv.");
            } else if (res === "email_already_taken") {
                setError("This email is already taken!");
            } else {
                setError(
                    "Unexpected error. Contact @rolypolyistaken on Twitter if the issue persists."
                );
            }
        })
        .catch((err) => setError(err));
};

const handlePageTwo = (
    username,
    email,
    password,
    name,
    date,
    setShowPage,
    setError
) => {
    const clientSideCheck = verifyUsernameAndPassword(username, password);
    if (clientSideCheck.hasOwnProperty("msg")) {
        setError(clientSideCheck.msg);
    } else {
        // only do the server side check if the client side tests were passed
        usernameServerCheck(username)
            .then((response) => {
                console.log("204:", response); // FIXME: input "postmassiv" threw up the "else" condition. wrong condition
                if (response === "accepted") {
                    bundleAcceptedAccountInfoAndSendVerificationCode(
                        name,
                        email,
                        date,
                        username,
                        password
                    )
                        .then((response) => {
                            setShowPage(3);
                            setError("");
                        })
                        .catch((err) => {
                            // Fixme: this is receiving an object and it should be getting text
                            // console.log(
                            //     err,
                            //     Object.keys(err.response),
                            //     Object.values(err.response)
                            // );
                            // console.log("what is it", typeof err, err);
                            setError(err.response.status);
                        });
                } else if (response === "admin_or_postmassiv") {
                    setError(
                        "Username cannot contain 'admin' or 'postmassiv'."
                    );
                } else if (response === "banned_chars_detected") {
                    setError("Only A-Z, a-z, 0-9 and underscores, please.");
                } else if (response === "banned_word_detected") {
                    setError("Banned word detected.");
                } else if (response === "invalid_password") {
                    setError(
                        "Invalid password. Use only: A-Z, a-z, 0-9, and !@#$%^&*()_+"
                    );
                } else if (response === "no_whitespace") {
                    setError("No spaces allowed in usernames.");
                } else if (response === "too_many_underscores") {
                    setError("Two underscores max.");
                } else if (response === "wrong_name_length") {
                    setError("Name must be 1 to 16 characters long.");
                } else {
                    setError("Unacceptable username.");
                }
            })
            .catch((err) => setError(err));
    }
};

const handlePageThree = (
    verificationCode,
    email,
    setVerifiable,
    setShowPage,
    setError
) => {
    // TODO: turn this into a live version. something like "sendCodeToServer()" then "if success, login & redirect to /home"
    verifyCode(verificationCode, email, setVerifiable).then((response) => {
        if (response.status === 200) {
            setShowPage(4);
            setError("");
        } else {
            setError("Wrong code. Try again.");
        }
    });
};

// TODO: the finishing click is not finished. finish it.
const handleFinish = () => {
    // authenticate user and send them to the home page
};
