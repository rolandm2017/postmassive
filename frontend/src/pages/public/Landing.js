import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { useAuth } from "../../auth/use-auth";

import { validPassword } from "../../loginTools/Validation";

import {
    handleAddUsernameOrEmail,
    sendLogInIfInfoIsValid,
    handlePageOne,
    handlePageTwo,
    handlePageThree,
    handleFinish,
} from "../../loginTools/util";

// import InputGroup from "react-bootstrap/InputGroup";
// import FormControl from "react-bootstrap/FormControl";
import BootstrapButton from "react-bootstrap/Button";

import Button from "../../components/parts/Button";

import Logo from "../../images/gps-searching.png";
// import Search from "../../images/icons8-search-64.png";
// import UserGroups from "../../images/icons8-user-groups-50.png";
// import Chat from "../../images/icons8-chat-50.png";

import "react-datepicker/dist/react-datepicker.css";
import "./Landing.scss";

import LogInModal from "./modals/LogInModal";
import NameEmailBirthdayModal from "./modals/signUpFlow/NameEmailBirthdayModal";
import UsernamePasswordModal from "./modals/signUpFlow/UsernamePasswordModal";
import ValidationCodeModal from "./modals/signUpFlow/ValidationCodeModal";
import AllSetModal from "./modals/signUpFlow/AllSetModal";

import BackgroundMan from "../../images/IllustrationForPortfolio.png";
import Ellipse from "../../images/middleLayer.svg";

function Landing(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());
    const [logIn, setLogIn] = useState(false);
    const [showPage, setShowPage] = useState(false);
    // FIXME: what should initial state for verificationCode be? empty string? im not so sure the logic works.
    const [verificationCode, setVerificationCode] = useState("");
    // FIXME: what is "verifiable"? name it better, u dunno what it does now
    const [verifiable, setVerifiable] = useState(""); // todo: delete this, it doesn't do anything
    const [error, setError] = useState("");
    const [desktopLoginError, setDesktopLoginError] = useState("");

    const auth = useAuth();
    const history = useHistory();

    useEffect(() => {
        document.title = "PostMassive. Say it loud";
        console.log("is this var worthless?", verifiable);
    }, [verifiable]);

    useEffect(() => {
        document.title = "PostMassive";
    }, []);

    const handleDate = (date) => {
        setDate(date);
    };

    const handleEmail = (email) => {
        setEmail(email.target.value);
    };

    const handleName = (name) => {
        setName(name.target.value);
    };

    const handlePassword = (pass) => {
        if (validPassword(pass.target.value)) {
            setPassword(pass.target.value);
        }
    };

    const handleUsername = (username) => {
        setUsername(username.target.value);
    };

    const handleLogIn = () => {
        setLogIn(true);
    };
    const handleCloseLogIn = () => {
        setLogIn(false);
    };

    const logInIfEnterKeyIsPressed = (event) => {
        if (event.key === "Enter") {
            sendLogInIfInfoIsValid(
                username,
                email,
                password,
                true,
                setError,
                setDesktopLoginError,
                auth
            );
        }
    };

    const handleClose = () => setShowPage({ show: false });
    const handleShow = () => {
        setShowPage(1);
    };

    return (
        <div id="landing" className="main-container">
            <LogInModal
                logIn={logIn}
                handleCloseLogIn={handleCloseLogIn}
                handleAddUsernameOrEmail={(value) =>
                    handleAddUsernameOrEmail(
                        value.target.value,
                        setUsername,
                        setEmail
                    )
                }
                handleAddPassword={(value) => handlePassword(value)}
                sendLogInIfInfoIsValid={() =>
                    sendLogInIfInfoIsValid(
                        username,
                        email,
                        password,
                        true,
                        setError,
                        setDesktopLoginError,
                        auth
                    )
                }
                error={error}
            />
            {/* sign up modal */}
            <NameEmailBirthdayModal
                showPage={showPage === 1}
                handleClose={handleClose}
                handleName={(value) => handleName(value)}
                handleEmail={(value) => handleEmail(value)}
                handleDate={(value) => handleDate(value)}
                handlePageOne={() => {
                    handlePageOne(name, email, date, setShowPage, setError);
                }}
                error={error}
                date={date}
            />
            <UsernamePasswordModal
                showPage={showPage === 2}
                handleClose={handleClose}
                handleUsername={(value) => handleUsername(value)}
                handlePassword={(value) => handlePassword(value)}
                handlePageTwo={() => {
                    handlePageTwo(
                        username,
                        email,
                        password,
                        name,
                        date,
                        setShowPage,
                        setError
                    );
                }}
                error={error}
            />
            <ValidationCodeModal
                showPage={showPage === 3}
                handleClose={handleClose}
                setVerificationCode={(event) => {
                    console.log("code is now:", event.target.value);
                    setVerificationCode(event.target.value);
                }}
                handlePageThree={() => {
                    handlePageThree(
                        verificationCode,
                        email,
                        setVerifiable,
                        setShowPage,
                        setError
                    );
                }}
                error={error}
            />
            <AllSetModal
                showPage={showPage === 4}
                handleClose={handleClose}
                handleFinish={() => {
                    handleFinish(history.push("/home"));
                }}
                error={error}
            />

            <div id="landing_main" className="d-flex insert-ui-man-here">
                <div id="landing_ui-man"></div>
                <div
                    id="landing_right-and-header"
                    className="landing_width-adjustment d-flex justify-content-between flex-column flex-column align-items-center"
                >
                    <div className="top-container-for-logo flex-column align-items-end w-100 mobile-hide-instead-of-flex">
                        <div className="pr-2 mr-5 mt-2">
                            <p className="my-0 uxui-grey-text">
                                2021 Postmassive Inc.
                            </p>
                        </div>
                    </div>
                    <div className="parent-container">
                        <div id="landing_logo">
                            <div>
                                <img
                                    id="landing_logo-img"
                                    src={Logo}
                                    alt="PostMassiv Logo"
                                ></img>
                            </div>
                            <div className="pr-2 mt-2">
                                <p className="my-0 uxui-grey-text">
                                    2021 Postmassive Inc.
                                </p>
                            </div>
                        </div>

                        <div id="landing_prompt">
                            <h3 className="darkmode-text header-text-large">
                                Hear the world's loudest social media.
                            </h3>
                        </div>
                        <div id="landing_join">
                            <h5 className="darkmode-text header-subtitle-text">
                                Join PostMassive today.
                            </h5>
                        </div>
                        <div id="landing_buttons">
                            {/* // FIXME: buttons need space between them again */}
                            <div className="d-flex mt-4 mobile-desktop-spacing-adjust justify-content-between">
                                <div className="uxui-landing-btn-width-mod mr-3">
                                    <Button
                                        text="Sign Up"
                                        blueBg={true}
                                        onClick={() => {
                                            handleShow();
                                        }}
                                    ></Button>
                                </div>
                                <div className="uxui-landing-btn-width-mod">
                                    <Button
                                        text="Log In"
                                        blueBg={false}
                                        onClick={() => {
                                            handleLogIn();
                                        }}
                                    ></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>{/* utility div */}</div>
                </div>
                <div id="landing_mobile-lower-blob">
                    <div
                        id="landing_footer"
                        className="justify-content-around flex-row flex-wrap mobile-show-instead-of-hide"
                    >
                        <div className="darkmode-text">About</div>
                        <div className="darkmode-text">Help Center</div>
                        <div className="darkmode-text">Terms</div>
                        <div className="darkmode-text">Privacy Policy</div>
                        <div className="darkmode-text">Cookies</div>
                        <div className="darkmode-text">Ads Info</div>
                        <div className="darkmode-text">Blog</div>
                        <div className="darkmode-text">Status</div>
                        <div className="darkmode-text">Jobs</div>
                        <div className="darkmode-text">Brand</div>
                        <div className="darkmode-text">Advertise</div>
                        <div className="darkmode-text">Settings</div>
                    </div>
                </div>
                <div
                    id="landing_width-adapter"
                    className="w-50 h-100 landing_mobile-remover"
                    style={{ border: "5px dotted cyan" }}
                >
                    <div
                        className="d-flex justify-content-start align-items-start"
                        id="landing_svg-container-outer"
                    >
                        <div
                            id="landing_left-and-banner"
                            className="d-flex justify-content-center align-items-center landing_svg-positioning"
                        >
                            <img id="background" src={BackgroundMan} />
                        </div>
                    </div>
                </div>
            </div>

            <footer
                id="landing_footer"
                className="justify-content-around flex-row flex-wrap mobile-hide-instead-of-flex"
            >
                <div className="darkmode-text">About</div>
                <div className="darkmode-text">Help Center</div>
                <div className="darkmode-text">Terms</div>
                <div className="darkmode-text">Privacy Policy</div>
                <div className="darkmode-text">Cookies</div>
                <div className="darkmode-text">Ads Info</div>
                <div className="darkmode-text">Blog</div>
                <div className="darkmode-text">Status</div>
                <div className="darkmode-text">Jobs</div>
                <div className="darkmode-text">Brand</div>
                <div className="darkmode-text">Advertise</div>
                <div className="darkmode-text">Settings</div>
            </footer>
        </div>
    );
}

export default Landing;

// FIXME: modal error msg styling is off, improve.
