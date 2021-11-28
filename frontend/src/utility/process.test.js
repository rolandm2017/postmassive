import { processMin, processMax } from "./process";

describe("processMin and processMax", () => {
    test("processMin(0, a, b) should equal 0", () => {
        expect(processMin(0, 15, 23894)).toEqual(0);
    });
    test("processMin(1, 5, 15) should equal 5", () => {
        expect(processMin(1, 5, 15)).toEqual(5);
    });
    test("processMin(1, undefined, 15) should equal 15", () => {
        expect(processMin(1, undefined, 15)).toEqual(15);
    });

    // max
    test("processMax should return the contentLength when there is no defined 2nd arg", () => {
        expect(processMax(0, undefined, 25)).toEqual(25);
    });
    test("processMax takes the value of the sourceOfMax when it is present", () => {
        expect(processMax(1, 15, 25)).toEqual(15);
        expect(processMax(2, 15, 25)).toEqual(15);
        // params: index, sourceOfMax, contentLength
    });
});
