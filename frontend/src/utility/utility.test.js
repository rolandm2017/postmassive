// import { shallow, mount } from "enzyme";
// import Chunk from "./Chunk/Chunk"; // disabled 11-24
import Instruction from "./classes/Instruction";
import Styling from "./classes/Styling";
import {
    prettyText,
    joinClasses,
    detectWellMadeStyling,
    getSubstringsWithInstructions,
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

const stylingThree = new Styling(23, 30, ["italics", "fontSize22"]);
const pairingOne = "this is some simple input";

//
const stylingFour = new Styling(11, 15, ["bold", "strikethrough", "backgroundColorRed"])
const stylingFive = new Styling(25, 29, ["italics", "backgroundColorBlack"])
const stylingSix = new Styling(41, 44, ["italics", "backgroundColorBlack"])
const pairingTwo = "The quick brown fox jumped over the angry dog and found his way to the grocery store. Calmness exudes because he was able to buy some eggs",

describe("splits classes and verifies that they yield what I expected", () => {
    it("throws an error when I want it to", () => {
        const willThrowError = () => {
            joinClasses("bold, italic", 1);
        };
        const errMsg =
            "Unexpected mismatch between splitClasses length and expectedNumber";
        expect(willThrowError).toThrow(errMsg);
        const anotherError = () => {
            joinClasses("bold, italic", 3);
        };
        expect(anotherError).toThrow(errMsg);

        // have to use function() because of how .not.toThrow() works under the hood
        expect(function () {
            joinClasses(["bold", "italic", "backgroundColorRed"], 3);
        }).not.toThrow(errMsg);
    });

    it("converts a string with commas ', ' to a string with periods ' .' for class names", () => {
        expect(joinClasses(["bold", "italic"], 2)).toEqual(".bold .italic");
        expect(
            joinClasses(["italic", "fontSize22", "strikethrough"], 3)
        ).toEqual(".italic .fontSize22 .strikethrough"); // this helped me debug my own code.
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
        expect(returnedChunkText).toHaveLength(7); // TODO: test chunk's internals for the correct subtext
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

describe("processes string with stylings into instructions", () => {
    // this is why I started writing tests. This is what finally broke me.

    

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
        expect(getSubstringsWithInstructions("Hello world", [])).toBe("Hello world");
});
