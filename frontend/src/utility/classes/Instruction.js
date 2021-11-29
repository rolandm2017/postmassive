import { Chunk } from "../chunk/Chunk";

class Instruction {
    constructor(special, textValue, stylings) {
        this.special = special;
        this.textValue = textValue;
        this.dotNotationStylings = stylings; // "bold fontSize22 backgroundColorRed" is correct, not ".bold .fontSize22"
    }

    getStyledChunk(index) {
        if (this.special) {
            console.log(
                13,
                this.dotNotationStylings,
                this.dotNotationStylings.length
            );
            if (this.dotNotationStylings.length === 1) {
                return (
                    <Chunk
                        index={index}
                        availableStylings={this.dotNotationStylings}
                        chunkValue={this.textValue}
                    />
                );
            } else {
                console.log(
                    26,
                    this.dotNotationStylings,
                    this.dotNotationStylings.length
                );
                return (
                    <Chunk
                        index={index}
                        availableStylings={this.dotNotationStylings.join(" ")}
                        chunkValue={this.textValue}
                    />
                );
            }
        } else {
            return (
                <Chunk
                    index={index}
                    availableStylings={null}
                    chunkValue={this.textValue}
                />
            );
        }
    }
}

export default Instruction;
