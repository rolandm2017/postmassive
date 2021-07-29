const ProcessAmount = (number, displayedInFeed) => {
    // turns "2707" -> "2,707" and "306438" -> "306k"
    // console.log(number);
    if (typeof number === "string") {
        const containsOnlyDigits = /^\d+$/.test(number);
        if (containsOnlyDigits) {
            number = parseInt(number, 10);
        } else {
            throw new Error("String was input with non-digit chars");
        }
    }
    if (number === null) {
        return null;
    }
    if (typeof number !== "number" && number !== null) {
        throw new Error("Wrong input type");
    }
    const amtAsString = parseInt(number, 10).toString();
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
            mil = "mil";
        }
        return (
            amtAsString.substring(0, amtAsString.length - 6) +
            "." +
            amtAsString[amtAsString.length - 6] +
            mil
        );
    }
};

export default ProcessAmount;
