export function enterCustomStyling(inputText, stylings) {
    // stylings is an array of Styling objects
    // console.log(70, stylings, typeof stylings);
    let oddsAreSpecial = true;
    if (stylings[0].start === 0) {
        // special condition
        oddsAreSpecial = false;
    }
    let splitUpTexts = getSubstrings(inputText, stylings);
    let chunks = splitUpTexts.map((chunk, index) => {
        // have to do this math to turn the splitUpTexts index into the stylings index
        if (index % 2 === 0) {
            // console.log(14, index);
            return <span key={index}>{chunk}</span>;
        } else {
            // let stylingChoice = index;
            console.log(18, index, stylings);
            let indexSelection = Math.floor(index / 2);
            let availableStyles;
            if (stylings[indexSelection].className.includes(",")) {
                availableStyles =
                    stylings[indexSelection].className.split(", ");
                console.log(
                    25,
                    "specialChoice:",
                    availableStyles,
                    indexSelection,
                    index
                );
                return (
                    <span
                        key={index}
                        className={`${availableStyles.join(" ")}`}
                    >
                        {chunk}
                    </span>
                );
            } else {
                availableStyles = stylings[indexSelection].className;
                console.log(
                    39,
                    "specialChoice:",
                    availableStyles,
                    indexSelection,
                    index
                );
                return (
                    <span key={index} className={`${availableStyles}`}>
                        {chunk}
                    </span>
                );
            }
        }
    });
    return chunks; // works as of 3:48 pm
}

function getSubstrings(inputText, stylings) {
    let strings = [];
    /// cycle
    let initSlice = inputText.slice(0, stylings[0].start);
    if (stylings.length > 0) {
        strings.push(initSlice);
    }
    for (let i = 0; i < stylings.length; i++) {
        let weAreOnTheLastStyling = i === stylings.length - 1;
        if (weAreOnTheLastStyling) {
            let slice = inputText.slice(stylings[i].start, stylings[i].end); // will go from i to end of string
            strings.push(slice);
            let trailEnd = inputText.slice(stylings[i].end); // will be the trailing but
            strings.push(trailEnd);
        } else {
            let slice = inputText.slice(stylings[i].start, stylings[i].end);
            strings.push(slice);
            let theNormalPartInBetween = inputText.slice(
                stylings[i].end,
                stylings[i + 1].start
            );
            strings.push(theNormalPartInBetween);
        }
    }
    console.log(strings);
    return strings;
    /// cycle
    // a = inputString.slice(locationCodes[0], locationCodes[1]);
    // strings.push(a);
    // // cycle
    // a = inputString.slice(locationCodes[1], locationCodes[2]);
    // strings.push(a);
    // a = inputString.slice(locationCodes[2], locationCodes[3]);
    // strings.push(a);
    // //
    // a = inputString.slice(locationCodes[3]);
    // strings.push(a);
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
