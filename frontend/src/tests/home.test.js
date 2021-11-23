// demonstrate that the home page loads and user can navigate
// -> profile -> home
// -> msgs -> home
// -> explore -> home

import React from "react"; // so that we can use JSX syntax
import { render, cleanup, waitForElement } from "@testing-library/react"; // testing helpers
import userEvent from "@testing-library/user-event"; // testing helpers for imitating user events
import nock from "nock"; // to mock github API
import {
    FAKE_USERNAME,
    FAKE_USERNAME_PASSWORD,
    FAKE_BAD_USERNAME,
    FAKE_BAD_PASSWORD,
    FAKE_BUNDLE_OF_DATA,
} from "./userData/mockData"; // test data to use in a mock API
// import "./helpers/initTestLocalization"; // to configure i18n for tests // do I need i18n for some reason?

import Home from "../pages/home/Home";
import Post from "../pages/post/Post";
import Messages from "../pages/messages/Messages";

describe("view PostMassive identities by username", () => {
    beforeAll(() => {
        nock("http://127.0.0.1:8080/api")
            .persist()
            .get(`/users/${FAKE_USERNAME}/repos`)
            .query(true)
            .reply(200, FAKE_BUNDLE_OF_DATA);
    });

    afterEach(cleanup);

    // describe("when PM user has an account", () => {
    //     it("can post successfully onto PM and get back a status code", async () => {
    //         // arrange
    //         // act
    //         // assert
    //     });
    // });

    // describe("when PM user has no account", () => {
    //     it("cannot post or view the /home route, gets redirected to /public", async () => {
    //         // arrange
    //         // act
    //         // assert
    //     });
    //     it("can view specific posts", async () => {
    //         // arrange
    //         // act
    //         // assert
    //     });
    // });

    // describe("when PM user does not exist", () => {
    //     it("user is presented with an error message", async () => {
    //         // arrange
    //         // act
    //         // assert
    //     });
    // });
});
