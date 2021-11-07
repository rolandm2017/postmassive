const massivesDb = require("../../_helpers/db").Massive;
const {
    BOLD,
    ITALIC,
    UNDERLINED,
    HIGHLIGHTED,
} = require("../../_helpers/textStyleConstants");

function getExpectedViewsForPost() {
    // access info about how many people will visit the site today
    return null;
}

function displayCostOfPosting(username) {
    // LATER: access auctioneer to get cost for post
    return "$1.00";
}

function postThePost(username, content, priceIsAuthorizedByUser) {
    // user says "ok, deal"
}

function chooseStyling(styleType, startPosition, endPosition, substring) {
    // allows user to choose styling
    if (styleType === BOLD) {
    } else if (styleType === ITALIC) {
    } else if (styleType === UNDERLINED) {
    } else if (styleType === HIGHLIGHTED) {
    } else {
        throw "Not yet implemented!";
    }
}
