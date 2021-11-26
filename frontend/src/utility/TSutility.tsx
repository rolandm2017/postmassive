import Instruction from "./classes/Instruction";
import Styling from "./classes/Styling";


export function thisSingularObjectIsEmpty(styling: Styling): boolean {
    /*
    //
    */
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


// TODO: find out what this is actually used for
// TODO: find out what this is actually used for
// TODO: find out what this is actually used for

export function wellMadeStylingIsPresent(stylings: Array<Styling>): boolean {
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
            return true;
        }
    }
    return false;
}

export function countStylings(stylings: Array<string>): number {
    /* 
    // pass the value of stylings.stylings, not the stylings object. 
    // **
    // ** PLEASE NOTE: Array<string> IS the CORRECT type
    // **
    // return value - the length of the stylings
    // e.g. ["bold", "italics"], 2
    */
    return stylings.length;
}

export function joinClassesAndVerify(classesList: Array<string>, expectedNumberOfClasses: number): string {
    // really proud of this one
    /* 
    // @params unsplitClasses - input raw string like "bold, fontSize24" to convert to ["bold", "fontSize24"]
    // @params expectedNumberOfClasses - Comes direct from the Instructions object. To be compared for error detection. 
    // returns - the classes string to insert into the component
    */
    if (classesList.length === expectedNumberOfClasses) {
        let joinedClasses = "." + classesList.join(" .");
        return joinedClasses;
    } else {
        console.log(classesList, expectedNumberOfClasses);
        throw Error(
            "Unexpected mismatch between splitClasses length and expectedNumber"
        );
    }
}

export function handleJustOneStyling(inputText: string, styling: Styling): Array<Instruction> {
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

export function processMin(index: number, sourceOfMin: number | undefined, contentLength: number): number {
    /*
    // per Styling, min is as follows: 
    // (1) srcOfMin === 0, 
    // (2) end of first style *if* it exists, otherwise content.length
    // (3) end of second style *if* it exists, otherwise content.length;
    // returns: the index's assigned minimum value
    */

    if (index === 0) {
        return 0;
    } else if (index === 1) {
        if (sourceOfMin) {
            return sourceOfMin;
        } else {
            return contentLength;
        }
    } else if (index === 2) {
        if (sourceOfMin) {
            return sourceOfMin;
        } else {
            return contentLength;
        }
    } else {
        throw Error("Index was out of range");
    }
    
}

export function processMax(index: number, sourceOfMax: number | undefined, contentLength: number): number {
    /*
    // this is the maximum value available for the given index. per Styling, max is as follows: 
    // (1) start of second style *if* it exists; otherwise, contentLength 
    // (2) start of third style *if* it exists; otherwise, contentLength.
    // (3) srcOfMax === contentLength;
    // returns: the index's assigned minimum value
    */
    if (index === 0) {
        if (sourceOfMax) {
            return sourceOfMax;
        } else {
            return contentLength;
        }
    } else if (index === 1) {
        if (sourceOfMax) {
            return sourceOfMax;
        } else {
            return contentLength;
        }
    } else if (index === 2) {
        if (sourceOfMax) {
            return sourceOfMax;
        } else {
            return contentLength;
        }
    } else {
        throw "Index was out of range"
    }
}

