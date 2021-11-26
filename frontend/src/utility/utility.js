import Instruction from "./classes/Instruction";
import Chunk from "./chunk/Chunk";

export function prettyText(inputText, stylings, callback) {
    /*
    // inputText: the text to style. should be a long string.
    // stylings: expecting 1 to 3 Stylings objects.
    // returns: chunks of JSX that (magically? how?) connect together in the browser
    */

    let isStylingsEmpty = stylings.length === 0;
    if (isStylingsEmpty) {
        // console.log(26, "yes, it was empty");
        return (
            <Chunk index={0} availableStylings={null} chunkValue={inputText} />
        );
        // return (
        //     <span key={index} className="stylized">
        //         {inputText}
        //     </span>
        // ); // return simply the text
    } else {
        // console.log(30, stylings);
    }
    // console.log("prettyText52", isStylingsEmpty, stylings);
    let atLeastOneWellFormedStyling = wellMadeStylingIsPresent(stylings);
    if (!atLeastOneWellFormedStyling) {
        // return <span className="stylized">{inputText}</span>; // return simply the text ??
        return (
            <Chunk index={0} availableStylings={null} chunkValue={inputText} />
        );
    }

    // console.log("prettyText58", inputText, stylings);
    let instructions = getSubstringsWithInstructions(inputText, stylings);
    // FIXME: what if we have special chunks like sSSSs
    // ...where s = nonspecial, S = special. or SSSs
    // or sSSsSs or sSsSSs ... need a more generalized algo.

    // { special: false, value: initSlice }
    // { special: true, value: specialMiddleSlice, stylings: stylings[0] },
    // console.log(splitUpTexts, stylings, 48);
    let chunks = instructions.map((instruction, index) => {
        console.log(instruction, instruction.value, 110);
        if (instruction.special) {
            // console.log(66, availableStylings, chunk);
            if (instruction.numberOfStylings > 1) {
                let availableStylings = splitClassesAndVerify(
                    instruction.stylings,
                    instruction.numberOfStylings
                );
                console.log(114);
                // let availableStylings = chunk.stylings;
                console.log(instruction, availableStylings, 73);
                return (
                    <Chunk
                        index={index}
                        availableStylings={availableStylings}
                        chunkValue={instruction.value}
                    />
                );
            } else {
                let availableStylings = instruction.stylings;
                console.log(availableStylings, instruction, 130);
                return (
                    <Chunk
                        index={index}
                        availableStylings={availableStylings}
                        chunkValue={instruction.value}
                    />
                );
            }
        } else {
            return (
                <Chunk
                    index={index}
                    availableStylings={null}
                    chunkValue={instruction.value}
                />
            );
        }
    });
    console.log(chunks, 149, "end of prettyText");
    return chunks; //
}

export function handleJustOneStyling(inputText, styling) {
    let initSlice = inputText.slice(0, styling.start);
    let specialMiddleSlice = inputText.slice(styling.start, styling.end);
    let endSlice = inputText.slice(styling.end, inputText.length);
    return [
        new Instruction(false, initSlice),
        new Instruction(
            true,
            specialMiddleSlice,
            styling.stylings,
            countStylings(styling.stylings)
        ),
        new Instruction(false, endSlice),
    ];
}

export function getSubstringsWithInstructions(
    inputText,
    stylingsSansProcessing
) {
    /*
    // inputText - self explanatory
    // stylingsSansProcessing - the .stylings array. it may be that the user has supplied 0, 1, 2, or 3 stylings.
    // ...this function's role is to sort out how many substrings we'll need.
    // for 0, we don't need any substrings.
    // for 1, we just need the substring that is encapsulated by the Styling.
    // for 2 or 3, a loop makes sense, though barely!
    // return value - should be an array of strings that can be combined using prettyText
    */

    // TODO: Rewrite this function, it's awful. Too many edge cases before the meat and potatoes.

    // todo: only splice if there is a styling attached to the stylings obj // delete if here on dec 20th
    let stylings = [];
    stylingsSansProcessing.forEach((styling) => {
        // get rid of the empty styling objects. could go from 3 down to 1.

        if (typeof styling.stylings === "undefined") {
            // ...
            // console.log(
            //     126,
            //     styling.stylings,
            //     " did not have a styling attached!"
            // );
        } else {
            // console.log(133, "pushing ", styling);
            stylings.push(styling);
        }
    });
    let stringsWithInstructions = [];

    if (stylings.length === 1) {
        return handleJustOneStyling(inputText, stylings[0]); // end of stylings
    }

    let startingSliceValue = inputText.slice(0, stylings[0].start);
    let initSlice = new Instruction(false, startingSliceValue);
    // let initSlice = {
    //     special: false,
    //     value: startingSliceValue
    // };
    if (stylings.length > 0) {
        stringsWithInstructions.push(initSlice);
    }
    // fixme: if end is before start, use end as start and start as end. its not a big deal.
    // priority: high!
    // fixme: also the sliders ranges have to be unmessed from their current messy bugged state
    for (let i = 0; i < stylings.length; i++) {
        let areWeOnTheLastStyling = i === stylings.length - 1;
        let stylingsCount = countStylings(stylings[i].stylings);
        let textSlice = inputText.slice(stylings[i].start, stylings[i].end); // will go from i to end of string
        let instruction = new Instruction(
            true,
            textSlice,
            stylings[i].stylings,
            stylingsCount
        );
        stringsWithInstructions.push(instruction);

        if (areWeOnTheLastStyling) {
            // special case. get (start, end) and then (end, contentLength)

            let ordinaryTrailEndPart = inputText.slice(stylings[i].end + 1); // will be the trailing but
            let trailEnd = new Instruction(false, ordinaryTrailEndPart);
            stringsWithInstructions.push(trailEnd);
        } else {
            // standard case. get (start, end), then (end + 1, nextStart)
            let normalTextInBetween = inputText.slice(
                stylings[i].end + 1,
                stylings[i + 1].start
            );
            let instruction = new Instruction(false, normalTextInBetween);
            stringsWithInstructions.push(instruction);
        }
    }
    // console.log(stringsWithInstructions);
    return stringsWithInstructions;
}

export function convertEngagementText(inputNum) {
    // practical question: Which is more satisfying to see engagement wise, 999k or 999.9k? 999.9m or 999m?
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
            return stringVer.slice(0, 1) + "." + stringVer.slice(1, 2) + "m";
        }
        const lengthPreDecimal = stringVer.length - 6; // 6: slice off the 0's in 13,000,000, for instance
        const decimal = stringVer.slice(lengthPreDecimal, lengthPreDecimal + 1);
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
