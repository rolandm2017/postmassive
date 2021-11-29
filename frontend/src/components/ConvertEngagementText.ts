export function convertEngagementText(inputNum: number): string {
    // practical question: Which is more satisfying to see engagement wise, 999k or 999.9k? 999.9m or 999m?
    // will receive views and likes in the millions.
    // convert 10,000-999,999 -> 10.0k - 999.9k
    // 1,000,000 to 999m -> 1.00m - 999.9m
    const lengthOfSingleDigitThousands: number = String(1000).length;
    const lengthOfSingleDigitMillions: number = String(1000 * 1000).length;
    const stringVer: string = String(inputNum);

    if (inputNum < 1000) {
        return String(inputNum);
    } else if (inputNum < 1000000) {
        // thousands
        if (stringVer.length === lengthOfSingleDigitThousands) {
            // single digit thousands, special case
            return stringVer.slice(0, 1) + "." + stringVer.slice(1, 2);
        }
        const lengthPreDecimal: number = stringVer.length - 3;
        const decimal: any = stringVer.slice(lengthPreDecimal, lengthPreDecimal + 1);
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
        const lengthPreDecimal: number = stringVer.length - 6; // 6: slice off the 0's in 13,000,000, for instance
        const decimal: any = stringVer.slice(lengthPreDecimal, lengthPreDecimal + 1);
        // let puttingItTogether =
        // console.log(stringVer, lengthPreDecimal, decimal);
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
