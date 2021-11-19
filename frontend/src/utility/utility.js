export function enterCustomStyling2(inputText, locationCodes, stylings) {
    console.log(
        2,
        "########\nSTART\n##########",
        inputText.substring(0, 40),
        locationCodes,
        stylings
    );
    let plainTextChunks = [];
    let specialTextChunks = [];
    // const finalIndexForInputText = inputText.length
    for (let i = 0; i < locationCodes.length; i++) {
        if (i % 2 === 1) {
            let plainSubstring = inputText.substring(
                locationCodes[i],
                locationCodes[i + 1]
            );
            console.log(12, plainSubstring);
            plainTextChunks.push(plainSubstring);
        } else {
            let specialSubstring = inputText.substring(
                locationCodes[i],
                locationCodes[i + 1]
            );
            console.log(19, specialSubstring);
            specialTextChunks.push(specialSubstring);
        }
        // will find edge cases as I go
    }
    console.log(18, plainTextChunks, specialTextChunks);
    if (specialTextChunks.length > 0) {
        // process text into JSX
        let overallIndex = 0;
        let normalTextChunks = plainTextChunks.map((chunk, index) => {
            overallIndex = overallIndex + 1;
            return <span key={overallIndex}>{chunk}</span>;
        });
        let specialTextChunksWithStyling = specialTextChunks.map(
            (chunk, index) => {
                overallIndex = overallIndex + 1;
                return (
                    <span key={overallIndex} className={`${stylings[0]}`}>
                        {chunk}
                    </span>
                );
            }
        );
        // handle reprocess into one singular array
        let numberOfChunks = locationCodes.length; // should be ... [3, 5] yields 3 chunks: start, special, end.
        let returnedString = [];
        for (let i = 0; i < numberOfChunks; i++) {
            // loop over ith iteration in each array at a time (trusting they will both be equal length)
            let plainTextToAdd = normalTextChunks[i];
            let speciallyStyledText = specialTextChunksWithStyling[i];
            // returnedString.push(plainTextToAdd);
            returnedString.push(plainTextToAdd);
            returnedString.push(speciallyStyledText);
            // todo: insert keys, i, i + numberOfChunks
        }
        console.log(31, returnedString);
        return returnedString;
    } else {
        throw "error!!!";
        return undefined;
    }
}

export function enterCustomStyling(inputText, locationCodes, stylings) {
    let oddsAreSpecial = true;
    if (locationCodes[0] === 0) {
        // special condition
        oddsAreSpecial = false;
    }
    let splitUpTexts = getSubstrings(inputText, locationCodes);
    let normalTextChunks = splitUpTexts.map((chunk, index) => {
        if (index % 2 === 0) {
            return <span key={index}>{chunk}</span>;
        } else {
            return (
                <span key={index} className={`${stylings[0]}`}>
                    {chunk}
                </span>
            );
        }
    });
    let specialTextChunksWithStyling = specialTextChunks.map((chunk, index) => {
        overallIndex = overallIndex + 1;
    });
}

function getSubstrings(inputText, locationCodes) {
    let strings = [];
    /// cycle
    let slice = inputText.slice(0, locationCodes[0]);
    strings.push(slice);
    for (let i = 0; i < locationCodes.length; i++) {
        if (i === locationCodes.length - 1) {
            let slice = inputText.slice(locationCodes[i]); // will go from i to end of string
            strings.push(slice);
        } else {
            let slice = inputText.slice(locationCodes[i], locationCodes[i + 1]);
            strings.push(slice);
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

function getSubstrings2(inputText, locationCodes) {
    let substrings = [];
    if (locationCodes[0] === 0) {
        // have to handle [0, 10, 40, 65, 110] diff than ...
        for (let i = 0; i < locationCodes.length; i++) {
            let substring = inputText.slice(
                locationCodes[i],
                locationCodes[i + 1]
            );
            console.log(substring);
            substrings.push(substring);
        }
        return substrings;
    } else {
        // [20, 25, 40, 45, 80, 100]
        for (let i = 0; i < locationCodes.length; i++) {
            let substring;
            if (i === 0) {
                let firstSlice = locationCodes[i];
                substring = inputText.slice(0, firstSlice);
            } else {
                let startOfSlice = locationCodes[i];
                let endOfSlice = locationCodes[i + 1];
                substring = inputText.slice(startOfSlice, endOfSlice);
            }
            substrings.push(substring);
        }
        console.log(substrings, 96);
        return substrings;
    }
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
