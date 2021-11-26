import { FC } from "react";

import { wellMadeStylingIsPresent, joinClassesAndVerify } from "./utility"

import Styling from "./classes/Styling";
import { Chunk } from "./chunk/Chunk";



function prettyText(inputText: string, stylings: Array<Styling>, callback: any): Array<Chunk> {
    /*
    // inputText: the text to style. should be a long string.
    // stylings: expecting 1 to 3 Stylings objects.
    // returns: chunks of JSX that (magically? how?) connect together in the browser
    */

    let isStylingsEmpty = stylings.length === 0;
    if (isStylingsEmpty) {
        // console.log(26, "yes, it was empty");
        let createNonspecialChunk: any = <typeof Chunk index={0} availableStylings={null} chunkValue={inputText} />;
        let nonspecialChunkArray: any[] = [createNonspecialChunk]
        return (
            nonspecialChunkArray
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
        let createNonspecialChunk: typeof Chunk = <Chunk index={0} availableStylings={null} chunkValue={inputText} />
        let nonspecialChunkArray: typeof Chunk[] = [createNonspecialChunk]
        return (
            nonspecialChunkArray
        );
    }

    // console.log("prettyText58", inputText, stylings);
    let instructions = getSubstringsWithInstructions(inputText, stylings);

    let chunks = instructions.map((instruction, index) => {
        console.log(instruction, instruction.value, 110);
        if (instruction.special) {
            // console.log(66, availableStylings, chunk);
            if (instruction.numberOfStylings > 1) {
                let availableStylings = joinClassesAndVerify(
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

export default prettyText;