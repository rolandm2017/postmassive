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
    let user = userValue() !== null ? userValue() : false;
    console.log(56, user.username, isExternal);
    if (isExternal) {
        console.log("********\nyou refreshed\n*********");
        user = Cookies.get("user");
        const aUserWasStoredInCookies = typeof user !== "undefined";
        if (aUserWasStoredInCookies) {
            console.log(user.substring(0, 80), typeof user);
            user = JSON.parse(user);
        }

        console.log("Came out as: ", user);
        userSubject.next(user);
    }
    if (!user) {
        console.log("setting header as blank", new Date().getSeconds(), user); // fixme: have to get user value into 'user'
        return {};
    }
    console.log(
        61,
        user.username,
        url.startsWith(process.env.REACT_APP_API_URL)
    );
    const userObjectHasAToken = user.jwtToken;
    const isLoggedIn = user && userObjectHasAToken;
    // i am formally against && unnamed bools
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    if (isLoggedIn && isApiUrl) {
        // console.log(
        //     `**((**((** auth Bearer header ${refreshToken}`,
        //     "\n*\n*expecting login success"
        // );
        console.log("Auth bearer trrying to add rToken");
        return { Authorization: `Bearer ${getRefreshToken()}` };
    } else {
        console.log(
            "*****#%#%#%# did not set JWT into auth header\n#%#%#%# *******",
            isLoggedIn,
            isApiUrl,
            userObjectHasAToken
        );
        console.error("###############################");
        return {};
    }
}
