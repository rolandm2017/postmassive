import Chunk from "../chunk/Chunk";

class Instruction {
    constructor(special, textValue, stylings, numberOfStylings) {
        this.special = special;
        this.textValue = textValue;
        this.dotNotationStylings = stylings; // ".bold .fontSize22 .backgroundColorRed"
        this.numberOfStylings = numberOfStylings;
    }

    getStyled(index) {
        if (this.special) {
            if (this.stylings && this.numberOfStylings) {
                return (
                    <Chunk
                        index={index}
                        availableStylings={this.dotNotationStylings}
                        chunkValue={this.textValue}
                    />
                );
            } else {
                throw Error("Input error");
            }
        }
    }
}

export default Instruction;
