import prettyText from "./prettyText";
import Styling from "./classes/Styling";

describe("prettyText", () => {
    const goodStyleOne = new Styling(9, 15, ["bold"]);
    const goodStyleTwo = new Styling(25, 35, ["italic"]);
    const goodStyleThree = new Styling(80, 100, ["strikethrough", "underline"]);
    it("spits out 7 chunks", () => {
        expect(
            prettyText(
                "this is some sample text. I am certain it is long enough for 100 characters. But just to be sure, I'm going to type until I hit column 180, line 9, instead of line 8, column 1-something. K, this is good.",
                [goodStyleOne, goodStyleTwo, goodStyleThree]
            )
        ).toHaveLength(7);

        expect(
            prettyText(
                "this is some sample text. I am certain it is long enough for 100 characters. But just to be sure, I'm going to type until I hit column 180, line 9, instead of line 8, column 1-something. K, this is good.",
                [goodStyleOne]
            )
        ).toHaveLength(7); // TODO: Test that ChunkValue is the expected value.
    });
});
