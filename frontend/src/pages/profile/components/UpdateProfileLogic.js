import { putOptions } from "../../../_helper/authHeader";

export function updateProfileAPI(username, displayName, bio, location, url) {
    const body = {
        username: username,
        displayName: displayName,
        bio: bio,
        location: location,
        url: url,
    };
    const updateProfileUrl =
        process.env.REACT_APP_API_URL + "/profile?username=" + username;
    fetch(updateProfileUrl, putOptions(updateProfileUrl, body)).then((res) => {
        console.log(res);
    });
}

export function convertToThreeDigits(integer, followers) {
    let string = integer.toString();
    if (integer < 1000) {
        // e.g. 999
        return integer;
    } else if (integer >= 1000 && integer < 10000) {
        // e.g. 1,000 to 9,999
        return string[0] + "," + string.slice(1);
    } else if (integer >= 10000 && integer < 100000) {
        // 10.0k to 99.9k
        return string.slice(0, 2) + "." + string[2] + "k";
    } else if (integer >= 100000 && integer < 1000000) {
        // 100.0k to 999.9k
        return string.slice(0, 3) + "." + string[3] + "k";
    } else if (integer >= 10000000) {
        // 10.0M to 99.9M (even Trump doesn't exceed 99.9M on Twitter)
        return string.slice(0, 2) + "." + string[2] + "M";
    } else {
        // 1.0M to 9.99M
        return string[0] + "." + string.slice(1, 3) + "M";
    }
}
