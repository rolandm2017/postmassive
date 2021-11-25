import { postOptions } from "./authHeader";

import Styling from "../utility/classes/Styling";
import { styleObjectIsEmpty } from "../utility/utility";

export function getAuctioneerResponse() {
    // talks to server's auctioneer to get price of post
    let auctioneerSays = Math.random() * 1000;
    // console.log(36, auctioneerSays);
    let asMoney = auctioneerSays.toString().split(".")[0];
    let decimalValue = Math.ceil(Math.random() * 99)
        .toString()
        .substring(0, 3);

    let price = asMoney + "." + decimalValue;

    return price;
}

export function postPost(
    username,
    content,
    price,
    floor,
    stylings,
    handleGoToHome
) {
    // let displayName = user.displayName; // todo: get displayName for data
    let postContentWithStyling = {
        username: username,
        content: content,
        price: price,
        floor: floor,
        stylings: stylings,
    };
    // TODO: stick it into localHistory so browser can reload the data upon pgBack
    console.log("Sending ........", postContentWithStyling);
    // send a post to the server to
    let postingUrl = process.env.REACT_APP_API_URL + "/post/post";
    fetch(
        postingUrl,
        postOptions(postingUrl, false, 51, postContentWithStyling)
    ) // todo: content packages stuff into json.
        .then((x) => {
            if (200) {
                handleGoToHome(); // redirect to /home
                console.log("sent data to server successfully");
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function updateStyleWithType(type, styleObject, setter) {
    console.log(116, type, styleObject, setter);
    let newNthStyle = {
        ...styleObject,
    };
    let currentStyles = styleObject.stylings;
    if (typeof currentStyles === "undefined") {
        currentStyles = [];
    }
    currentStyles.push(type);
    newNthStyle.stylings = currentStyles.filter(onlyUnique);

    setter(newNthStyle);
}

export function addStyleToSection(styling, type, index, setter) {
    let isEmptyObject = styleObjectIsEmpty(styling);
    if (!isEmptyObject) {
        updateStyleWithType(type, styling, setter);
    } else {
        const styleInit = new Styling(0, 1, [type]);
        if (index === 0) {
            setter(styleInit);
        }
    }
    // 78 -> 132 refactored into 65 -> 75? that just cant be// FIXME: this.
}

export function removeStyleFromSection(styling, type, index, setter) {
    console.log(styling, 144);
    let currentStylings = new Styling(styling.start, styling.end, [
        ...styling.stylings,
    ]);
    let typeIndex = currentStylings.stylings.indexOf(type);
    console.log(currentStylings);
    let remainingStylings = currentStylings.getStylings().splice(typeIndex, 1);
    let newStyleObject = new Styling(
        currentStylings.start,
        currentStylings.end,
        remainingStylings
    );
    setter(newStyleObject);
}

// export function removeStyleFromSection2(styling, type, index, setter) {
//     // fixme: very broken! if bold,italic,strikethrough, clicking 1 removes all.
//     console.log(197, type, "this is index of what", index, "aiemd for bold");
//     let currentStyles;
//     if (index === 0) {
//         currentStyles = [...firstStyle.stylings];
//         const typeIndex = currentStyles.indexOf(type);
//         if (typeIndex > -1) {
//             currentStyles.splice(typeIndex, 1);
//         }
//         let newFirstStyleObject = {
//             start: firstStyle.start,
//             end: firstStyle.end,
//             styles: currentStyles,
//         };
//         setFirstStyle(newFirstStyleObject);
//     } else if (index === 1) {
//         currentStyles = [...secondStyle.stylings];
//         const typeIndex = currentStyles.indexOf(type);
//         if (typeIndex > -1) {
//             currentStyles.splice(typeIndex, 1);
//         }
//         let newSecondStyleObject = {
//             start: secondStyle.start,
//             end: secondStyle.end,
//             styles: currentStyles,
//         };
//         setSecondStyle(newSecondStyleObject);
//     } else if (index === 2) {
//         currentStyles = [...thirdStyle.stylings];
//         const typeIndex = currentStyles.indexOf(type);
//         // FIXME: i suspect something is broken in here
//         if (typeIndex > -1) {
//             currentStyles.splice(typeIndex, 1);
//         }
//         let newThirdStyleObject = {
//             start: thirdStyle.start,
//             end: thirdStyle.end,
//             styles: currentStyles,
//         };
//         setThirdStyle(newThirdStyleObject);
//     } else {
//         console.log(currentStyle, "<--- weird bug");
//         // throw "strange error";
//     }
// }
