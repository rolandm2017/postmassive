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

// export function joinClasses(classesList: any): string {
//     /* really proud of this one
//     // @params classesList - could be "bold, italics" or ["bold", italics] <-- this is the only one that makes sense
//     // returns - the classes string to insert into the component
//     */

//     // fixme: clicking "bold" causes TypeError: dotNotationStylings.split is not a function.
//     // fixme: result is received empty array into joinClasses
//    console.log("inside joinClasses", classesList, 64) 
//     try  { // this try catch here to take care of condition where I'm still using 
//         // the "bold, italics" as opposed to ["bold", "italics"]
//         if (classesList.indexOf(", ") > -1) {
//             let dotNotationClasses = classesList.join(" ");
//             console.log("inside joinClasses, returning ", dotNotationClasses)
//             return dotNotationClasses;
//         } else {
//             console.log(72, "inside joinClasses, returning ", classesList)
//             return classesList
//         }
//     } catch {
//         if (classesList.indexOf(", ") > -1) { // why is this in try AND catch? There's a reason, I just don't remember what it is
//             let dotNotationClasses = classesList.split(", ").join(" ");    
//             console.log("inside joinClasses, returning ", dotNotationClasses)
//             return dotNotationClasses;
//         }
//         let dotNotationClasses = classesList.join(" ");
//         console.log("inside joinClasses, returning ", dotNotationClasses)
//         return dotNotationClasses
//     }
    
// }

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

// export function removedEmpties(stylings: Styling[]): any {
//     let fullOnly: any = [];
//     stylings.forEach(styling => {
//         if (styling.start > 0 && styling.end > 0) {
//             if (styling.stylings.length > 0) {
//                 fullOnly.push(styling)
//             }
//         }
//     })
//     return fullOnly;
// }


function incompleteStylingsBecomeComplete(stylings: Styling[]): Styling[] {
    // made this because I spotted the input for getSubstringsWithInstructions was like
    //(3) [{…}, Styling, Styling]
    // 0: {start: 0, end: 5, stylings: Array(1)}
    // look --> //// end: 5, start: 0, stylings: ['bold'][[Prototype]]: Object
    // 1: Styling {start: 0, end: 0, stylings: Array(0)}end: 0start: 0stylings: [][[Prototype]]: Object
    // 2: Styling {start: 0, end: 0, stylings: Array(0)}
    // length: 3
    // [[Prototype]]: Array(0) 
    //
    // notice how the first one is a regular object, not a Styling object. it was causing a bug downstream.
    let properlyMade: Styling[] = [];
    stylings.forEach(styling => { // this will retain proper order. 1, 2, 3 --> 1, 2, 3, not 3, 1, 2 or something like that
        try {
            if (styling.start > 0 && styling.start > 0) {
                if (styling.stylings) {
                    properlyMade.push(styling)
                }
            }
        } catch {
            const caughtUnmadeStyling = styling;
            let madeIntoProperStyling = new Styling(caughtUnmadeStyling.start, caughtUnmadeStyling.end, caughtUnmadeStyling.stylings)
            properlyMade.push(madeIntoProperStyling)
        }
    })
    return properlyMade;
}


export function getSubstringsWithInstructions(inputText: string, stylings: Styling[]): Instruction[] {
    /*
    // inputText - self explanatory
    // stylings - Stylings array!
    // return value - should be an array of strings that can be combined using prettyText
    */

    let cleanedUpStylings: Styling[] = incompleteStylingsBecomeComplete(stylings)

    let slicesToDistribute: string[] = [];
    let specialSubstringIndexes: number[] = [];
    // split the inputText into its substrings. Assign the right substring to the right Instruction, via index.
    let specialIndex = 0;
    for (let i = 0; i < cleanedUpStylings.length; i++) {
        const startOfCurrent = cleanedUpStylings[i].start
        const endOfCurrent = cleanedUpStylings[i].end
        const stylingStartsRightAway = i === 0 && startOfCurrent === 0
        if (stylingStartsRightAway) {
            const stylingFromZero = inputText.slice(startOfCurrent, endOfCurrent)
            slicesToDistribute.push(stylingFromZero)
            specialSubstringIndexes.push(i)
        } else {
            if (i === 0) {
                const unstyledPartBeforeFirstStyling = inputText.slice(0, startOfCurrent);
                slicesToDistribute.push(unstyledPartBeforeFirstStyling)
                specialIndex++;
            }
            const specialStyledText = inputText.slice(startOfCurrent, endOfCurrent)
            slicesToDistribute.push(specialStyledText)
            specialSubstringIndexes.push(i + 1)

            // now handle trailing bit
            const nextIndexGoesBeyondTheEnd = i + 1 === cleanedUpStylings.length
            if (nextIndexGoesBeyondTheEnd) {
                // vvvvvvv 
                // GENERIC 
                // ^^^^^^^ 
                // we are handling the trailing bit like
                // style 3: (29, 59)
                // content.length: 73 <--- will have 14 remaining chars
                let trailingEndPart = inputText.slice(endOfCurrent);
                slicesToDistribute.push(trailingEndPart)

            } else {
                // vvvvvvv 
                // GENERIC 
                // ^^^^^^^
                // we are handling the text between the end of styling[i] and the start of styling[i + 1]
                const startOfNextStyling = cleanedUpStylings[i + 1].start;
                let genericTextInMiddle = inputText.slice(endOfCurrent, startOfNextStyling)
                slicesToDistribute.push(genericTextInMiddle)
                specialIndex++;
            }
        }
    }
    console.log(cleanedUpStylings, slicesToDistribute, specialSubstringIndexes)
    let extremelySpecificInstructions: Instruction[] = [];
    
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