// FROM:
// https://jasonwatmore.com/post/2020/04/22/react-email-sign-up-with-verification-authentication-forgot-password
// the "Fetch Wrapper" part

// The authHeader() function is used to automatically add a JWT auth token to
// the HTTP Authorization header of the request if the user is logged in and
// the request is to the application api url.
import Cookies from "js-cookie";

import { userValue, userSubject, getRefreshToken } from "../auth/use-auth";

export function getOptions(url) {
    console.log("further test:", authHeader(url));
    return {
        method: "GET",
        headers: authHeader(url),
    };
}

export function postOptions(url, isExternal) {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(url, isExternal),
        },
        credentials: "include",
        // body: JSON.stringify(body),
    };
}

export function putOptions(url, body) {
    return {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...authHeader(url),
        },
        // body: JSON.stringify(body),
    };
}

// prefixed with underscored because delete is a reserved word in javascript
export function _deleteOptions(url) {
    return {
        method: "DELETE",
        headers: authHeader(url),
    };
}

// helper functions

function authHeader(url, isExternal) {
    // return auth header with jwt if user is logged in and request is to the api url
    let user = userValue() !== null ? userValue() : false; // fixme: this isnt being updated properly. when authHeader fires, it should update w/ user info.
    console.log(56, user, isExternal); // fixme:
    if (isExternal) {
        console.log("********\nyou refreshed\n*********");
        user = Cookies.get("user"); // fixme: process into user object from cookie string
        const aUserWasStoredInCookies = typeof user !== "undefined";
        if (aUserWasStoredInCookies) {
            console.log(user.substring(0, 80), typeof user);
            user = JSON.parse(user);
        }
        // fixme: ok but why do I have to have user object in here? is the jwt from the user object's refresh token really important?
        // or can i just skip checking if the user is in the behaviorSubject?
        // the probl is that when index.js refreshToken()s, there's nothing in userSubject.
        // so in that particular case of index.js refreshing, I want to refreshToken successfully.
        // so user has to get user && user.jwtToken from the cookie.
        // fixme: still badness, refresh->/login, qq
        console.log("Came out as: ", user);
        // todo: cram user into userValue now ? is that the problem?
        userSubject.next(user);
    }
    if (!user) {
        console.log("setting header as blank", new Date().getSeconds(), user); // fixme: have to get user value into 'user'
        return {};
    }
    console.log(61, user, url.startsWith(process.env.REACT_APP_API_URL));
    const userObjectHasAToken = user.jwtToken;
    const isLoggedIn = user && userObjectHasAToken;
    // i am formally against && unnamed bools
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    if (isLoggedIn && isApiUrl) {
        const refreshToken = getRefreshToken();
        console.log(
            `**((**((** auth Bearer header ${refreshToken}`,
            "\n*\n*expecting login success"
        );
        return { Authorization: `Bearer ${getRefreshToken()}` };
    } else {
        console.log(
            "*****#%#%#%# did not set JWT into auth header\n#%#%#%# *******",
            isLoggedIn,
            isApiUrl,
            userObjectHasAToken
        );
        return {};
    }
}

// TODO: It might be nice to copy this style of catch-all "handleResponse" into the api

// function handleResponse(response) {
//     return response.text().then((text) => {
//         const data = text && JSON.parse(text);

//         if (!response.ok) {
//             if (
//                 [401, 403].includes(response.status) &&
//                 accountService.userValue
//             ) {
//                 // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//                 accountService.logout();
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }
