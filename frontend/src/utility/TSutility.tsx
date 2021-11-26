import Styling from "./classes/Styling";


export function thisSingularObjectIsEmpty(styling: Styling): boolean {
    let isEmpty: boolean =
    styling && // 👈 null and undefined check
        Object.keys(styling).length === 0 &&
        Object.getPrototypeOf(styling) === Object.prototype;
    return isEmpty;
}

export function isAllEmpty(stylings: Array<Styling>): boolean {
    let a: number = 0;
    for (let i = 0; i < stylings.length; i++) {
        let objectIsEmpty: boolean = thisSingularObjectIsEmpty(stylings[i]);
        // console.log(8, objectIsEmpty);
        if (objectIsEmpty) {
            a++;
        }
    }
    if (a >= 0) {
        return true;
    }
    return false;
}


export function detectWellMadeStyling(stylings) {
    // TODO: Update this if it needs it

    /*
    // @params stylings - an array of stylings objects to loop over.
    // return value - true if there is at least one proper styling object in the array
    */
    // just look for ONE. then return.
    // console.log(stylings.length);
    for (let i = 0; i < stylings.length; i++) {
        let stylingHasStart = stylings[i].start >= 0;
        let stylingHasEnd = stylings[i].end >= 0;
        let stylingHasStyles = stylings[i].stylings // primo ternary. "if undefined, then false!"
            ? stylings[i].stylings.length >= 1
            : false;
        // console.log(34, stylingHasStart, stylingHasEnd, stylingHasStyles);
        if (stylingHasStart && stylingHasEnd && stylingHasStyles) {
            // console.log(35, stylings[i]);
            return true;
        }
    }
    // console.log("false!!!!!!!!", 37);
    return false;
}
