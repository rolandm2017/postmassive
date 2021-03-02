import React from "react";
import Adapter from "enzyme-adapter-react-16";

import Enzyme, { shallow, configure } from "enzyme";

import Landing from "./Landing";
import * as VALIDATION from "./Validation";
import Modal from "react-bootstrap/Modal";

configure({ adapter: new Adapter() });

describe("client side input validation functions", () => {
    let wrapper;
    // let instance;
    beforeEach(() => {
        wrapper = shallow(<Landing />);
        // instance = wrapper.instance();
    });

    // *** *** ***
    // Unit tests: Verification functions
    // *** *** ***

    it("says the email is valid", () => {
        expect(VALIDATION.emailIsValid("foo@bar.com")).toBe(true);
        expect(VALIDATION.emailIsValid("rolypoly@gmail.com")).toBe(true);
        expect(VALIDATION.emailIsValid("ConorM93@gmail.com")).toBe(true);
    });

    it("rejects the malformed email", () => {
        expect(VALIDATION.emailIsValid("foobar.com")).toBe(false);
        expect(VALIDATION.emailIsValid("rolypoly@gmailcom")).toBe(false);
        expect(VALIDATION.emailIsValid("ConorM93gdfgdgcom")).toBe(false);
    });

    it("accepts the name", () => {
        expect(VALIDATION.verifyName("Andrew Garfield")).toBe(true);
        expect(VALIDATION.verifyName("Roly Poly")).toBe(true);
        expect(VALIDATION.verifyName("Terry Fox")).toBe(true);
    });

    it("rejects the unfinished name", () => {
        expect(VALIDATION.verifyName("Roland M")).toBe(false);
        expect(VALIDATION.verifyName("Roland M.")).toBe(false);
        expect(VALIDATION.verifyName("Sarah")).toBe(false);
    });

    it("accepts people older than 13", () => {
        expect(
            VALIDATION.verifyDateOfBirth(new Date("2005-09-03T16:01:55.104Z"))
        ).toBe(true);
        expect(
            VALIDATION.verifyDateOfBirth(new Date("1990-09-03T16:01:55.104Z"))
        ).toBe(true);
    });

    it("rejects birthdays from less than 13 years ago", () => {
        expect(VALIDATION.verifyDateOfBirth(new Date())).toBe(false);
        expect(
            VALIDATION.verifyDateOfBirth(new Date("2009-09-03T16:01:55.104Z"))
        ).toBe(false);
    });

    it("accepts the username", () => {
        expect(VALIDATION.usernameIsValid("roly__poly")).toBe(true);
        expect(VALIDATION.usernameIsValid("plutownium393")).toBe(true);
        expect(VALIDATION.usernameIsValid("i_love_posting")).toBe(true);
        expect(
            VALIDATION.verifyUsernameAndPassword("roly__poly", "jibberish")
        ).toBe(true);
        expect(
            VALIDATION.verifyUsernameAndPassword("plutownium393", "jibberish")
        ).toBe(true);
        expect(
            VALIDATION.verifyUsernameAndPassword("i_love_posting", "jibberish")
        ).toBe(true);
    });

    it("rejects the malformed username", () => {
        expect(VALIDATION.usernameIsValid("otherwise__fine__a")).toBe(false);
        expect(VALIDATION.usernameIsValid("abcdefghijklmnopqrs")).toBe(false);
        expect(VALIDATION.usernameIsValid("postmassiv")).toBe(false);
        expect(
            VALIDATION.verifyUsernameAndPassword(
                "otherwise__fine__a",
                "jibberish"
            )
        ).toHaveProperty("msg", "Too many underscores.");
        expect(
            VALIDATION.verifyUsernameAndPassword(
                "abcdefghijklmnopqrs",
                "jibberish"
            )
        ).toHaveProperty("msg", "Name must be 1 to 16 characters in length.");
        expect(
            VALIDATION.verifyUsernameAndPassword("postmassiv", "jibberish")
        ).toHaveProperty(
            "msg",
            `Cannot use "Admin" or any form of "PostMassiv".`
        );
        expect(
            VALIDATION.verifyUsernameAndPassword("cantUseAdmin", "jibberish")
        ).toHaveProperty(
            "msg",
            `Cannot use "Admin" or any form of "PostMassiv".`
        );
        expect(
            VALIDATION.verifyUsernameAndPassword("roly poly", "jibberish")
        ).toHaveProperty("msg", "No spaces allowed.");
    });

    it("accepts these valid passwords", () => {
        expect(VALIDATION.validPassword("123456one")).toBe(true);
        expect(VALIDATION.validPassword("abcdefghijklmnopqrstuvwxyzMAX")).toBe(
            true
        );
        expect(VALIDATION.validPassword("moneywave2020!@#$%^&*()_+ABCD")).toBe(
            true
        );
    });

    it("rejeects malformed passwords", () => {
        expect(VALIDATION.validPassword("short")).toBe(false);
        expect(
            VALIDATION.validPassword("a_few_characters_too_long_for_a_password")
        ).toBe(false);
        expect(VALIDATION.validPassword("1")).toBe(false);
    });

    it("accepts the code", () => {
        expect(VALIDATION.verifyCode("AaZz09", (x) => x)).toBe(true);
        expect(VALIDATION.verifyCode("bbbb83", (x) => x)).toBe(true);
    });

    it("rejects the malicious code", () => {
        expect(VALIDATION.verifyCode(";;3[{}]", (x) => x)).toBe(false);
        expect(VALIDATION.verifyCode("{}a}..", (x) => x)).toBe(false);
        expect(VALIDATION.verifyCode("too_long", (x) => x)).toBe(false);
    });

    it("accepts usernames and emails, & rejects inputs that are neither", () => {
        // valid usernames and emails
        expect(VALIDATION.verifyUsernameOrEmail("Crono")).toBe(true);
        expect(VALIDATION.verifyUsernameOrEmail("rolypolyistaken")).toBe(true);
        expect(
            VALIDATION.verifyUsernameOrEmail("rolandlaurent@cologne.com")
        ).toBe(true);

        // invalid, malformed usernames and emails
        expect(VALIDATION.verifyUsernameOrEmail("too_many_under_scores")).toBe(
            false
        );
        expect(
            VALIDATION.verifyUsernameOrEmail("malformedEmail@jimminy.")
        ).toBe(false);
    });

    // *** *** ***
    // Integration tests with Mock Server
    // *** *** ***

    it("accepts valid usernames, rejects malformed usernames with specific reason", async () => {
        // goes to mockServer route "/signup/validate/username" and development server route ""

        // @@@ &&& @@@ &&&
        // NOTE: the mock server has to be running for these to work!
        // @@@ &&& @@@ &&&

        // "accepted" usernames
        const accepted1 = await VALIDATION.usernameServerCheck("Crono");
        const accepted2 = await VALIDATION.usernameServerCheck(
            "0123456789abcde"
        );
        expect(accepted1).toBe("accepted");
        expect(accepted2).toBe("accepted");

        // "error" because underscores, whitespace, or length
        const err1 = await VALIDATION.usernameServerCheck("abc_d_e_f");
        const err2 = await VALIDATION.usernameServerCheck("");
        const err3 = await VALIDATION.usernameServerCheck(
            "really_lengthy_username"
        );
        expect(err1).toBe("error");
        expect(err2).toBe("error");
        expect(err3).toBe("error");

        // banned chars detected section
        const bannedChars1 = await VALIDATION.usernameServerCheck(
            "uses whitespace"
        );
        const bannedChars2 = await VALIDATION.usernameServerCheck(
            "notAllowed$^&*"
        );
        expect(bannedChars1).toBe("banned_chars_detected");
        expect(bannedChars2).toBe("banned_chars_detected");

        // banned words
        const postMassivIsBanned = await VALIDATION.usernameServerCheck(
            "usesPostMassiv"
        );
        const adminIsBanned = await VALIDATION.usernameServerCheck("usesAdmin");

        // "Ohjjb" and "ohjjfs" are Caesar Ciphers for awful words.
        const nWordIsBanned =
            (await VALIDATION.usernameServerCheck("usesOhjjb")) &&
            (await VALIDATION.usernameServerCheck("usesOhjjfs"));
        expect(postMassivIsBanned).toBe("banned_word_detected");
        expect(adminIsBanned).toBe("banned_word_detected");
        expect(nWordIsBanned).toBe("banned_word_detected");

        // TODO: Break this set of tests (in this IT block) to confirm they break when you break them
    });

    it("sends correct, useful error messages during registration", async () => {
        // goes to mockServer route "/signup/validate/personal" and development server route ""

        // @@@ &&& @@@ &&&
        // NOTE: the mock server has to be running for these to work!
        // @@@ &&& @@@ &&&

        const goodName = "Roland Laurent";
        const goodEmail = "roly@gmail.com";
        const goodAge = new Date(1990, 3, 23);
        const badName = "sdflfe";
        const badEmail = "roly@gmail";
        const badAge = new Date(2010, 1, 1);

        const acceptedQuery = await VALIDATION.formCheck(
            goodName,
            goodEmail,
            goodAge
        );
        expect(acceptedQuery).toBe("personal_accepted");
        const rejectedName = await VALIDATION.formCheck(
            badName,
            goodEmail,
            goodAge
        );
        expect(rejectedName).toBe("bad_name");
        const rejectedEmail = await VALIDATION.formCheck(
            goodName,
            badEmail,
            goodAge
        );
        expect(rejectedEmail).toBe("bad_email");

        const rejectedAge = await VALIDATION.formCheck(
            goodName,
            goodEmail,
            badAge
        );
        expect(rejectedAge).toBe("bad_age");

        // TODO: Break this set of tests (in this IT block) to confirm they break when you break them
    });

    // need to test: formcheck,
});

// TODO: test landing page server side verification by mocking responses from server (Can this be done?)

describe("checking modals and buttons", () => {
    it("loads 5 modals", () => {
        const wrapper = shallow(<Landing />);
        expect(wrapper.find(Modal)).toHaveLength(5);
    });
});
