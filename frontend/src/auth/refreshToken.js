// import { postOptions } from "../_helper/authHeader";
// import { BehaviorSubject } from "rxjs";

// const userSubject = new BehaviorSubject(null);

// // helper functions

// export function refreshToken() {
//     // const url = process.env.REACT_APP_API_URL + "/auth/refreshToken";
//     const url = "http://localhost:3000/api/auth/refreshToken";
//     console.log("Attempting to refresh token...");
//     return (
//         fetch(url, postOptions(url))
//             // todo: copy watmore's refreshTOken() func in that it only has one then(), so his is
//             // a promise
//             // whereas mine is a promise inside of a promise.
//             .then((res) => {
//                 console.log("burning man", res); // ok this is where the json error is coming from
//                 return res.json().then((refreshedUser) => {
//                     console.log("shambhala", refreshedUser);
//                     return refreshedUser;
//                 });
//             })
//             .then((refreshedUser) => {
//                 // publish user to subscribers and start timer to refresh token
//                 // console.log("response of refresh token:", refreshedUser);
//                 console.log("edc, balaji");
//                 userSubject.next(refreshedUser);
//                 startRefreshTokenTimer();
//             })
//             .catch((err) => {
//                 console.log(err); // SyntaxError: Unexpected token < in JSON at position 0
//                 // throw err;
//             })
//     );
// }

// let refreshTokenTimeout;

// export function startRefreshTokenTimer() {
//     // parse json object from base64 encoded jwt token
//     // console.log(userSubject.value, userSubject);
//     // console.log("inside startRefreshTokenTimer()");
//     const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split(".")[1]));
//     // console.log("30:", jwtToken);

//     // set a timeout to refresh the token a minute before it expires
//     const expires = new Date(jwtToken.exp * 1000);
//     const timeout = expires.getTime() - Date.now() - 60 * 1000;
//     console.log(30, timeout);
//     refreshTokenTimeout = setTimeout(refreshToken, timeout);
// }

// export function stopRefreshTokenTimer() {
//     clearTimeout(refreshTokenTimeout);
// }
