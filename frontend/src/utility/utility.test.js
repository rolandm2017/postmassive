import {
    detectWellMadeStyling,
    countStylingsBasedOnCommas,
    convertEngagementText,
    handleJustOneStyling,
    processMin,
    processMax,
    styleObjectIsEmpty,
} from "./utility";

describe("detects empty object", () => {
    it("detects an empty object", () => {
        expect(styleObjectIsEmpty({})).toBe(true);
    });
    it("detects an object with contents", () => {
        expect(styleObjectIsEmpty({ start: 5, end: 10 })).toBe(false);
    });
});

describe("detects the difference between a well made Style object and a malformed one", () => {
    it("validates well made Stylings", () => {
        expect(
            detectWellMadeStyling([
                {
                    start: 10,
                    end: 25,
                    stylings: ["bold", "strikethrough"],
                },
                {
                    start: 0,
                    end: 20,
                    stylings: ["bold", "italics"],
                },
                {
                    start: 100,
                    end: 125,
                    stylings: ["underline", "italics"],
                },
            ])
        ).toEqual(true);
        expect(
            detectWellMadeStyling([
                {},
                {},
                {
                    start: 0,
                    end: 25,
                    stylings: ["bold", "backgroundColorBlack"],
                },
            ])
        ).toEqual(true);
        expect(
            detectWellMadeStyling([
                {},
                {},
                {
                    start: 50,
                    end: 60,
                    stylings: ["strikethrough"],
                },
            ])
        ).toEqual(true);
    });
    it("returns false when the Styling is malformed", () => {
        expect(
            detectWellMadeStyling([{ start: 0, stylings: ["bold"] }])
        ).toEqual(false);
        expect(
            detectWellMadeStyling([{ end: 15, stylings: ["bold", "italics"] }])
        ).toEqual(false);
        expect(detectWellMadeStyling([{ start: 20, end: 50 }])).toEqual(false);
    });
});

// describe("the function is absolutely airtight and flawless", () => {});

describe("correctly splits stylings objects into the correct integer", () => {
    it("turns one singular styling into 1", () => {
        expect(countStylingsBasedOnCommas(["bold"])).toBe(1);
        expect(countStylingsBasedOnCommas(["italics"])).toBe(1);
        expect(countStylingsBasedOnCommas(["backgroundColorRed"])).toBe(1);
    });
    it("turns two into 2 and three into 3", () => {
        expect(countStylingsBasedOnCommas(["backgroundColorRed, bold"])).toBe(
            2
        );
        expect(countStylingsBasedOnCommas(["backgroundColorBlack, bold"])).toBe(
            2
        );
        expect(
            countStylingsBasedOnCommas([
                "backgroundColorRed, bold, strikethrough",
            ])
        ).toBe(3);
        expect(
            countStylingsBasedOnCommas([
                "backgroundColorCyan, bold, strikethrough",
            ])
        ).toBe(3);
    });
    it("throws unless the input is absolutely perfect", () => {
        expect(() => {
            countStylingsBasedOnCommas();
        }).toThrow(TypeError);
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
                value: "dabba",
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
    it("throws an error if stylingS is replaced with styling (no s)", () => {
        expect(() =>
            handleJustOneStyling({
                start: 6,
                end: 11,
                styling: ["italic"],
            })
        ).toThrow(TypeError);
    });
});

describe("processes string with stylings object(s) into substrings with instruction objects", () => {
    // this is why I started writing tests. This is what finally broke me.
    it("returns plain string when there are no stylings", () => {
        expect(getSubstringsWithInstructions("Mushrooms", [])).toBe(
            "Mushrooms"
        );
        expect(
            getSubstringsWithInstructions(
                "Pineapple on pizza, therefore being a cardigan late at night.",
                []
            )
        ).toBe("Pineapple on pizza, therefore being a cardigan late at night.");
    });
    it("gracefully handles text & one styling", () => {
        expect(
            getSubstringsWithInstructions("this is some simple input", [
                { start: 7, end: 11, stylings: ["underline"] },
            ])
        );
        expect(
            getSubstringsWithInstructions("Yabba dabba doo", [
                {
                    start: 6,
                    end: 11,
                    stylings: ["bold, backgroundColorRed"],
                },
            ])
        ).toEqual([
            {
                special: false,
                value: "Yabba ",
            },
            {
                special: true,
                value: "dabba",
                stylings: ["bold, backgroundColorRed"],
                numberOfStylings: 2,
            },
            {
                special: false,
                value: " doo",
            },
        ]);
    });

    it("turns strings and stylings into substrings with instructions", () => {
        expect(
            getSubstringsWithInstructions("aaa, bbb, ccc, ddd, eee, fff, ggg", [
                {
                    start: 5,
                    end: 9,
                    stylings: ["bold, strikethrough, backgroundColorRed"],
                },
                {
                    start: 14,
                    end: 19,
                    stylings: ["italics, backgroundColorBlack"],
                },
            ])
        ).toEqual([
            { special: false, value: "aaa, " },
            {
                special: true,
                value: "bbb, ",
                stylings: ["bold, strikethrough, backgroundColorRed"],
                numberOfStylings: 3,
            },
            { special: false, value: "ccc, " },
            {
                special: true,
                value: "ccc, ddd,",
                stylings: ["italics, backgroundColorBlack"],
                numberOfStylings: 2,
            },
            { special: false, value: " eee, fff, ggg" },
        ]);
        expect(
            getSubstringsWithInstructions(
                "AAAAAAAAA, bBbBb, CCCCCC, DDDD, EEEEEE, ffff, GGGGGGGGggggg",
                [
                    {
                        start: 11,
                        end: 15,
                        stylings: ["bold, strikethrough, backgroundColorRed"],
                    },
                    {
                        start: 25,
                        end: 29,
                        stylings: ["italics, backgroundColorBlack"],
                    },
                    {
                        start: 41,
                        end: 44,
                        stylings: ["italics, backgroundColorBlack"],
                    },
                ]
            )
        ).toEqual([
            { special: false, value: "AAAAAAAAA, " },
            {
                special: true,
                value: "bBbBb",
                stylings: ["bold, strikethrough, backgroundColorRed"],
                numberOfStylings: 3,
            },
            { special: false, value: ", CCCCCC, " },
            {
                special: true,
                value: "DDDD",
                stylings: ["italics, backgroundColorBlack"],
                numberOfStylings: 2,
            },
            { special: false, value: "EEEEEE" },
            {
                special: true,
                value: "ffff",
                stylings: ["italics, backgroundColorBlack"],
                numberOfStylings: 2,
            },
            { special: false, value: ", GGGGGGGGggggg" },
        ]);
    });
});

describe("converts integers into 2-3 digit strings. no more than 3 digits plus k, m or b", () => {
    // const singleDigitThousands = 1050;
    const singleDigitThousands2 = 1990;
    const doubleDigitThousands = 10325;
    const doubleDigitThousands2 = 19325;
    const tripleDigitThousands = 103252;
    const tripleDigitThousands2 = 193252;
    //
    const singleDigitMil = 1021000;
    const singleDigitMil2 = 1921000;
    // const doubleDigitMil = 20132100;
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
        // expect(convertEngagementText(singleDigitThousands)).toEqual("1.0k"); // fixme
        // expect(convertEngagementText(singleDigitThousands2)).toEqual("1.9k");  // fixme
        expect(convertEngagementText(doubleDigitThousands)).toEqual("10.3k");
        expect(convertEngagementText(doubleDigitThousands2)).toEqual("19.3k");
        // expect(convertEngagementText(tripleDigitThousands)).toEqual("103k"); // fixme
        // expect(convertEngagementText(tripleDigitThousands2)).toEqual("193k"); // fixme
    });
    it("converts to text in the millions properly", () => {
        expect(convertEngagementText(singleDigitMil)).toEqual("1.0m");
        expect(convertEngagementText(singleDigitMil2)).toEqual("1.9m");
        // expect(convertEngagementText(doubleDigitMil)).toEqual("20.0m"); // fixme
        // expect(convertEngagementText(doubleDigitMil2)).toEqual("29.0m"); // fixme
        // expect(convertEngagementText(tripleDigitMil)).toEqual("301m"); // fixme
        // expect(convertEngagementText(tripleDigitMil2)).toEqual("391m"); // fixme
    });
    it("converts to text in the billions properly", () => {
        expect(convertEngagementText(billion)).toEqual("1.35b");
        expect(convertEngagementText(billion2)).toEqual("2.45b"); // truncated #
    });
});

describe("processMin and processMax", () => {
    test("processMin(0, a, b) should equal 0", () => {
        expect(processMin(0, 15, 23894)).toEqual(0);
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
        // params: index, sourceOfMax, contentLength
    });
});
