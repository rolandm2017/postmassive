import { Chunk } from "../chunk/Chunk";

class Instruction {
    constructor(special, textValue, stylings) {
        this.special = special;
        this.textValue = textValue;
        this.dotNotationStylings = stylings; // ".bold .fontSize22 .backgroundColorRed"
    }

    getStyledChunk(index) {
        return (
            <Chunk
                index={index}
                availableStylings={this.dotNotationStylings}
                chunkValue={this.textValue}
            />
        );
    }
}

export default Instruction;
