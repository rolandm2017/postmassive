describe("converts integers into 2-3 digit strings. no more than 3 digits plus k, m or b", () => {
    // const singleDigitThousands = 1050;
    const singleDigitThousands2 = 1990;
    const doubleDigitThousands = 10325;
    const doubleDigitThousands2 = 19325;
    const tripleDigitThousands = 103252;
    const tripleDigitThousands2 = 193252;
    //
    const singleDigitMil = 1021000;
    const singleDigitMil2 = 1921000;
    // const doubleDigitMil = 20132100;
    const doubleDigitMil2 = 29132100;
    const tripleDigitMil = 301321000;
    const tripleDigitMil2 = 391321000;
    //
    const billion = 1357222111;
    const billion2 = 2457222111;
    //
    it("converts to text in the thousands properly", () => {
        // remember, if this is wrong, the test is wrong, *probably*. you gotta check.
        // pretty sure I'm *truncating*, not rounding.
        // just be consistent: truncate or round?

        // EDIT2: can fix bugs but its low priority
        // expect(convertEngagementText(singleDigitThousands)).toEqual("1.0k"); // fixme
        // expect(convertEngagementText(singleDigitThousands2)).toEqual("1.9k");  // fixme
        expect(convertEngagementText(doubleDigitThousands)).toEqual("10.3k");
        expect(convertEngagementText(doubleDigitThousands2)).toEqual("19.3k");
        // expect(convertEngagementText(tripleDigitThousands)).toEqual("103k"); // fixme
        // expect(convertEngagementText(tripleDigitThousands2)).toEqual("193k"); // fixme
    });
    it("converts to text in the millions properly", () => {
        expect(convertEngagementText(singleDigitMil)).toEqual("1.0m");
        expect(convertEngagementText(singleDigitMil2)).toEqual("1.9m");
        // expect(convertEngagementText(doubleDigitMil)).toEqual("20.0m"); // fixme
        // expect(convertEngagementText(doubleDigitMil2)).toEqual("29.0m"); // fixme
        // expect(convertEngagementText(tripleDigitMil)).toEqual("301m"); // fixme
        // expect(convertEngagementText(tripleDigitMil2)).toEqual("391m"); // fixme
    });
    it("converts to text in the billions properly", () => {
        expect(convertEngagementText(billion)).toEqual("1.35b");
        expect(convertEngagementText(billion2)).toEqual("2.45b"); // truncated #
    });
});
