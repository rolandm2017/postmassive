class Styling {
    constructor(start, end, stylings) {
        this.start = start;
        this.end = end;
        this.stylings = stylings; // can be empty [] to indicate that it is plain
        this.isCorrectlyMade = true; // check where it's used to see how this property is used. It's needed.
    }
    // make it work even if start > end. i.e. (25, 5) just gets you (5, 25)
    getStylings() {
        return this.stylings;
    }
}

export default Styling;
