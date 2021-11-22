export function styleObjectIsEmpty(style) {
    let isEmpty =
        style && // 👈 null and undefined check
        Object.keys(style).length === 0 &&
        Object.getPrototypeOf(style) === Object.prototype;
    return isEmpty;
}

export function detectIsStylingEmpty(stylings) {
    let a = 0;
    for (let i = 0; i < stylings.length; i++) {
        let objectIsEmpty = styleObjectIsEmpty(stylings[i]);
        console.log(8, objectIsEmpty);
        if (objectIsEmpty) {
            a++;
        }
    }
    if (a === stylings.length) {
        return true;
    }
    return false;
}

export function prettyText(inputText, stylings, callback) {
    /*
    // inputText: the text to style. should be a long string.
    // stylings: expecting 1 to 3 Stylings objects.
    // returns: chunks of JSX that (magically? how?) connect together in the browser
    */

    let isStylingsEmpty = detectIsStylingEmpty(stylings);
    if (isStylingsEmpty) {
        // console.log(26, "yes, it was empty");
        return inputText;
    } else {
        // console.log(30, stylings);
    }

    console.log(
        7,
        stylings,
        typeof stylings,
        stylings[0]
        // stylings[1],
        // stylings[2] // 3, 35, bold
    );
    let oddsAreSpecial = true;
    // fixme: standard case where stylings is all empty objects; this is the start of the show
    if (stylings[0].start === 0) {
        // special condition
        oddsAreSpecial = false;
    }
    console.log(inputText, stylings);
    let splitUpTexts = getSubstringsWithInstructions(inputText, stylings);
    // FIXME: what if we have special chunks like sSSSs
    // ...where s = nonspecial, S = special. or SSSs
    // or sSSsSs or sSsSSs ... need a more generalized algo.

    // { special: false, value: initSlice }
    // { special: true, value: specialMiddleSlice, styling: stylings[0] },
    console.log(splitUpTexts, stylings);
    let chunks = splitUpTexts.map((chunk, index) => {
        console.log(chunk.special, chunk.value);
        if (chunk.special) {
        }
        return null;
    });
    return chunks; // works as of 3:48 pm
    // return (
    //     <span key={index} className={`${availableStylings.join(" ")}`}>
    //         {chunk}
    //     </span>
    // );
    // return (
    //     <span key={index} className={`${availableStylings}`}>
    //         {chunk}
    //     </span>
    // );
}

function getSubstringsWithInstructions(inputText, preprocessedStylings) {
    /*
    // inputText - self explanatory
    // preprocessedStylings - it may be that the user has supplied 0, 1, 2, or 3 stylings.
    // ...this function's role is to sort out how many substrings we'll need.
    // for 0, we don't need any substrings.
    // for 1, we just need the substring that is encapsulated by the Styling.
    // for 2 or 3, a loop makes sense, though barely!
    // return value - should be an array of strings that can be combined using prettyText
    */

    // todo: only splice if there is a styling attached to the stylings obj
    let stylings = [];
    preprocessedStylings.forEach((styling) => {
        // get rid of the empty styling objects.
        if (typeof styling.stylings === "undefined") {
            // ...
            console.log(126, styling, " did not have a styling attached!");
        } else {
            stylings.push(styling);
        }
    });
    let stringsWithInstructions = [];

    // handle case where Stylings is only 1 singular Styling
    if (stylings.length === 1) {
        let initSlice = inputText.slice(0, stylings[0].start);
        let specialMiddleSlice = inputText.slice(
            stylings[0].start,
            stylings[0].end
        );
        let endSlice = inputText.slice(stylings[0].end, inputText.length);
        return [
            {
                special: false,
                value: initSlice,
            },
            { special: true, value: specialMiddleSlice, styling: stylings[0] },
            {
                special: false,
                value: endSlice,
            },
        ];
    }

    // if 2 or 3 ... almost want to write it out by hand...
    if (detectIsStylingEmpty(stylings)) {
        return inputText;
    }

    let initSlice = {
        special: false,
        value: inputText.slice(0, stylings[0].start),
    };
    if (stylings.length > 0) {
        stringsWithInstructions.push(initSlice);
    }
    for (let i = 0; i < stylings.length; i++) {
        let weAreOnTheLastStyling = i === stylings.length - 1;

        if (weAreOnTheLastStyling) {
            let slice = inputText.slice(stylings[i].start, stylings[i].end); // will go from i to end of string

            slice = {
                special: true,
                value: slice,
                styling: stylings[i],
                numberOfStylings: stylings[i].stylings.length,
            };
            stringsWithInstructions.push(slice);
            let trailEnd = inputText.slice(stylings[i].end); // will be the trailing but
            trailEnd = {
                special: false,
                value: trailEnd,
            };
            stringsWithInstructions.push(trailEnd);
        } else {
            let slice = inputText.slice(stylings[i].start, stylings[i].end);
            slice = {
                special: true,
                value: slice,
                styling: stylings[i],
                numberOfStylings: stylings[i].stylings.length,
            };
            stringsWithInstructions.push(slice);
            let theNormalPartInBetween = {
                special: false,
                value: inputText.slice(stylings[i].end, stylings[i + 1].start),
            };

            stringsWithInstructions.push(theNormalPartInBetween);
        }
    }
    console.log(stringsWithInstructions);
    return stringsWithInstructions;
}

export function convertEngagementText(inputNum) {
    // will receive views and likes in the millions.
    // convert 10,000-999,999 -> 10.0k - 999.9k
    // 1,000,000 to 999m -> 1.00m - 999.9m
    const lengthOfSingleDigitThousands = String(1000).length;
    const lengthOfSingleDigitMillions = String(1000 * 1000).length;
    const stringVer = String(inputNum);

    if (inputNum < 1000) {
        return String(inputNum);
    } else if (inputNum < 1000000) {
        // thousands
        if (stringVer.length === lengthOfSingleDigitThousands) {
            // single digit thousands, special case
            return stringVer.slice(0, 1) + "." + stringVer.slice(1, 2);
        }
        const lengthPreDecimal = stringVer.length - 3;
        const decimal = stringVer.slice(lengthPreDecimal, lengthPreDecimal + 1);
        return (
            stringVer.slice(0, lengthPreDecimal) +
            "." +
            stringVer.slice(lengthPreDecimal, decimal) +
            "k"
        );
    } else if (inputNum < 1000000000) {
        if (stringVer.length === lengthOfSingleDigitMillions) {
            // single digit millions, special case
            return stringVer.slice(0, 1) + "." + stringVer.slice(1, 2);
        }
        const lengthPreDecimal = stringVer.length - 6; // 6: slice off the 0's in 13,000,000, for instance
        const decimal = stringVer.slice(lengthPreDecimal, lengthPreDecimal + 1);
        return (
            stringVer.slice(0, lengthPreDecimal) +
            "." +
            stringVer.slice(lengthPreDecimal, decimal) +
            "m"
        );
    } else {
        // don't ever expect a billion but maybe some day...
        console.log("wow!");
        return stringVer.slice(0, 1) + "." + stringVer.slice(1, 3) + "b";
    }
}
