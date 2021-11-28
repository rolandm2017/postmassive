import Instruction from "./classes/Instruction";
import Styling from "./classes/Styling";

export function thisSingularObjectIsEmpty(styling: Styling): boolean {
    let isEmpty: boolean =
    styling && // 👈 null and undefined check
        Object.keys(styling).length === 0 &&
        Object.getPrototypeOf(styling) === Object.prototype;
    return isEmpty;
}

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

export function joinClasses(classesList: any): string {
    /* really proud of this one
    // @params classesList - could be "bold, italics" or ["bold", italics] <-- this is the only one that makes sense
    // returns - the classes string to insert into the component
    */

    // fixme: clicking "bold" causes TypeError: dotNotationStylings.split is not a function.
    // fixme: result is received empty array into joinClasses
   console.log("inside joinClasses", classesList, 64) 
    try  { // this try catch here to take care of condition where I'm still using 
        // the "bold, italics" as opposed to ["bold", "italics"]
        if (classesList.indexOf(", ") > -1) {
            let dotNotationClasses = classesList.join(" ");
            console.log("inside joinClasses, returning ", dotNotationClasses)
            return dotNotationClasses;
        } else {
            console.log(72, classesList)
            console.log("inside joinClasses, returning ", classesList)
            return classesList
        }
    } catch {
        if (classesList.indexOf(", ") > -1) {
            let dotNotationClasses = classesList.split(", ").join(" ");    
            console.log("inside joinClasses, returning ", dotNotationClasses)
            return dotNotationClasses;
        }
        let dotNotationClasses = classesList.join(" ");
        console.log("inside joinClasses, returning ", dotNotationClasses)
        return dotNotationClasses
    }
    
}

export function verifyEachStyling(stylings: Styling[]): boolean[] {
    // am really looking to see if a Styling contains instructional information that has to be
    // acted upon to turn it into a chunk.
    // false === plain
    let descriptions: boolean[] = []
    stylings.forEach(styling => {
        if (styling.start > 0 && styling.end > 0 && styling.stylings.length > 0) {
            descriptions.push(true)
        } else if (styling.start > 0 && styling.end > 0 && styling.stylings.length === 0) {
            descriptions.push(false)
        } else if (styling.start === 0 && styling.end === 0 && styling.stylings.length === 0) {
            descriptions.push(true)
        } else {
            console.log(76, styling)
            descriptions.push(true)
        }
})
    return descriptions
}


export function getSubstringsWithInstructions(inputText: string, stylings: Styling[]): Instruction[] {
    /*
    // inputText - self explanatory
    // stylings - Stylings array!
    // return value - should be an array of strings that can be combined using prettyText
    */

    // todo: only splice if there is a styling attached to the stylings obj // delete if here on dec 20th
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
    let booleanValuesDescribingQuality = verifyEachStyling(stylings);
    // REWRITE
    console.log(stylings, 878787878787) // INPUT: looks fine here
    let startPoints = stylings.map(styling => {
        if (styling.stylings.length > 0) {
            return styling.start;
        }
    })
    let endPoints = stylings.map(styling => {
        if (styling.stylings.length > 0)  {   
            return styling.end;
        }
    })
    for (let i = 0; i < stylings.length; i++) {
        let endOfSpecialTextIndex = 0; // increases every time some StyledText ends. will be used to slice the final TrailEnd
        let areWeOnTheLastStyling = i === stylings.length - 1;
        let textSlice;
        if (stylings[i].stylings.length > 0) {
            textSlice = inputText.slice(stylings[i].start, stylings[i].end); // will go from i to end of string
        } else {
            textSlice = inputText.slice(endOfSpecialTextIndex);
        }
        let dotNotationStylings = ".unstyledIfRemaining";
        if (stylings[i].stylings.length > 0) {
            dotNotationStylings = joinClasses(stylings[i].stylings) // issue here because I added "bold"
            const isStartIndexBiggerThanEnd = stylings[i].start > stylings[i].end;
            const chooseEndIndexForNewMinimum = stylings[i].end
            endOfSpecialTextIndex = isStartIndexBiggerThanEnd ? stylings[i].start : chooseEndIndexForNewMinimum;
        }
        let instruction = new Instruction(
            true,
            textSlice,
            dotNotationStylings,
        );
        console.log(102102102, instruction, i)
        extremelySpecificInstructions.push(instruction);

        if (areWeOnTheLastStyling) {
            console.log(10666666666, extremelySpecificInstructions)
            // special case. get (start, end) and then (end, contentLength)
            let ordinaryTrailEndPart = inputText.slice(stylings[i].end + 1);
            let trailEnd = new Instruction(false, ordinaryTrailEndPart);
            console.log(107, trailEnd, stylings[i], i)
            extremelySpecificInstructions.push(trailEnd);
        } else {
            // standard case. get (start, end), then (end + 1, nextStart)
            let endOfCurrentStylingRange = stylings[i].end + 1;
            let startOfNextStylingRange = stylings[i + 1].start
            let normalTextInBetween = inputText.slice(
                endOfCurrentStylingRange,
                startOfNextStylingRange
            );
            let instruction = new Instruction(false, normalTextInBetween);
            console.log(115, normalTextInBetween, i)
            extremelySpecificInstructions.push(instruction);
        }
    }
    console.log(extremelySpecificInstructions, 117); // INPUT: is messed up by this point
    return extremelySpecificInstructions;
}

// export function wholeArrayIsEmpty(stylings: Array<Styling>): boolean {
//     let a: number = 0;
//     for (let i = 0; i < stylings.length; i++) {
//         let objectIsEmpty: boolean = thisSingularObjectIsEmpty(stylings[i]);
//         // console.log(8, objectIsEmpty);
//         if (objectIsEmpty) {
//             a++;
//         }
//     }
//     if (a >= 0) {
//         return false;
//     }
//     return true;
// }