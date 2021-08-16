// todo: unit test of primary use-auth funcs
import React from "react";
import { ProvideAuth, userValue } from "./auth/use-auth";

function Test(props) {}

const userData = {
    name: "Marle Guardia",
    email: "marle@guardia.gov",
    username: "marle",
};

function setupFetchStub(data) {
    return function fetchStub(_url) {
        return new Promise((resolve) => {
            resolve({
                json: () =>
                    Promise.resolve({
                        userData,
                    }),
            });
        });
    };
}

it("doesnt really fetch", async () => {
    const fakeData = userData;
    jest.spyOn(global, "fetch").mockImplementation(setupFetchStub(fakeData));

    const res = await fetch("anyUrl");
    const json = await res.json();
    expect(json).toEqual({ data: fakeData });

    global.fetch.mockClear();
});

it("successfully fetches the user object", async () => {
    const auth = useAuth();
    const userData = auth.signIn({
        username: "marle",
        password: "ilovecronoa",
    });
    expect(userData).toEqual({
        name: "Marle Guardia",
        email: "marle@guardia.gov",
        username: "marle",
    });
});
