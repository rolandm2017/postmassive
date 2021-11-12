// TODO: rewrite this as TS.


/**
 * @param number - the raw integer input from the server. presumed to be less than 1000 server side for like
 * i dunno, a few seconds at most, before ascending to 1k and beyond
 * @param displayedInFeed - a very literal boolean value. If it isn't in someone's feed, then it must be elsewhere.
 * @return - a string. 
 * 
 * Purpose of function is to convert 10,000 => 11.3k, 101,000 => 101k, 1,000k => 1.00m, and beyond.
 */
function processAmount(number: number, displayedInFeed: boolean): string {
        // turns "2707" -> "2,707" and "306438" -> "306k"
    const amtAsString: string = number.toString();
    if (amtAsString.length <= 3) {
        // handles values like "123" and other 3 digit nums
        return amtAsString.toString();
    } else if (amtAsString.length === 4) {
        // converts "1234" -> "1,234"
        return amtAsString[0] + "," + amtAsString.slice(1);
    } else if (amtAsString.length > 4 && amtAsString.length <= 6) {
        // "306903" -> "306k"
        return amtAsString.slice(0, 3) + "k";
    } else if (amtAsString.length > 6) {
        // "65,730,395" -> "65.7m"
        let mil: string = " million";
        if (displayedInFeed) {
            mil = "m";
        }
        let millionLvlString: string = amtAsString.substring(0, amtAsString.length - 6) +
        "." +
        amtAsString[amtAsString.length - 6] +
        mil
        return millionLvlString
    }
}

export default processAmount;