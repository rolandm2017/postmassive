export function getAuctioneerResponse() {
    // talks to server's auctioneer to get price of post
    let auctioneerSays = Math.random() * 1000;
    console.log(36, auctioneerSays);
    let asMoney = auctioneerSays.toString().split(".")[0];
    let decimalValue = Math.ceil(Math.random() * 99)
        .toString()
        .substring(0, 3);

    let price = asMoney + "." + decimalValue;

    return price;
}

export function postPost(username, content, price, floor, stylings) {
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
                handleClick(); // redirect to /home
                console.log("sent data to server successfully");
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

export function addStyleToSection(styling, type, index, setter) {
    console.log(113, type, currentStyle, firstStyle, secondStyle, thirdStyle);
    if (currentStyle === 0) {
        // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
        let firstStyleIsEmpty = styleObjectIsEmpty(firstStyle);
        console.log(131, firstStyleIsEmpty, firstStyle);

        if (!firstStyleIsEmpty) {
            // type can still be empty tho
            updateStyleWithType(type, firstStyle, setFirstStyle);
        } else {
            // make the style. DO NOT refactor this to be outside of "currentStyle" dependency
            let styleInit = {
                start: 0,
                end: 3,
                styles: [type],
            };
            console.log("creating style...", styleInit, 134);
            setFirstStyle(styleInit);
        }
    } else if (currentStyle === 1) {
        let secondStyleIsEmpty = styleObjectIsEmpty(secondStyle);
        console.log(149, secondStyleIsEmpty, secondStyle);

        if (!secondStyleIsEmpty) {
            updateStyleWithType(type, secondStyle, setSecondStyle);
        } else {
            // make the style. DO NOT refactor this to be outside of "currentStyle" dependency
            let styleInit = {
                start: 0,
                end: content.length,
                styles: [type],
            };
            console.log("creating style...", 154);
            setSecondStyle(styleInit);
        }
    } else if (currentStyle === 2) {
        let thirdStyleIsEmpty = styleObjectIsEmpty(thirdStyle);
        console.log(179, thirdStyle, thirdStyleIsEmpty);
        if (!thirdStyleIsEmpty) {
            updateStyleWithType(type, thirdStyle, setThirdStyle);
        } else {
            // make the style. DO NOT refactor this to be outside of "currentStyle" dependency
            let styleInit = {
                start: 0,
                end: content.length,
                styles: [type],
            };
            console.log("creating style...", 179);
            setThirdStyle(styleInit);
        }
    } else {
        console.log(currentStyle, "<--- weird bug");
    }
}

export function removeStyleFromSection(styling, type, index, setter) {
    // fixme: very broken! if bold,italic,strikethrough, clicking 1 removes all.
    console.log(197, type, "this is index of what", index, "aiemd for bold");
    let currentStyles;
    if (index === 0) {
        currentStyles = [...firstStyle.stylings];
        const typeIndex = currentStyles.indexOf(type);
        if (typeIndex > -1) {
            currentStyles.splice(typeIndex, 1);
        }
        let newFirstStyleObject = {
            start: firstStyle.start,
            end: firstStyle.end,
            styles: currentStyles,
        };
        setFirstStyle(newFirstStyleObject);
    } else if (index === 1) {
        currentStyles = [...secondStyle.stylings];
        const typeIndex = currentStyles.indexOf(type);
        if (typeIndex > -1) {
            currentStyles.splice(typeIndex, 1);
        }
        let newSecondStyleObject = {
            start: secondStyle.start,
            end: secondStyle.end,
            styles: currentStyles,
        };
        setSecondStyle(newSecondStyleObject);
    } else if (index === 2) {
        currentStyles = [...thirdStyle.stylings];
        const typeIndex = currentStyles.indexOf(type);
        // FIXME: i suspect something is broken in here
        if (typeIndex > -1) {
            currentStyles.splice(typeIndex, 1);
        }
        let newThirdStyleObject = {
            start: thirdStyle.start,
            end: thirdStyle.end,
            styles: currentStyles,
        };
        setThirdStyle(newThirdStyleObject);
    } else {
        console.log(currentStyle, "<--- weird bug");
        // throw "strange error";
    }
}

export function handleChangeStartRange(
    styling,
    styleObjectIndex,
    newStartIndex,
    setter
) {
    // console.log(2248, styleObjectIndex, newStartIndex);
    let integerNewStartIndex = parseInt(newStartIndex, 10);
    if (styleObjectIndex === 0) {
        let newFirstStyle = { ...firstStyle };
        newFirstStyle.start = integerNewStartIndex;
        setFirstStyle(newFirstStyle);
    } else if (styleObjectIndex === 1) {
        let newSecondStyle = { ...secondStyle };
        newSecondStyle.start = integerNewStartIndex;
        setSecondStyle(newSecondStyle);
    } else if (styleObjectIndex === 2) {
        let newThirdStyle = { ...thirdStyle };
        newThirdStyle.start = integerNewStartIndex;
        setThirdStyle(newThirdStyle);
    }
}

export function handleChangeEndRange(
    styling,
    styleObjectIndex,
    newEndIndex,
    setter
) {
    let integerNewEndIndex = parseInt(newEndIndex, 10);
    // console.log(2265, styleObjectIndex, newEndIndex, integerNewEndIndex);
    if (styleObjectIndex === 0) {
        let newFirstStyle = { ...firstStyle };
        newFirstStyle.end = integerNewEndIndex;
        setFirstStyle(newFirstStyle);
    } else if (styleObjectIndex === 1) {
        let newSecondStyle = { ...secondStyle };
        newSecondStyle.end = integerNewEndIndex;
        setSecondStyle(newSecondStyle);
    } else if (styleObjectIndex === 2) {
        let newThirdStyle = {
            ...thirdStyle,
        };
        newThirdStyle.end = integerNewEndIndex;
        setThirdStyle(newThirdStyle);
    }
}
