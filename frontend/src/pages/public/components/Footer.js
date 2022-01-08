import React from "react";

import { getOptions } from "../../../_helper/authHeader";

import "./Footer.css";

function Footer() {
    // stick it inside a <footer></footer> or a generic div, I just don't want the space consumed on the screen
    return (
        <div
            id="footer_general"
            className="footer_mobile-desktop-switch footer_mobile-hide-instead-of-flex footer_desktop-color"
        >
            <div
                onClick={() => {
                    // http://127.0.0.1:8080/api/foo
                    let testingURL = process.env.REACT_APP_API_URL + "/foo";
                    console.log("testingUrl:", testingURL);
                    fetch(testingURL, getOptions)
                        .then((res) => {
                            res.text().then((resp) => {
                                console.log(resp);
                            });
                            console.log("conclusion");
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }}
                className="darkmode-text"
            >
                About
            </div>
            <div
                onClick={() => {
                    // http://127.0.0.1:8080/api/auth/
                    let testingURL = process.env.REACT_APP_API_URL + "/auth/";
                    console.log("helpCenter, testingURL:", testingURL);
                    fetch(testingURL, getOptions)
                        .then((res) => {
                            res.text().then((resp) => {
                                console.log(resp);
                            });
                            console.log("line 31");
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }}
                className="darkmode-text mobile-center"
            >
                Help Center
            </div>
            <div
                onClick={() => {
                    console.log("bak");
                }}
                className="darkmode-text mobile-right"
            >
                Terms
            </div>
            <div
                className="darkmode-text"
                onClick={() => {
                    // http://127.0.0.1:8080/api/auth/foo
                    let testingURL =
                        process.env.REACT_APP_API_URL + "/auth/foo";
                    console.log("helpCenter, testingURL:", testingURL);
                    fetch(testingURL, getOptions)
                        .then((res) => {
                            res.text().then((resp) => {
                                console.log(resp);
                            });
                            console.log("line 69");
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }}
            >
                Privacy Policy
            </div>
            <div
                className="darkmode-text mobile-center"
                onClick={() => {
                    // http://127.0.0.1:8080/api/
                    let testingURL = process.env.REACT_APP_API_URL + "/";
                    console.log("helpCenter, testingURL:", testingURL);
                    fetch(testingURL, getOptions)
                        .then((res) => {
                            res.text().then((resp) => {
                                console.log(resp);
                            });
                            console.log("line 94");
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }}
            >
                Cookies
            </div>
            <div className="darkmode-text mobile-right">Ads Info</div>
            <div className="darkmode-text">Blog</div>
            <div className="darkmode-text mobile-center">Status</div>
            <div className="darkmode-text mobile-right">Jobs</div>
            <div className="darkmode-text">Brand</div>
            <div className="darkmode-text mobile-center">Advertise</div>
            <div className="darkmode-text mobile-right">Settings</div>
        </div>
    );
}

export default Footer;
