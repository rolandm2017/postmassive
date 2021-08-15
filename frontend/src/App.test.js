import fetchMock from "fetch-mock";
// todo: test signup/signIn with ... fake backend
// todo: integration test. "so long as the return value from server is good, /home,/explore,/messages renders right"

import Enzyme from "enzyme";

class MockApi {
    mockGetCarriers() {
        fetchMock.get("/", carrierResponse);
        fetchMock.get("/home", homeRouteResponse);
        fetchMock.get("/signIn", signInResponse);
        fetchMock.get("/signUp", signUpResponse);
        fetchMock.get("/signOut", signOutResponse);
    }

    mockSubmitDetails() {
        fetchMock.post("/label", labelResponse);
    }
}

export const mockApi = new MockApi();

const labelResponse = {
    labelUrl: "www.example.com/123456789",
};
const carrierResponse = {
    carrier: [
        {
            name: "Carrier 1",
            rating: "5/10",
        },
        {
            name: "Carrier 2",
            rating: "7/10",
        },
    ],
};
