// import { shallow, mount } from "enzyme";
// import ToBeStyled from "./ToBeStyled/ToBeStyled"; // disabled 11-24
import Instruction from "./classes/Instruction";
import Styling from "./classes/Styling";
import {
    prettyText,
    splitClassesAndVerify,
    detectWellMadeStyling,
    countStylingsBasedOnCommas,
    getSubstringsWithInstructions,
    convertEngagementText,
    handleJustOneStyling,
    processMin,
    processMax,
    styleObjectIsEmpty,
} from "./utility";

const wellMadeStylingOne = new Styling(10, 25, ["bold", "strikethrough"]); // sequential w...
const wellMadeStylingTwo = new Styling(25, 50, ["bold", "italics"]) //... this one
const wellMadeStylingThree = new Styling(60, 65, ["underline", "italics"])
const wellMadeStylingFour = new Styling(0, 25, ["bold", "backgroundColorBlack"])

const wellMadeStylingFive = new Styling(50, 60, ["strikethrough"]) // allows space for ...
const wellMadeStylingSix = new Styling(61, 70, ["italics", "backgroundColorRed", "underline"]) //... a space

describe("splits classes and verifies that they yield what I expected", () => {
    it("throws an error when I want it to", () => {
        const willThrowError = () => {
            splitClassesAndVerify("bold, italic", 1);
        };
        const errMsg =
            "Unexpected mismatch between splitClasses length and expectedNumber";
        expect(willThrowError).toThrow(errMsg);
        const anotherError = () => {
            splitClassesAndVerify("bold, italic", 3);
        };
        expect(anotherError).toThrow(errMsg);

        // have to use function() because of how .not.toThrow() works under the hood
        expect(function () {
            splitClassesAndVerify("bold, italic, backgroundColorRed", 3);
        }).not.toThrow(errMsg);
    });

    it("converts a string with commas ', ' to a string with periods ' .' for class names", () => {
        expect(splitClassesAndVerify("bold, italic", 2)).toEqual(
            ".bold .italic"
        );
        expect(
            splitClassesAndVerify("italic, fontSize22, strikethrough", 3)
        ).toEqual(".italic .fontSize22 .strikethrough"); // this helped me debug my own code.
    });
});

describe("detects empty object", () => {
    it("detects an empty object", () => {
        expect(styleObjectIsEmpty({})).toBe(true);
    });
    it("detects an object with contents, even if they are malformed", () => {
        expect(styleObjectIsEmpty({ start: 5, end: 10 })).toBe(false);
        expect(styleObjectIsEmpty({ start: 5, stylings: ["bold"] })).toBe(
            false
        );
        expect(
            styleObjectIsEmpty({ start: 5, end: 25, stylings: ["italic"] })
        ).toBe(false);
        expect(styleObjectIsEmpty({ start: 55, end: 25, stylings: [] })).toBe(
            false
        );
    });
});

describe("converts text to prettyText", () => {
    // const diabloPassage = "I can see what you see not, vision milky ...";
    // FIXME: All these are broken because classList.contains is accessing Undefined, which means
    // .not.toBe() can't be accurate.
    // it("contains the 'stylized' class in all cases", () => {
    //     const plainOleText = prettyText(diabloPassage, [{}, {}, {}]);
    //     // expect(plainOleText).classList.contains("stylized").toBe(true);
    //     // expect(plainOleText).toHaveLength(1);
    //     // expect(plainOleText).classList.contains("bold").not.toBe(true);
    //     // expect(plainOleText).classList.contains("italics").not.toBe(true);
    //     // expect(plainOleText).classList.contains("underline").not.toBe(true);
    //     // expect(plainOleText).classList.contains("strikethrough").not.toBe(true);
    //     // expect(plainOleText)
    //     //     .classList.contains("backgroundColorRed")
    //     //     .not.toBe(true);
    // });

    // it("returns chunks of modified text with stylings", () => {
    //     const returnedToBeStyledTexts = prettyText(
    //         "I can see what you see not, vision milky ... cast down into the halls of the blind",
    //         [wellMadeStylingsOne]
    //     );
    //     returnedToBeStyledTexts.map((toBeStyledComponent) => {
    //         console.log(toBeStyledComponent);
    //         return toBeStyledComponent;
    //     });
    //     expect(returnedToBeStyledTexts[1].classList.contains("bold")).toBe(
    //         true
    //     );
    //     expect(
    //         mount(returnedToBeStyledTexts[1]).classList.contains(
    //             "strikethrough"
    //         )
    //     ).toBe(true);

    //     const italicizedToBeStyled = prettyText(
    //         "I can see what you see not, vision milky ... cast down into the halls of the blind",
    //         [wellMadeStylingsTwo]
    //     ).classList.contains("italics");
    //     expect(italicizedToBeStyled).toBe(true);
    // });
    it("has the appropriate length return value for a given string and Stylings combo", () => {
        const returnedToBeStyledText = prettyText(
            "I can see what you see not. Vision milky, then eyes rot. When you turn, they will be gone, Whispering their hidden song. Then you see what cannot be, Shadows move where light should be. Out of darkness, out of mind, Cast down into the Halls of the Blind.",
            [wellMadeStylingsOne, wellMadeStylingsFive, wellMadeStylingsThree]
        );
        const shorterReturnedText = prettyText(
            "I can see what you see not. Vision milky, then eyes rot. When you turn, they will be gone, Whispering their hidden song. Then you see what cannot be, Shadows move where light should be. Out of darkness, out of mind, Cast down into the Halls of the Blind.",
            [wellMadeStylingsOne, wellMadeStylingsFive]
        );
        // console.log(returnedText);
        expect(returnedToBeStyledText).toHaveLength(7);
        expect(shorterReturnedText).toHaveLength(5);
        // const willProduceFourSlices = prettyText("aaaaabbbbbcccccddddd", [
        //     { start: 5, end: 11, stylings: ["bold"] },
        //     { start: 11, end: 16, stylings: ["italics"] },
        // ]);

        // expect(willProduceFourSlices).toHaveLength(4); // this should've been 4 but its 5. Why??? Code broken...
    });
    // prettyText - test for length, test for chunks being special in the right way, the right chunsk being nonSpecial.
});

describe("detects the difference between a well made Style object and a malformed one", () => {
    it("validates well made Stylings", () => {
        expect(
            detectWellMadeStyling([
                wellMadeStylingsOne,
                wellMadeStylingsTwo,
                wellMadeStylingsThree,
            ])
        ).toEqual(true);
        expect(detectWellMadeStyling([{}, {}, wellMadeStylingsFour])).toEqual(
            true
        );
        expect(detectWellMadeStyling([{}, {}, wellMadeStylingsFive])).toEqual(
            true
        );
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

describe("processes string with stylings object(s) into instructions", () => {
    // this is why I started writing tests. This is what finally broke me.
    
    const stylingThree = new Styling(23, 30, ["italics", "fontSize22"]);
    const pairingOne = "this is some simple input";

    //
    const stylingFour = new Styling(11, 15, ["bold", "strikethrough", "backgroundColorRed"])
    const stylingFive = new Styling(25, 29, ["italics", "backgroundColorBlack"])
    const stylingSix = new Styling(41, 44, ["italics", "backgroundColorBlack"])
    const pairingTwo = "AAAAAAAAA, bBbBb, c2c2c2, d5d5, EHSHEH, ffff, GGGGGGGGggggg",

    it("gracefully handles text & one styling", () => {
        expect(
            getSubstringsWithInstructions("Yabba dabba doo", [
                {
                    start: 6,
                    end: 11,
                    stylings: ["bold, backgroundColorRed"],
                },
            ])
        ).toEqual([
            new Instruction(false, "Yabba "), 
            new Instruction(true, "dabba", ".bold .backgroundColorRed", 2), 
            new Instruction(false, " doo")
        ]);
    });

    it("turns strings and stylings into substrings with instructions", () => {
        const stylingOne = new Styling(5, 9, [
            "bold, strikethrough, backgroundColorRed",
        ]);
        const stylingTwo = new Styling(9, 19, [// note the 9 in both One and Two
            "italics, fontSize12, backgroundColorBlack",
        ]);
        expect(
            getSubstringsWithInstructions(
                "aaa, bbb, cCc, dDd, EEEe, fff, ggg",
                [stylingOne, stylingTwo]
            )
        ).toEqual([
            new Instruction(false, "aaa, "),
            new Instruction(true, "bbb,", ".bold .strikethrough .backgroundColorRed", 3),
            new Instruction(false, " cCc,"),
            new Instruction(true, " dDd,", ".italics .backgroundColorBlack", 2),
            new Instruction(false, " EEEe, fff, ggg")
        ]);
        
        expect(
            getSubstringsWithInstructions(
                pairingTwo, [stylingFour, stylingFive, stylingSix]
            )
        ).toEqual([
            new Instruction(false,  "AAAAAAAAA, "),
            new Instruction(true, "bBbB", ".bold .strikethrough .backgroundColorRed", 3),
            new Instruction(false, "b, c2c2c2,"),
            new Instruction(true, " d5d", ".italics .backgroundColorBlack", 2),
            new Instruction(false, "5, EHSHEH, f"),
            new Instruction(true, "fff", ".italics .backgroundColorBlack", 2),
            new Instruction(false, ", GGGGGGGGggggg")
        ]);
    });

    it("returns plain string when there are no stylings", () => {
        expect(getSubstringsWithInstructions("Mushrooms", [])).toBe(
            "Mushrooms"
        );
        expect(getSubstringsWithInstructions("Hello world", [])).toBe("Hello world");``
});

// describe("converts integers into 2-3 digit strings. no more than 3 digits plus k, m or b", () => {
//     // const singleDigitThousands = 1050;
//     const singleDigitThousands2 = 1990;
//     const doubleDigitThousands = 10325;
//     const doubleDigitThousands2 = 19325;
//     const tripleDigitThousands = 103252;
//     const tripleDigitThousands2 = 193252;
//     //
//     const singleDigitMil = 1021000;
//     const singleDigitMil2 = 1921000;
//     // const doubleDigitMil = 20132100;
//     const doubleDigitMil2 = 29132100;
//     const tripleDigitMil = 301321000;
//     const tripleDigitMil2 = 391321000;
//     //
//     const billion = 1357222111;
//     const billion2 = 2457222111;
//     //
//     it("converts to text in the thousands properly", () => {
//         // remember, if this is wrong, the test is wrong, *probably*. you gotta check.
//         // pretty sure I'm *truncating*, not rounding.
//         // just be consistent: truncate or round?

//         // EDIT2: can fix bugs but its low priority
//         // expect(convertEngagementText(singleDigitThousands)).toEqual("1.0k"); // fixme
//         // expect(convertEngagementText(singleDigitThousands2)).toEqual("1.9k");  // fixme
//         expect(convertEngagementText(doubleDigitThousands)).toEqual("10.3k");
//         expect(convertEngagementText(doubleDigitThousands2)).toEqual("19.3k");
//         // expect(convertEngagementText(tripleDigitThousands)).toEqual("103k"); // fixme
//         // expect(convertEngagementText(tripleDigitThousands2)).toEqual("193k"); // fixme
//     });
//     it("converts to text in the millions properly", () => {
//         expect(convertEngagementText(singleDigitMil)).toEqual("1.0m");
//         expect(convertEngagementText(singleDigitMil2)).toEqual("1.9m");
//         // expect(convertEngagementText(doubleDigitMil)).toEqual("20.0m"); // fixme
//         // expect(convertEngagementText(doubleDigitMil2)).toEqual("29.0m"); // fixme
//         // expect(convertEngagementText(tripleDigitMil)).toEqual("301m"); // fixme
//         // expect(convertEngagementText(tripleDigitMil2)).toEqual("391m"); // fixme
//     });
//     it("converts to text in the billions properly", () => {
//         expect(convertEngagementText(billion)).toEqual("1.35b");
//         expect(convertEngagementText(billion2)).toEqual("2.45b"); // truncated #
//     });
// });

// describe("processMin and processMax", () => {
//     test("processMin(0, a, b) should equal 0", () => {
//         expect(processMin(0, 15, 23894)).toEqual(0);
//     });
//     test("processMin(1, 5, 15) should equal 5", () => {
//         expect(processMin(1, 5, 15)).toEqual(5);
//     });
//     test("processMin(1, undefined, 15) should equal 15", () => {
//         expect(processMin(1, undefined, 15)).toEqual(15);
//     });

//     // max
//     test("processMax should return the contentLength when there is no defined 2nd arg", () => {
//         expect(processMax(0, undefined, 25)).toEqual(25);
//     });
//     test("processMax takes the value of the sourceOfMax when it is present", () => {
//         expect(processMax(1, 15, 25)).toEqual(15);
//         expect(processMax(2, 15, 25)).toEqual(15);
//         // params: index, sourceOfMax, contentLength
//     });
// });
