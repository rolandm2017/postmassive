import axios from "axios";

// import { mockingServer } from "../../auth/use-auth";

// Form Validation Below

export const usernamePattern = /^[a-zA-Z0-9_]*$/;
export const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export function emailIsValid(email) {
    if (emailPattern.test(email)) {
        return true;
    }
    return false;
}

export function formCheck(name, email, date) {
    const validName = verifyName(name);
    const validEmail = emailIsValid(email);
    const validDob = verifyDateOfBirth(date);

    if (validName && validEmail && validDob) {
        const url = process.env.REACT_APP_API_URL + "/signup/validate/personal";
        const data = {
            name: name,
            email: email,
            date: date,
        };
        console.log("sending this: ", data);
        return new Promise((resolve, reject) => {
            axios
                .post(url, data, {
                    headers: {
                        "content-type": "application/json; charset=UTF-8",
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        resolve(res.data);
                    } else {
                        reject(false);
                    }
                })
                .catch((error) => {
                    if (!error.response) {
                        // network error
                        reject("Error: Network Error. Server is down.");
                    } else {
                        reject(error.response.data.message);
                    }
                });
        });
    } else if (!validName) {
        return new Promise((resolve) => resolve("bad_name"));
    } else if (!validEmail) {
        return new Promise((resolve) => resolve("bad_email"));
    } else if (!validDob) {
        return new Promise((resolve) => resolve("bad_age"));
    }
}

export function usernameIsValid(usernameInput) {
    const username = usernameInput.trim();

    const brandName = /([Pp][Oo][Ss][Tt][Mm][Aa][Ss]{2}[Ii][Vv])/;
    let totalUnderscores = 0;
    for (let i = 0; i < username.length; i++) {
        if (username[i] === "_") {
            totalUnderscores++;
        }
    }
    if (totalUnderscores > 2) {
        return false;
    } else if (username.length > 16 || username.length === 0) {
        return false;
    } else if (brandName.test(username) || username.includes("Admin")) {
        return false;
    } else if (username.includes(" ")) {
        return false;
    } else if (usernamePattern.test(username)) {
        return true;
    } else {
        return false;
    }
}

export function usernameServerCheck(username) {
    // This function goes to the server, asks "is this username valid?" and returns a response.
    const url = process.env.REACT_APP_API_URL + "/signup/validate/username";
    const data = { username: username };
    return new Promise((resolve, reject) => {
        axios
            .post(url, data, {
                headers: {
                    "content-type": "application/json; charset=UTF-8",
                },
            })
            .then((res) => {
                // console.log("in the promise:", res.status, res.data);
                if (res.status === 200) {
                    resolve(res.data);
                } else {
                    reject(false);
                }
            })
            .catch((error) => {
                if (!error.response) {
                    // network error
                    reject("Error: Network Error. Server is down.");
                } else {
                    reject(error.response.data.message);
                }
            });
    });
}

export const verifyCode = (
    code,
    email,
    setVerifiable,
    setShowPage,
    setError
) => {
    const onlyAlphanumerical = /^[A-Za-z0-9]*$/;
    if (code.length === 6 && onlyAlphanumerical.test(code)) {
        setVerifiable(true);
        axios
            .post(
                "localhost:3000/api/signup/validate/validateVerificationCodeAndSignUp",
                { verificationCode: code, email: email },
                {
                    headers: {
                        "content-type": "application/json; charset=UTF-8",
                    },
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    setVerifiable(true);
                    setShowPage(4);
                    setError("");
                } else {
                    // todo: what if the verification code is entered wrong? handle that case here
                    setError("Wrong code. Try again.");
                }
            });
        // send code to backend, receive "code is correct" or "nope, verification fail" response.
        return true; // returns true so the test suite knows what happened
    } else {
        setVerifiable(false);
        return false;
    }
};

export const verifyDateOfBirth = (date) => {
    // return true if person is older than 13
    const currentDate = new Date();
    const diff = Math.abs(currentDate - date);
    const differenceInDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const thirteenYearsInDays = 365 * 13;
    return differenceInDays > thirteenYearsInDays;
};

export const verifyName = (name) => {
    const fullNamePattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
    if (fullNamePattern.test(name)) {
        return true;
    } else {
        return false;
    }
};

export const verifyUsernameOrEmail = (usernameOrEmail) => {
    if (
        usernamePattern.test(usernameOrEmail) ||
        emailPattern.test(usernameOrEmail)
    ) {
        if (usernamePattern.test(usernameOrEmail)) {
            if (usernameOrEmail.length > 16 || usernameOrEmail.length === 0) {
                return false;
            }
            let totalUnderscores = 0;
            for (let i = 0; i < usernameOrEmail.length; i++) {
                if (usernameOrEmail[i] === "_") {
                    totalUnderscores++;
                }
            }
            if (totalUnderscores > 2) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
};

export const verifyUsernameAndPassword = (usernameInput, password) => {
    const username = usernameInput.trim();

    const brandName = /([Pp][Oo][Ss][Tt][Mm][Aa][Ss]{2}[Ii][Vv])/;
    let totalUnderscores = 0;
    for (let i = 0; i < username.length; i++) {
        if (username[i] === "_") {
            totalUnderscores++;
        }
    }
    if (totalUnderscores > 2) {
        return { msg: "Too many underscores." };
    } else if (username.length > 16 || username.length === 0) {
        return { msg: "Name must be 1 to 16 characters in length." };
    } else if (brandName.test(username) || username.includes("Admin")) {
        return { msg: `Cannot use "Admin" or any form of "PostMassiv".` };
    } else if (username.includes(" ")) {
        return { msg: "No spaces allowed." };
    } else if (usernamePattern.test(username)) {
        if (validPassword(password)) {
            return true;
        } else {
            return {
                msg: "Password invalid. Only alphanumeric & special characters. Between 7 and 29 characters in length.",
            };
        }
    } else {
        return { msg: "Username invalid." };
    }
};

export const validPassword = (password) => {
    const passwordValidator = /^[A-Za-z0-9!@#$%^&*()_+-=]*$/;
    if (
        passwordValidator.test(password) &&
        password.length > 6 &&
        password.length < 30
    ) {
        return true;
    } else {
        return false;
    }
};
