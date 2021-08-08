// Hook (use-auth.js) based off of https://usehooks.com/useAuth/
import React, { useEffect, useContext, createContext } from "react";

import { useHistory } from "react-router-dom";
import { postOptions } from "../_helper/authHeader";

import { BehaviorSubject } from "rxjs";
import Cookies from "js-cookie";

// import { startRefreshTokenTimer, stopRefreshTokenTimer } from "./refreshToken";

// mock server login section
export const mockingServer = true;

// const frontendOnly = false; // if true, client doesn't even bother requesting to the mockServer, just assumes serverside works.
// // these mock things are used when the frontendOnly flag is up
// export const mockUser = "RolyPoly"; // TODO: make mockUser more like the object we get back from the backend
// export const mockPassword = "battleships";
// export const mockEmail = "test@gmail.com";
// export const mockCode = "qwerty";

// initialize the userSubject to hold the user obj once s/he logs in
const userSubject = new BehaviorSubject(null);

export const user = userSubject.asObservable(); // fixme: confusing ... what is this doing? name the variable better.
// fixme: cant const user just be disabled?
// "An observable can be created from both Subject and BehaviorSubject using subject.asObservable().

// The only difference being you can't send values to an observable using next() method."
// via: https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable

export const userValue = () => {
    // FIXME: this userValue func is still getting called WAY TOO OFTEN
    const isCurrentUserOrNull = userSubject.getValue();
    // console.log("userValue:", userSubject, isCurrentUserOrNull);
    // fixme: issue is, userValue() is run once after user sends login() request. then userSubject receives a new val.
    // but userValue is not updated, so app.js has no way to know about the logged in user.
    return isCurrentUserOrNull;
};

// authContext will inject the auth methods into their appropriate components
const authContext = createContext();

const baseURL = process.env.REACT_APP_API_URL + "/auth";
// const baseURL = "http://localhost:3000/api/auth";

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
    const history = useHistory();

    const signIn = (username, email, password, location) => {
        const signInUrl =
            baseURL +
            "/signIn?username=" +
            username +
            "&email=" +
            email +
            "&password=" +
            password;
        console.log("Wwill thos print:", signInUrl);
        return new Promise((resolve, reject) => {
            fetch(signInUrl, postOptions(signInUrl))
                .then((res) => {
                    console.log("this again ", new Date().getSeconds());
                    res.json()
                        .then((userObject) => {
                            console.log(
                                "Received user object:",
                                userObject,
                                userObject.username,
                                "The JWT:",
                                userObject.jwtToken,
                                location
                            );
                            userSubject.next(userObject);
                            console.log("setting jwt...", userObject.jwtToken);
                            Cookies.set("jwt", userObject.jwtToken);
                            startRefreshTokenTimer();
                            console.log("Pushing location to stack...");
                            history.push(location);
                            resolve(userObject);
                        })
                        .catch((err) => {
                            console.log(err);
                            // happens if there is no json in the response.
                            reject("Error! Wrong username, email or password?");
                            // FIXME: these errors often show up when the server has a problem.
                            // this is a problem because "username email or pw?" has nothing to do w/ the src of err. Fix.
                            // low priority tho
                        });
                })
                .catch((err) => {
                    console.log(err);
                    reject("Error. Wrong username, email or password?");
                    // FIXME: these errors often show up when the server has a problem.
                    // this is a problem because "username email or pw?" has nothing to do w/ the src of err. Fix.
                });
        });
    };

    const signUp = (email, password, location) => {
        return new Promise((resolve, reject) => {
            const signUpUrl =
                baseURL + "/signIn?email=" + email + "&password=" + password;
            fetch(signUpUrl, postOptions(signUpUrl))
                .then((res) => {
                    res.json().then((userObject) => {
                        userSubject.next(userObject);
                        console.log("setting jwt...", userObject.jwtToken);
                        Cookies.set("jwt", userObject.jwtToken);
                        startRefreshTokenTimer();
                        history.push(location);
                        resolve(userObject);
                    });
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    };

    const signOut = (location) => {
        console.log("Attempting to sign out ...");
        const revokeURL = baseURL + "/signOut";
        fetch(revokeURL, postOptions(revokeURL))
            .then((res) => {
                userSubject.next(null);

                stopRefreshTokenTimer();
                console.log("revoked token successfully");
                history.push(location);
            })
            .catch((err) => console.log(err));
    };

    const sendPasswordResetEmail = (email) => {
        return fetch(baseURL + "/sendPasswordResetEmail?email=" + email).then(
            (res) => {
                res.json().then((response) => {
                    if (response.emailSent) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
        );
    };

    const confirmPasswordReset = (code, password) => {
        return fetch(
            baseURL + "/confirmReset?code=" + code + "&password=" + password
            // baseURL + "/confirmReset/" + code + "/" + password
        ).then((res) => {
            res.json().then((response) => {
                if (response.confirmed) {
                    return true;
                } else {
                    return false;
                }
            });
        });
    };

    // Comment from the page I got this code from:
    // """
    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    // """ > what does this mean???
    // I think it means: When a component using useAuth() loads, the page "subs" to the user,
    // meaning that if there is a user already, the page sets the user as the current user. else, it
    // makes the user "false".
    useEffect(() => {
        const unsubscribe = (user) => {
            if (user) {
                console.log("setting jwt in unsubscribe...", user.jwtToken);
                Cookies.set("jwt", user.jwtToken);
                userSubject.next(user);
            } else {
                console.log("line 195");
                Cookies.remove("jwt");
                userSubject.next(null);
            }
        };

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Return the user object and auth methods
    return {
        signIn,
        signUp,
        signOut,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}

// helper functions

export function getRefreshToken() {
    // get refresh token from cookie
    return Cookies.get("jwt");
}

export function refreshToken() {
    const url = process.env.REACT_APP_API_URL + "/auth/refreshToken";

    console.log("Attempting to refresh token...");
    return (
        fetch(url, postOptions(url))
            // todo: copy watmore's refreshTOken() func in that it only has one then(), so his is
            // a promise
            // whereas mine is a promise inside of a promise.
            .then((res) => {
                console.log("burning man", res); // ok this is where the json error is coming from
                return res.json().then((refreshedUser) => {
                    console.log("shambhala", refreshedUser);
                    return refreshedUser;
                });
            })
            .then((refreshedUser) => {
                // publish user to subscribers and start timer to refresh token
                // console.log("response of refresh token:", refreshedUser);
                console.log("edc, balaji");
                userSubject.next(refreshedUser);
                Cookies.set("jwt", refreshedUser.jwtToken);
                startRefreshTokenTimer();
            })
            .catch((err) => {
                console.log(err); // SyntaxError: Unexpected token < in JSON at position 0
                // throw err;
            })
    );
}

let refreshTokenTimeout;

export function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split(".")[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires - Date.now();
    console.log(300, expires, timeout, new Date(timeout), jwtToken);
    refreshTokenTimeout = setTimeout(() => {
        refreshToken();
    }, timeout);
    // fixme PRIORITY
    // either: jwtToken isnt getting it from jetToken.split properly
    // or: the expires value is messed up
    // or: timeout is not calling refreshToken() correctly
}

export function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}
