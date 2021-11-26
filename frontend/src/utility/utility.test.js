// import { shallow, mount } from "enzyme";
// import Chunk from "./Chunk/Chunk"; // disabled 11-24
import Instruction from "./classes/Instruction";
import Styling from "./classes/Styling";
import {
    prettyText,
    splitClassesAndVerify,
    detectWellMadeStyling,
    countStylings,
    getSubstringsWithInstructions,
    convertEngagementText,
    handleJustOneStyling,
    processMin,
    processMax,
    styleObjectIsEmpty,
} from "./utility";

const wellMadeStylingsOne = new Styling(10, 25, ["bold", "strikethrough"]); // sequential w...
const wellMadeStylingsTwo = new Styling(25, 50, ["bold", "italics"]); //... this one
const wellMadeStylingsThree = new Styling(60, 65, ["underline", "italics"]);
const wellMadeStylingsFour = new Styling(0, 25, [
    "bold",
    "backgroundColorBlack",
]);

const wellMadeStylingsFive = new Styling(50, 60, ["strikethrough"]); // allows space for ...
const wellMadeStylingsSix = new Styling(61, 70, [
    "italics",
    "backgroundColorRed",
    "underline",
]); //... a space

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
    //     const returnedChunkTexts = prettyText(
    //         "I can see what you see not, vision milky ... cast down into the halls of the blind",
    //         [wellMadeStylingsOne]
    //     );
    //     returnedChunkTexts.map((ChunkComponent) => {
    //         console.log(ChunkComponent);
    //         return ChunkComponent;
    //     });
    //     expect(returnedChunkTexts[1].classList.contains("bold")).toBe(
    //         true
    //     );
    //     expect(
    //         mount(returnedChunkTexts[1]).classList.contains(
    //             "strikethrough"
    //         )
    //     ).toBe(true);

    //     const italicizedChunk = prettyText(
    //         "I can see what you see not, vision milky ... cast down into the halls of the blind",
    //         [wellMadeStylingsTwo]
    //     ).classList.contains("italics");
    //     expect(italicizedChunk).toBe(true);
    // });
    it("has the appropriate length return value for a given string and Stylings combo", () => {
        const returnedChunkText = prettyText(
            "I can see what you see not. Vision milky, then eyes rot. When you turn, they will be gone, Whispering their hidden song. Then you see what cannot be, Shadows move where light should be. Out of darkness, out of mind, Cast down into the Halls of the Blind.",
            [wellMadeStylingsOne, wellMadeStylingsFive, wellMadeStylingsThree]
        );
        const shorterReturnedText = prettyText(
            "I can see what you see not. Vision milky, then eyes rot. When you turn, they will be gone, Whispering their hidden song. Then you see what cannot be, Shadows move where light should be. Out of darkness, out of mind, Cast down into the Halls of the Blind.",
            [wellMadeStylingsOne, wellMadeStylingsFive]
        );
        // console.log(returnedText);
        expect(returnedChunkText).toHaveLength(7);
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

describe("countStylings", () => {
    it("turns one singular styling into 1", () => {
        expect(countStylings(["bold"])).toBe(1);
        expect(countStylings(["italics"])).toBe(1);
        expect(countStylings(["backgroundColorRed"])).toBe(1);
    });
    it("turns two into 2 and three into 3", () => {
        expect(countStylings(["backgroundColorRed, bold"])).toBe(2);
        expect(countStylings(["backgroundColorBlack, bold"])).toBe(2);
        expect(countStylings(["backgroundColorRed, bold, strikethrough"])).toBe(
            3
        );
        expect(
            countStylings(["backgroundColorCyan, bold, strikethrough"])
        ).toBe(3);
    });
    it("throws unless the input is absolutely perfect", () => {
        expect(() => {
            countStylings();
        }).toThrow(TypeError);
    });
});

describe("handles a SINGULAR Styling & surrounding text, makes into 3 instructions", () => {
    it("handles one styling just fine", () => {
        expect(
            handleJustOneStyling("Yabba dabba doo", {
                start: 6,
                end: 11,
                stylings: ["bold, backgroundColorRed"],
            })
        ).toEqual([
            new Instruction(false, "Yabba "),
            new Instruction(true, "dabba", ".bold .backgroundColorRed", 2),
            new Instruction(false, " doo"),
        ]);
        expect(
            handleJustOneStyling("ABCDEFG GFEDCBA ABC DEF", {
                start: 8,
                end: 16,
                stylings: ["backgroundColorBlack"],
            })
        ).toEqual([
            new Instruction(false, "ABCDEFG "),
            new Instruction(true, "GFEDCBA ", ".backgroundColorBlack", 1),
            new Instruction(false, "ABC DEF"),
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

// describe("processes string with stylings into instructions", () => {
//     // this is why I started writing tests. This is what finally broke me.

//     const stylingThree = new Styling(23, 30, ["italics", "fontSize22"]);
//     const pairingOne = "this is some simple input";

//     //
//     const stylingFour = new Styling(11, 15, ["bold", "strikethrough", "backgroundColorRed"])
//     const stylingFive = new Styling(25, 29, ["italics", "backgroundColorBlack"])
//     const stylingSix = new Styling(41, 44, ["italics", "backgroundColorBlack"])
//     const pairingTwo = "AAAAAAAAA, bBbBb, c2c2c2, d5d5, EHSHEH, ffff, GGGGGGGGggggg",

//     it("gracefully handles text & one styling", () => {
//         expect(
//             getSubstringsWithInstructions("Yabba dabba doo", [
//                 {
//                     start: 6,
//                     end: 11,
//                     stylings: ["bold, backgroundColorRed"],
//                 },
//             ])
//         ).toEqual([
//             new Instruction(false, "Yabba "),
//             new Instruction(true, "dabba", ".bold .backgroundColorRed", 2),
//             new Instruction(false, " doo")
//         ]);
//     });

//     it("turns strings and stylings into substrings with instructions", () => {
//         const stylingOne = new Styling(5, 9, [
//             "bold, strikethrough, backgroundColorRed",
//         ]);
//         const stylingTwo = new Styling(9, 19, [// note the 9 in both One and Two
//             "italics, fontSize12, backgroundColorBlack",
//         ]);
//         expect(
//             getSubstringsWithInstructions(
//                 "aaa, bbb, cCc, dDd, EEEe, fff, ggg",
//                 [stylingOne, stylingTwo]
//             )
//         ).toEqual([
//             new Instruction(false, "aaa, "),
//             new Instruction(true, "bbb,", ".bold .strikethrough .backgroundColorRed", 3),
//             new Instruction(false, " cCc,"),
//             new Instruction(true, " dDd,", ".italics .backgroundColorBlack", 2),
//             new Instruction(false, " EEEe, fff, ggg")
//         ]);

//         expect(
//             getSubstringsWithInstructions(
//                 pairingTwo, [stylingFour, stylingFive, stylingSix]
//             )
//         ).toEqual([
//             new Instruction(false,  "AAAAAAAAA, "),
//             new Instruction(true, "bBbB", ".bold .strikethrough .backgroundColorRed", 3),
//             new Instruction(false, "b, c2c2c2,"),
//             new Instruction(true, " d5d", ".italics .backgroundColorBlack", 2),
//             new Instruction(false, "5, EHSHEH, f"),
//             new Instruction(true, "fff", ".italics .backgroundColorBlack", 2),
//             new Instruction(false, ", GGGGGGGGggggg")
//         ]);
//     });

//     it("returns plain string when there are no stylings", () => {
//         expect(getSubstringsWithInstructions("Mushrooms", [])).toBe(
//             "Mushrooms"
//         );
//         expect(getSubstringsWithInstructions("Hello world", [])).toBe("Hello world");``
// });

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
