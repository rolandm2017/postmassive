export function enterCustomStylingCodes(inputText, locationCodes, stylings) {
    let plainTextChunks = [];
    let specialTextChunks = [];
    // const finalIndexForInputText = inputText.length
    for (let i = 0; i < locationCodes.length; i++) {
        if (i % 2 === 1) {
            plainTextChunks.push(
                inputText.substring(locationCodes[i], locationCodes[i + 1])
            );
        } else {
            specialTextChunks.push(
                inputText.substring(locationCodes[i], locationCodes[i + 1])
            );
        }
        // will find edge cases as I go
    }
    let specialTextChunksWithStyling;
    if (specialTextChunks.length > 0) {
        let specialTextChunksWithStyling = specialTextChunks.map(
            (chunk, index) => {
                return <span className={`${stylings[index]}`}>{chunk}</span>;
            }
        );
        let numberOfChunks = locationCodes.length; // should be ... [3, 5] yields 3 chunks: start, special, end.
        let returnedString = [];
        for (let i = 0; i < numberOfChunks; i++) {
            returnedString.push(plainTextChunks[i]);
            returnedString.push(specialTextChunksWithStyling[i]);
        }
        return returnedString.join(" ");
    } else {
        return undefined;
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
