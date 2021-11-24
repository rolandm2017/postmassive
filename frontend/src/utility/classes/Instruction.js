import ToBeStyled from "../toBeStyled/ToBeStyled";

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
                    <ToBeStyled
                        index={index}
                        availableStylings={this.dotNotationStylings}
                        chunkValue={this.textValue}
                    />
                );
            } else {
                throw "Input error";
            }
        }
    }
}

export default Instruction;
