import {
    convertEngagementText,
    handleJustOneStyling,
    processMin,
    processMax,
} from "./utility";

describe("handles one singular Styling object and its surrounding text, processing it into 3 instructions", () => {
    it("handles one styling just fine", () => {
        handleJustOneStyling("Yabba dabba doo", {
            start: 6,
            end: 11,
            stylings: ["bold, backgroundColorRed"],
        });
    });

    it("throws an error if stylingS is replaced with styling (no s)", () => {
        expect(
            handleJustOneStyling(
                "This object should throw an error for lacking a plural",
                {
                    start: 6,
                    end: 11,
                    styling: ["italic"],
                }
            )
        ).toThrow();
    });
});

// describe("processes string with stylings object(s) into substrings with instruction objects", () => {
//     // this is why I started writing tests. This is what finally broke me.
//     it("scares me");
// });

describe("convertEngagementText", () => {
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
        expect(convertEngagementText(singleDigitThousands).toEqual("1.0k"));
        expect(convertEngagementText(singleDigitThousands2).toEqual("1.9k"));
        expect(convertEngagementText(doubleDigitThousands).toEqual("10.3k"));
        expect(convertEngagementText(doubleDigitThousands2).toEqual("19.3k"));
        expect(convertEngagementText(tripleDigitThousands).toEqual("103k"));
        expect(convertEngagementText(tripleDigitThousands2).toEqual("193k"));
    });
    it("converts to text in the millions properly", () => {
        expect(convertEngagementText(singleDigitMil).toEqual("1.0m"));
        expect(convertEngagementText(singleDigitMil2).toEqual("1.9m"));
        expect(convertEngagementText(doubleDigitMil).toEqual("20m"));
        expect(convertEngagementText(doubleDigitMil2).toEqual("29m"));
        expect(convertEngagementText(tripleDigitMil).toEqual("301m"));
        expect(convertEngagementText(tripleDigitMil2).toEqual("391m"));
    });
    it("converts to text in the billions properly", () => {
        expect(convertEngagementText(billion).toEqual("1.35b"));
        expect(convertEngagementText(billion2).toEqual("2.46b"));
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
    test("processMax(0, 15, 25) should equal 25", () => {
        expect(processMax(0, 15, 25)).toEqual(25);
    });
    test("processMax(1, 15, 25) should equal 25", () => {
        expect(processMax(1, 15, 25)).toEqual(25);
    });
    test("processMax(2, 15, 25) should equal 25", () => {
        expect(processMax(2, 15, 25)).toEqual(25);
    });
});
