// function convertWidthToCssClass(width, rightHandSide) {
//     if (rightHandSide) {
//         let remainder = 100 - width;
//         // console.log(width, rightHandSide, remainder);

//         if (rightHandSide !== remainder) {
//             throw "How could it not be the right value?";
//             // if this function is ever misused, this Throw will be thrown
//         }
//         let actualReturnValue = ".pct" + remainder.toString();
//         // console.log(width, "17marker", remainder, actualReturnValue);
//         return actualReturnValue;
//     }
//     let actualReturnValue = ".innerPollGeneric .pct" + width.toString();
//     // console.log(width, "21marker", rightHandSide, actualReturnValue);
//     return actualReturnValue;
// }
