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
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            ...authHeader(url),
        },
    };
}

export function postOptions(url, isExternal, calledBy, postContent) {
    if (postContent) {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                ...authHeader(url, isExternal, calledBy),
            },
            credentials: "include",
            body: JSON.stringify(postContent),
        };
    } else {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                ...authHeader(url, isExternal, calledBy),
            },
            credentials: "include",
        };
    }
}

export function putOptions(url, body) {
    return {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "http://localhost:3000",
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

function authHeader(url, isExternal, calledBy) {
    console.log("authHeader calledBy:", url, isExternal, calledBy);
    // return auth header with jwt if user is logged in and request is to the api url
    let user = userValue() !== null ? userValue() : false;
    if (isExternal) {
        // console.log("********\nyou refreshed\n*********");
        user = Cookies.get("user");
        const aUserWasStoredInCookies = typeof user !== "undefined";
        if (aUserWasStoredInCookies) {
            // console.log(user.substring(0, 80), typeof user);
            user = JSON.parse(user);
        }

        // console.log("Came out as: ", user);
        userSubject.next(user);
    }
    if (!user) {
        // console.log("setting header as blank", new Date().getSeconds(), user); // fixme: have to get user value into 'user'
        return {}; // fixme: site is here and goes no further.
    }

    const userObjectHasAToken = user.jwtToken;
    const isLoggedIn = user && userObjectHasAToken;
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    console.log(83, isLoggedIn.substring(0, 20), isApiUrl, url);
    if (isLoggedIn && isApiUrl) {
        // // console.log(
        // //     "Auth bearer trrying to add rToken",
        // //     getRefreshToken().substring(0, 20)
        // // );
        // if (postContent) {
        //     let contentToStringify = JSON.stringify(postContent);
        //     return {
        //         Authorization: `Bearer ${getRefreshToken()}`,
        //         body: contentToStringify,
        //     };
        // } else {
        return {
            Authorization: `Bearer ${getRefreshToken()}`,
        };
        // }
    } else {
        console.error("###############################");
        console.log(
            "*****#%#%#%# did not set JWT into auth header\n*******#%#%#%#",
            isLoggedIn,
            isApiUrl,
            userObjectHasAToken
        );
        console.error("###############################");
        return {};
    }
}
