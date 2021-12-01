import Styling from "../utility/classes/Styling";
import { thisSingularObjectIsEmpty } from "../utility/utility";

export function getAuctioneerResponse() {
    // talks to server's auctioneer to get price of post
    let auctioneerSays = Math.random() * 1000;
    // console.log(36, auctioneerSays);
    let asMoney = auctioneerSays.toString().split(".")[0];
    let decimalValue = Math.ceil(Math.random() * 99)
        .toString()
        .substring(0, 3);

    let price = asMoney + "." + decimalValue;

    return price;
}


function onlyUnique(value: any, index: number, self: any):boolean {
    return self.indexOf(value) === index;
}

function updateStyleWithType(type: string, styleObject: Styling, setter: any): void {
    // console.log(116, type, styleObject, "setter");
    let newNthStyle = {
        ...styleObject,
    };
    let currentStyles = styleObject.stylings;
    if (typeof currentStyles === "undefined") {
        currentStyles = [];
    }
    currentStyles.push(type);
    newNthStyle.stylings = currentStyles.filter(onlyUnique);

    setter(newNthStyle);
}

export function addStyleToSection(styling: Styling, type: string, index: number, setter: any): void {
    // console.log(41, styling, type, index)
    let isEmptyObject = thisSingularObjectIsEmpty(styling);
    if (!isEmptyObject) {
        updateStyleWithType(type, styling, setter);
    } else {
        const styleInit = new Styling(0, 1, [type]);
        if (index === 0) {
            setter(styleInit);
        }
    }
    // 78 -> 132 refactored into 65 -> 75? that just cant be// FIXME: this.
}

export function removeStyleFromSection(styling: Styling, typeToRemove: string, index: number, setter: any): Styling {
    console.log(555555, styling, typeToRemove, index);
    let currentStylings: string[] = [...styling.stylings];
    console.log(currentStylings);

    let remainingStylings: string[] = [];
    console.log(63, currentStylings, currentStylings.length)
    for (let i = 0; i < currentStylings.length; i++) {
        console.log(646464, "currentStylings:", currentStylings[i])
        if (typeToRemove === currentStylings[i]) {
            console.log("removing...", typeToRemove, currentStylings[i])
            continue
        } else {

            remainingStylings.push(currentStylings[i])
        }
    }
    let newStyleObject = new Styling(
        styling.start,
        styling.end,
        remainingStylings
    );
    setter(newStyleObject);
    return newStyleObject;
}
