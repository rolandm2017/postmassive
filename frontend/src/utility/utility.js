export function styleObjectIsEmpty(style) {
    let isEmpty =
        style && // 👈 null and undefined check
        Object.keys(style).length === 0 &&
        Object.getPrototypeOf(style) === Object.prototype;
    return isEmpty;
}

export function detectIsStylingsEmpty(stylings) {
    let a = 0;
    for (let i = 0; i < stylings.length; i++) {
        let objectIsEmpty = styleObjectIsEmpty(stylings[i]);
        // console.log(8, objectIsEmpty);
        if (objectIsEmpty) {
            a++;
        }
    }
    if (a === stylings.length) {
        return true;
    }
    return false;
}

export function detectWellMadeStyling(stylings) {
    /*
    // @params stylings - an array of stylings objects to loop over.
    // return value - true if there is at least one proper styling object in the array
    */
    // just look for ONE. then return.
    console.log(stylings.length);
    for (let i = 0; i < stylings.length; i++) {
        let stylingHasStart = stylings[i].start >= 0;
        let stylingHasEnd = stylings[i].end >= 0;
        let stylingHasStyles = stylings[i].stylings // primo ternary. "if undefined, then false!"
            ? stylings[i].stylings.length >= 1
            : false;
        console.log(34, stylingHasStart, stylingHasEnd, stylingHasStyles);
        if (stylingHasStart && stylingHasEnd && stylingHasStyles) {
            // console.log(35, stylings[i]);
            return true;
        }
    }
    // console.log("false!!!!!!!!", 37);
    return false;
}

export function prettyText(inputText, stylings, callback) {
    /*
    // inputText: the text to style. should be a long string.
    // stylings: expecting 1 to 3 Stylings objects.
    // returns: chunks of JSX that (magically? how?) connect together in the browser
    */

    let isStylingsEmpty = detectIsStylingsEmpty(stylings);
    if (isStylingsEmpty) {
        // console.log(26, "yes, it was empty");
        return inputText;
    } else {
        // console.log(30, stylings);
    }
    console.log("prettyText52", isStylingsEmpty, stylings);
    let atLeastOneWellFormedStyling = detectWellMadeStyling(stylings);
    if (!atLeastOneWellFormedStyling) {
        return inputText;
    }

    console.log("prettyText58", inputText, stylings);
    let splitUpTexts = getSubstringsWithInstructions(inputText, stylings);
    // FIXME: what if we have special chunks like sSSSs
    // ...where s = nonspecial, S = special. or SSSs
    // or sSSsSs or sSsSSs ... need a more generalized algo.

    // { special: false, value: initSlice }
    // { special: true, value: specialMiddleSlice, stylings: stylings[0] },
    console.log(splitUpTexts, stylings, 48);
    let chunks = splitUpTexts.map((chunk, index) => {
        console.log(68, chunk, chunk.value);
        if (chunk.special) {
            // console.log(66, availableStylings, chunk);
            if (chunk.numberOfStylings > 1) {
                let availableStylings = chunk.stylings.split(", ").join(" .");
                console.log(73, availableStylings, chunk);
                return (
                    <span key={index} className={`${availableStylings} `}>
                        {chunk.value}
                    </span>
                );
            } else {
                let availableStylings = chunk.stylings;
                console.log(80, availableStylings);
                return (
                    <span key={index} className={`${availableStylings}`}>
                        {chunk.value}
                    </span>
                );
            }
        } else {
            return <span key={index}>{chunk.value}</span>;
        }
    });
    return chunks; //
}

export function handleJustOneStyling(inputText, styling) {
    let initSlice = inputText.slice(0, styling.start);
    let specialMiddleSlice = inputText.slice(styling.start, styling.end);
    let endSlice = inputText.slice(styling.end, inputText.length);
    // console.log(initSlice, specialMiddleSlice, endSlice);
    return [
        {
            special: false,
            value: initSlice,
        },
        {
            special: true,
            value: specialMiddleSlice,
            stylings: styling.stylings,
            numberOfStylings: countStylingsBasedOnCommas(styling.stylings),
        },
        {
            special: false,
            value: endSlice,
        },
    ];
}

export function countStylingsBasedOnCommas(stylings) {
    /* 
    // pass the VALUE of stylings.stylings, not the stylings object.
    // return value - the length of the stylings
    */

    // FIXME: should this function receive ["bgColor, bold"] or ... "bgColor, bold"
    // changed stylings to stylings[0] ... but maybe it should be "bold, italics"
    if (typeof stylings !== undefined) {
        if (stylings[0].includes(",")) {
            return stylings[0].split(", ").length;
        } else {
            return 1; // because if no "," then stylings is length 1
        }
    }
}

export function getSubstringsWithInstructions(inputText, preprocessedStylings) {
    /*
    // inputText - self explanatory
    // preprocessedStylings - array. it may be that the user has supplied 0, 1, 2, or 3 stylings.
    // ...this function's role is to sort out how many substrings we'll need.
    // for 0, we don't need any substrings.
    // for 1, we just need the substring that is encapsulated by the Styling.
    // for 2 or 3, a loop makes sense, though barely!
    // return value - should be an array of strings that can be combined using prettyText
    */

    /* template */
    // special: true,
    // value: slice,
    // stylings: stylings[0].stylings,
    // numberOfStylings: countStylingsBasedOnCommas(
    //                      stylings[0].stylings
    //                      ),

    // todo: only splice if there is a styling attached to the stylings obj // delete if here on dec 20th
    let stylings = [];
    preprocessedStylings.forEach((styling) => {
        // get rid of the empty styling objects. could go from 3 down to 1.

        if (typeof styling.stylings === "undefined") {
            // ...
            console.log(
                126,
                styling.stylings,
                " did not have a styling attached!"
            );
        } else {
            console.log(133, "pushing ", styling);
            stylings.push(styling);
        }
    });
    let stringsWithInstructions = [];

    // handle case where Stylings is only 1 singular Styling
    if (stylings.length === 1) {
        return handleJustOneStyling(inputText, stylings[0]);
    }

    // if 2 or 3 ... almost want to write it out by hand...
    if (detectIsStylingsEmpty(stylings)) {
        return inputText;
    }

    let initSlice = {
        special: false,
        value: inputText.slice(0, stylings[0].start),
    };
    if (stylings.length > 0) {
        stringsWithInstructions.push(initSlice);
    }
    // fixme: if end is before start, use end as start and start as end. its not a big deal.
    // priority: high!
    // fixme: also the sliders ranges have to be unmessed from their current messy bugged state
    for (let i = 0; i < stylings.length; i++) {
        let weAreOnTheLastStyling = i === stylings.length - 1;

        if (weAreOnTheLastStyling) {
            let slice = inputText.slice(stylings[i].start, stylings[i].end); // will go from i to end of string

            slice = {
                special: true,
                value: slice,
                stylings: stylings[i].stylings,
                numberOfStylings: countStylingsBasedOnCommas(
                    stylings[i].stylings
                ),
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
                stylings: stylings[i].stylings,
                numberOfStylings: countStylingsBasedOnCommas(
                    stylings[i].stylings
                ),
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
    // practical question: Which is more satisfying to see engagement wise, 999k or 999.9k? 999.9m or 999m?
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
            return stringVer.slice(0, 1) + "." + stringVer.slice(1, 2) + "m";
        }
        const lengthPreDecimal = stringVer.length - 6; // 6: slice off the 0's in 13,000,000, for instance
        const decimal = stringVer.slice(lengthPreDecimal, lengthPreDecimal + 1);
        // let puttingItTogether =
        console.log(stringVer, lengthPreDecimal, decimal);
        return (
            stringVer.slice(0, lengthPreDecimal) +
            "." +
            stringVer.slice(lengthPreDecimal, decimal) +
            "m"
        );
    } else {
        // don't ever expect a billion but maybe some day...
        // console.log("wow!");
        return stringVer.slice(0, 1) + "." + stringVer.slice(1, 3) + "b";
    }
}

export function processMin(index, sourceOfMin, contentLength) {
    /*
    // per Styling, min is as follows: 
    // (1) srcOfMin === 0, 
    // (2) end of first style *if* it exists, otherwise content.length
    // (3) end of second style *if* it exists, otherwise content.length;
    // returns: the index's assigned minimum value
    */

    if (index === 0) {
        return 0;
    } else if (index === 1) {
        if (sourceOfMin) {
            return sourceOfMin;
        } else {
            return contentLength;
        }
    } else if (index === 2) {
        if (sourceOfMin) {
            return sourceOfMin;
        } else {
            return contentLength;
        }
    }
}

export function processMax(index, sourceOfMax, contentLength) {
    /*
    // this is the maximum value available for the given index. per Styling, max is as follows: 
    // (1) start of second style *if* it exists; otherwise, contentLength 
    // (2) start of third style *if* it exists; otherwise, contentLength.
    // (3) srcOfMax === contentLength;
    // returns: the index's assigned minimum value
    */
    if (index === 0) {
        if (sourceOfMax) {
            return sourceOfMax;
        } else {
            return contentLength;
        }
    } else if (index === 1) {
        if (sourceOfMax) {
            return sourceOfMax;
        } else {
            return contentLength;
        }
    } else if (index === 2) {
        if (sourceOfMax) {
            return sourceOfMax;
        } else {
            return contentLength;
        }
    }
}
