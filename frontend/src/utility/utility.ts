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

export function joinClasses(classesList: string): string {
    // really proud of this one
    /* 
    // @params unsplitClasses - input raw string like "bold, fontSize24" to convert to ["bold", "fontSize24"]
    // @params expectedNumberOfClasses - Comes direct from the Instructions object. To be compared for error detection. 
    // returns - the classes string to insert into the component
    */
    if (classesList.indexOf(", ") > -1) {
        let dotNotationClasses= "." + classesList.split(", ").join(" .");
        return dotNotationClasses;
    } else {
        return "." + classesList
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

export function getSubstringsWithInstructions(inputText: string, stylings: Styling[]): Instruction[] {
    /*
    // inputText - self explanatory
    // stylingsSansProcessing - the .stylings array. it may be that the user has supplied 0, 1, 2, or 3 stylings.
    // ...this function's role is to sort out how many substrings we'll need.
    // for 0, we don't need any substrings.
    // for 1, we just need the substring that is encapsulated by the Styling.
    // for 2 or 3, a loop makes sense, though barely!
    // return value - should be an array of strings that can be combined using prettyText
    */

    // todo: only splice if there is a styling attached to the stylings obj // delete if here on dec 20th
    // REWRITE
    // REWRITE
    // REWRITE
    
    let startingSliceValue = inputText.slice(0, stylings[0].start);
    let initSlice = new Instruction(false, startingSliceValue);
    // let initSlice = {
    //     special: false,
    //     value: startingSliceValue
    // };
    let extremelySpecificInstructions: Instruction[] = [];
    if (stylings.length > 0) {
        extremelySpecificInstructions.push(initSlice);
    }
    // fixme: if end is before start, use end as start and start as end. its not a big deal.
    // priority: high!
    // fixme: also the sliders ranges have to be unmessed from their current messy bugged state
    for (let i = 0; i < stylings.length; i++) {
        let areWeOnTheLastStyling = i === stylings.length - 1;
        let stylingsCount = countStylings(stylings[i].stylings);
        let textSlice = inputText.slice(stylings[i].start, stylings[i].end); // will go from i to end of string
        let dotNotationStylings = joinClasses(stylings[i].stylings)
        let countOfSpecialClasses = dotNotationStylings.split(".").length;
        let instruction = new Instruction(
            true,
            textSlice,
            dotNotationStylings,
            countOfSpecialClasses // fixme: stylingsCount is way too big
        );
        extremelySpecificInstructions.push(instruction);

        if (areWeOnTheLastStyling) {
            // special case. get (start, end) and then (end, contentLength)

            let ordinaryTrailEndPart = inputText.slice(stylings[i].end + 1); // will be the trailing but
            let trailEnd = new Instruction(false, ordinaryTrailEndPart);
            extremelySpecificInstructions.push(trailEnd);
        } else {
            // standard case. get (start, end), then (end + 1, nextStart)
            let normalTextInBetween = inputText.slice(
                stylings[i].end + 1,
                stylings[i + 1].start
            );
            let instruction = new Instruction(false, normalTextInBetween);
            extremelySpecificInstructions.push(instruction);
        }
    }
    // console.log(stringsWithInstructions);
    return extremelySpecificInstructions;
}

