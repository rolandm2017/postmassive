class Styling {
    constructor(start, end, stylings) {
        this.start = start;
        if (end > start) {
            throw "Malformed start or end code";
        }
        this.end = end;
        this.stylings = stylings;
    }
}

export default Styling;
