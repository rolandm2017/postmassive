// Hook (use-auth.js) based off of https://usehooks.com/useAuth/
import React, { useEffect, useContext, createContext } from "react";
import Cookie from "js-cookie";

import { useHistory } from "react-router-dom";
import { postOptions } from "../_helper/authHeader";

import { BehaviorSubject } from "rxjs";

import { startRefreshTokenTimer, stopRefreshTokenTimer } from "./refreshToken";

// // mock server login section
// export const mockingServer = true;

// const frontendOnly = false; // if true, client doesn't even bother requesting to the mockServer, just assumes serverside works.
// // these mock things are used when the frontendOnly flag is up
// export const mockUser = "RolyPoly"; // TODO: make mockUser more like the object we get back from the backend
// export const mockPassword = "battleships";
// export const mockEmail = "test@gmail.com";
// export const mockCode = "qwerty";
// export const mockJWT = "its4w3btok3n";

const userSubject = new BehaviorSubject(null);

export const user = userSubject.asObservable();
export const userValue = () => {
    console.log(userSubject.value);
    // FIXME: this userValue func is stil getting called WAY TOO OFTEN
    return userSubject.value;
};

const authContext = createContext();

// const baseURL = process.env.REACT_APP_API_URL + "/auth";
const baseURL = "http://localhost:3000/api/auth";

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
        if (frontendOnly) {
            userSubject.next(mockUser);
            // setJWT(mockJWT);
            history.push(location);
            return mockUser;
        } else {
            const signInUrl =
                baseURL +
                "/signIn?username=" +
                username +
                "&email=" +
                email +
                "&password=" +
                password;
            return new Promise((resolve, reject) => {
                fetch(signInUrl, postOptions(signInUrl))
                    .then((res) => {
                        console.log("this again");
                        res.json()
                            .then((userObject) => {
                                console.log(
                                    "Received user object:",
                                    userObject,

                                    userObject.user
                                );
                                console.log(
                                    "The JWT:",
                                    userObject.jwtToken,
                                    location
                                );
                                userSubject.next(userObject);
                                startRefreshTokenTimer();

                                history.push(location);
                                resolve(userObject);
                            })
                            .catch((err) => {
                                console.log(err);
                                // happens if there is no json in the response.
                                reject(
                                    "Error! Wrong username, email or password?"
                                );
                                // FIXME: these errors often show up when the server has a problem.
                                // this is a problem because "username email or pw?" has nothing to do w/ the src of err. Fix.
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        reject("Error. Wrong username, email or password?");
                        // FIXME: these errors often show up when the server has a problem.
                        // this is a problem because "username email or pw?" has nothing to do w/ the src of err. Fix.
                    });
            });
        }
    };

    const signUp = (email, password, location) => {
        if (frontendOnly) {
            userSubject.next(mockUser);
            // setJWT(mockJWT);
            history.push(location);
            return mockUser;
        } else {
            return new Promise((resolve, reject) => {
                const signUpUrl =
                    baseURL +
                    "/signIn?email=" +
                    email +
                    "&password=" +
                    password;
                fetch(signUpUrl, postOptions(signUpUrl))
                    .then((res) => {
                        res.json().then((userObject) => {
                            console.log(
                                "Received user object:",
                                userObject,
                                userObject.user
                            );
                            console.log(
                                "The JWT:",
                                userObject.jwtToken,
                                userObject.user.jwtToken
                            );
                            userSubject.next(userObject);
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
        }
    };

    const signOut = (location) => {
        if (frontendOnly) {
            userSubject.next(null);
            // setJWT(null);
            history.push(location);
        } else {
            console.log("Attempting to sign out ...");
            const revokeURL = baseURL + "/signOut";
            fetch(revokeURL, postOptions(revokeURL))
                .then((res) => {
                    userSubject.next(null);
                    Cookie.remove("jwt"); // TODO: test that this removes the jwt cookie on log out
                    stopRefreshTokenTimer();
                    console.log("revoked token successfully");
                    history.push(location);
                })
                .catch((err) => console.log(err));
        }
    };

    const sendPasswordResetEmail = (email) => {
        // forgot password!
        if (frontendOnly) {
            // TODO: ??? how to mock this?
        } else {
            return fetch(
                baseURL + "/sendPasswordResetEmail?email=" + email
            ).then((res) => {
                res.json().then((response) => {
                    if (response.emailSent) {
                        return true;
                    } else {
                        return false;
                    }
                });
            });
        }
    };

    const confirmPasswordReset = (code, password) => {
        if (frontendOnly) {
            return true;
        } else {
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
        }
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
                userSubject.next(user);
            } else {
                console.log("line 195");
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
