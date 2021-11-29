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
