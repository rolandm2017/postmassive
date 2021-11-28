import { wellMadeStylingIsPresent, joinClasses, getSubstringsWithInstructions } from "./utility"

import Styling from "./classes/Styling";
import { Chunk } from "./chunk/Chunk";
import Instruction from "./classes/Instruction";


function prettyText(inputText: string, stylings: Array<Styling>): any {
    /*
    // inputText: the text to style. should be a long string.
    // stylings: expecting 1 to 3 Stylings objects.
    // returns: chunks of JSX that (magically? how?) connect together in the browser
    */

// TODO: until(oneStyleIsFinished) {
    // ...handleJustOneStyling(the)
// }

    let isStylingsEmpty = stylings.length === 0;
    if (isStylingsEmpty) {
        // console.log(26, "yes, it was empty");
        let createNonspecialChunk: any = <Chunk index={0} availableStylings={""} chunkValue={inputText} />;
        let nonspecialChunkArray: any[] = [createNonspecialChunk]
        return (
            nonspecialChunkArray
        ); // return simply the text
    } 
    
    console.log("prettyText27", isStylingsEmpty, stylings);
    let atLeastOneWellFormedStyling = wellMadeStylingIsPresent(stylings);
    if (!atLeastOneWellFormedStyling) {
        // zombie detected 11-27 // return <span className="stylized">{inputText}</span>; // return simply the text ??
        // let createNonspecialChunk: typeof Chunk = <Chunk index=  {0} availableStylings={null} chunkValue={inputText} />
        // let nonspecialChunkArray: typeof Chunk[] = [createNonspecialChunk]
        let createNonspecialChunk: any = <Chunk index={0} availableStylings={""} chunkValue={inputText} />
        let nonspecialChunkArray: typeof Chunk[] = [createNonspecialChunk] 
        return (
            nonspecialChunkArray
        );
    }

    // console.log("prettyText40", inputText, stylings);
    console.log("prettyText41", stylings) // fixme: problem is in here... (1)
    let instructions: Instruction[] = getSubstringsWithInstructions(inputText, stylings);

    let chunks: any[] = instructions.map((instruction, index) => {
        console.log(instruction, instruction.textValue, 44);
        if (instruction.special) {
            // console.log(46, availableStylings, chunk);
            if (instruction.numberOfStylings > 1) {
                // let availableStylings = joinClassesAndVerify(
                //     instruction.dotNotationStylings,
                //     instruction.numberOfStylings
                // );
                let availableStylings = instruction.dotNotationStylings;
                console.log(instruction, availableStylings, 53);
                return (
                    <Chunk
                        index={index}
                        availableStylings={availableStylings}
                        chunkValue={instruction.textValue}
                    />
                );
            } else {
                let availableStylings = instruction.dotNotationStylings;
                console.log(availableStylings, Instruction, 63);
                return (
                    <Chunk
                        index={index}
                        availableStylings={availableStylings}
                        chunkValue={instruction.textValue}
                    />
                );
            }
        } else {
            return (
                <Chunk
                    index={index}
                    availableStylings={""}
                    chunkValue={instruction.textValue}
                />
            );
        }
    });
    console.log(chunks, 82, "end of prettyText");
    return chunks; //
}

export default prettyText;