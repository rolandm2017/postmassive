const {
    checkIfAllCharsAreAcceptedInName,
    userIsOlderThan13,
    // getAttemptsByEmail,
    getUserVerificationCode,
    generateUserVerificationCode,
    // hashPasswordCreateUserAccountAndSendVerificationCode,
    // increaseFailedVerificationAttempts,
    // approveAccountCreation,
} = require("./util");

// commented out = cant figure out how to test it

test("checkIfAllCharsAreAcceptedInName", async () => {
    expect(checkIfAllCharsAreAcceptedInName("Shephen Colbert").toBe(true));
    expect(checkIfAllCharsAreAcceptedInName("Stefani Germotta").toBe(true));
    expect(checkIfAllCharsAreAcceptedInName("Jon Stewart").toBe(true));
    expect(checkIfAllCharsAreAcceptedInName("Barack Obama").toBe(true));
    expect(checkIfAllCharsAreAcceptedInName("A B").toBe(false));
    expect(checkIfAllCharsAreAcceptedInName("C Z").toBe(false));
    expect(checkIfAllCharsAreAcceptedInName("Allan K").toBe(false));
    expect(checkIfAllCharsAreAcceptedInName("H Jeremiah").toBe(false));
});

const tenYearsAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 10)
);
const thirteenYearsAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 13)
);
const fifteenYearsAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 15)
);
const thirtyYearsAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 30)
);

test("checkUserIsOlderThan13", async () => {
    expect(userIsOlderThan13(fifteenYearsAgo).toBe(true));
    expect(userIsOlderThan13(thirtyYearsAgo).toBe(true));
    expect(userIsOlderThan13(thirteenYearsAgo).toBe(false));
    expect(userIsOlderThan13(tenYearsAgo).toBe(false));
});

// test("getAttemptsByEmail", async () => {
//     // how to test this?
//     expect(true.toBe(true));
// });

// test("increaseFailedVerificationAttempts", async () => {
//     expect(true.toBe(true));
// });

test("the return value is 6 chars long", async () => {
    expect(generateUserVerificationCode().toHaveLength(6));
    expect(generateUserVerificationCode().toHaveLength(6));
});
