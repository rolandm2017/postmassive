import {
    convertEngagementText,
    handleJustOneStyling,
    processMin,
    processMax,
} from "./utility";

describe("correctly splits stylings objects into the correct integer", () => {
    it("turns one singular styling into 1", () => {
        expect(countStylingsBasedOnCommas("bold")).toBe(1);
        expect(countStylingsBasedOnCommas("italics")).toBe(1);
        expect(countStylingsBasedOnCommas("backgroundColorRed")).toBe(1);
    });
    it("turns two into 2 and three into 3", () => {
        expect(countStylingsBasedOnCommas("backgroundColorRed, bold")).toBe(2);
        expect(countStylingsBasedOnCommas("backgroundColorBlack, bold")).toBe(
            2
        );
        expect(
            countStylingsBasedOnCommas(
                "backgroundColorRed, bold, strikethrough"
            )
        ).toBe(3);
        expect(
            countStylingsBasedOnCommas(
                "backgroundColorCyan, bold, strikethrough"
            )
        ).toBe(3);
    });
});

describe("handles a singular Styling object & surrounding text, processing it into 3 instructions", () => {
    it("handles one styling just fine", () => {
        expect(
            handleJustOneStyling("Yabba dabba doo", {
                start: 6,
                end: 11,
                stylings: ["bold, backgroundColorRed"],
            })
        ).toEqual([
            {
                special: false,
                value: "Yabba ",
            },
            {
                special: true,
                value: " dabba",
                stylings: ["bold, backgroundColorRed"],
                numberOfStylings: 2,
            },
            {
                special: false,
                value: " doo",
            },
        ]);
        expect(
            handleJustOneStyling("ABCDEFG GFEDCBA ABC DEF", {
                start: 8,
                end: 16,
                stylings: ["backgroundColorBlack"],
            })
        ).toEqual([
            {
                special: false,
                value: "ABCDEFG ",
            },
            {
                special: true,
                value: "GFEDCBA ",
                stylings: ["backgroundColorBlack"],
                numberOfStylings: 1,
            },
            {
                special: false,
                value: "ABC DEF",
            },
        ]);
    });
    // it("throws an error if stylingS is replaced with styling (no s)", () => {
    //     expect(() =>
    //         handleJustOneStyling({
    //             start: 6,
    //             end: 11,
    //             styling: ["italic"],
    //         })
    //     ).toThrow(TypeError);
    // });
});

// // describe("processes string with stylings object(s) into substrings with instruction objects", () => {
// //     // this is why I started writing tests. This is what finally broke me.
// //     it("scares me");
// // });

describe("converts integers into 2-3 digit strings. no more than 3 digits plus k, m or b", () => {
    const singleDigitThousands = 1050;
    const singleDigitThousands2 = 1990;
    const doubleDigitThousands = 10325;
    const doubleDigitThousands2 = 19325;
    const tripleDigitThousands = 103252;
    const tripleDigitThousands2 = 193252;
    //
    const singleDigitMil = 1021000;
    const singleDigitMil2 = 1921000;
    const doubleDigitMil = 20132100;
    const doubleDigitMil2 = 29132100;
    const tripleDigitMil = 301321000;
    const tripleDigitMil2 = 391321000;
    //
    const billion = 1357222111;
    const billion2 = 2457222111;
    //
    it("converts to text in the thousands properly", () => {
        // remember, if this is wrong, the test is wrong, *probably*. you gotta check.
        // pretty sure I'm *truncating*, not rounding.
        // just be consistent: truncate or round?

        // EDIT2: can fix bugs but its low priority
        expect(convertEngagementText(singleDigitThousands)).toEqual("1.0k");
        expect(convertEngagementText(singleDigitThousands2)).toEqual("1.9k");
        expect(convertEngagementText(doubleDigitThousands)).toEqual("10.3k");
        expect(convertEngagementText(doubleDigitThousands2)).toEqual("19.3k");
        expect(convertEngagementText(tripleDigitThousands)).toEqual("103k");
        expect(convertEngagementText(tripleDigitThousands2)).toEqual("193k");
    });
    it("converts to text in the millions properly", () => {
        expect(convertEngagementText(singleDigitMil)).toEqual("1.0m");
        expect(convertEngagementText(singleDigitMil2)).toEqual("1.9m");
        expect(convertEngagementText(doubleDigitMil)).toEqual("20.0m");
        expect(convertEngagementText(doubleDigitMil2)).toEqual("29.0m");
        expect(convertEngagementText(tripleDigitMil)).toEqual("301m");
        expect(convertEngagementText(tripleDigitMil2)).toEqual("391m");
    });
    it("converts to text in the billions properly", () => {
        expect(convertEngagementText(billion)).toEqual("1.35b");
        expect(convertEngagementText(billion2)).toEqual("2.45b"); // truncated #
    });
});

describe("processMin and processMax", () => {
    test("processMin(0, a, b) should equal 0", () => {
        expect(processMin(0, 15, 342942342394)).toEqual(0);
    });
    test("processMin(1, 5, 15) should equal 5", () => {
        expect(processMin(1, 5, 15)).toEqual(5);
    });
    test("processMin(1, undefined, 15) should equal 15", () => {
        expect(processMin(1, undefined, 15)).toEqual(15);
    });

    // max
    test("processMax should return the contentLength when there is no defined 2nd arg", () => {
        expect(processMax(0, undefined, 25)).toEqual(25);
    });
    test("processMax takes the value of the sourceOfMax when it is present", () => {
        expect(processMax(1, 15, 25)).toEqual(15);
        expect(processMax(2, 15, 25)).toEqual(15);
    });
});
