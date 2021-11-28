function processAmount(number: number, displayedInFeed: boolean): string {
    if (number === null) {
        // console.log("processAmt returning 0")
        return "0";
    }
    // turns "2707" -> "2,707" and "306438" -> "306k"
    // console.log(number, displayedInFeed, 3);
    let inputNumber: number = number;
    const amtAsString: string = inputNumber.toString();
    // console.log(6, inputNumber, inputNumber.toString(), amtAsString)
    if (amtAsString.length <= 3) {
        // handles values like "123" and other 3 digit nums
        return amtAsString;
    } else if (amtAsString.length === 4) {
        // converts "1234" -> "1,234"
        return amtAsString[0] + "," + amtAsString.slice(1);
    } else if (amtAsString.length > 4 && amtAsString.length <= 6) {
        // "306903" -> "306k"
        return amtAsString.slice(0, 3) + "k";
    } else if (amtAsString.length > 6) {
        // "65,730,395" -> "65.7m"
        let mil = " million";
        if (displayedInFeed) {
            mil = "m";
        }

        console.log(amtAsString);
        let beforeDot = amtAsString.substring(0, amtAsString.length - 6);
        if (beforeDot === "") {
        }
        let afterDot = amtAsString[amtAsString.length - 6];
        let together = beforeDot + "." + afterDot + mil;
        console.log(together);
        return together;
    } else {
        throw Error("processAmount did not receive a correct input")
    }
};

export default processAmount;
