class Styling {
    constructor(start, end, stylings) {
        this.start = start;
        this.end = end;
        this.stylings = stylings; // can be empty [] to indicate that it is plain
    }
    // make it work even if start > end. i.e. (25, 5) just gets you (5, 25)
    getStylings() {
        return this.stylings;
    }

    getInstruction() {}
}

export default Styling;
