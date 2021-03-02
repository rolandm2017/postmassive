import Enzyme, { shallow, configure } from "enzyme";
import ProcessAmount from "./ProcessAmount";

describe("testing processAmount function", () => {
    it("throws an error when a string with non-numeric chars is passed", () => {
        expect(() => {
            ProcessAmount("asdf39204");
        }).toThrow("String was input with non-digit chars");
        expect(() => {
            ProcessAmount("934.3");
        }).toThrow("String was input with non-digit chars");
    });

    it("returns null if the input is null", () => {
        expect(ProcessAmount(null)).toBe(null);
    });

    it("throws an error if the input is neither number nor null", () => {
        expect(() => {
            ProcessAmount(undefined);
        }).toThrow("Wrong input type");
        expect(() => {
            ProcessAmount(new Date());
        }).toThrow("Wrong input type");
        expect(() => {
            ProcessAmount([3, 5, 9]);
        }).toThrow("Wrong input type");
        expect(() => {
            ProcessAmount([3, 5, "hotdogs"]);
        }).toThrow("Wrong input type");
        expect(() => {
            ProcessAmount({ username: "Frog" });
        }).toThrow("Wrong input type");
    });

    it("converts 1-3 digit inputs, string or int, to 3 digit outputs", () => {
        expect(ProcessAmount(123)).toBe("123");
        expect(ProcessAmount(3)).toBe("3");
        expect(ProcessAmount("23")).toBe("23");
        expect(ProcessAmount("293")).toBe("293");
    });

    it("adds a comma between the thousands and hundreds columns", () => {
        expect(ProcessAmount(4903)).toBe("4,903");
        expect(ProcessAmount(1000)).toBe("1,000");
        expect(ProcessAmount(9999)).toBe("9,999");
    });

    it("truncates 6 digit #s and adds 'k'", () => {
        expect(ProcessAmount(100000)).toBe("100k");
        expect(ProcessAmount(345678)).toBe("345k");
        expect(ProcessAmount(999999)).toBe("999k");
    });

    it("truncates numbers 7 digits or bigger and adds 'million' with one decimal place", () => {
        expect(ProcessAmount(5999111)).toBe("5.9 million");
        expect(ProcessAmount(1333000, true)).toBe("1.3mil");
        expect(ProcessAmount(89222000)).toBe("89.2 million");
        expect(ProcessAmount(103555555, true)).toBe("103.5mil");
    });

    it("throws an error if you don't pass anything.", () => {
        expect(() => {
            ProcessAmount();
        }).toThrow("Wrong input type");
    });
});
