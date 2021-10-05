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

import Display from "./components/Display";
import Footer from "./components/Footer";

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
        <div id="landing" className="main-container w-100">
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

            <div id="landing_main" className="insert-ui-man-here">
                <div id="landing_main-container" className="dark-bg">
                    <div
                        id="landing_ui-man-left"
                        className="desktop-splitter r-debug aa-debug"
                    >
                        <div>
                            <img id="landing_ui-man-bg" src={BackgroundMan} />
                        </div>
                    </div>
                    <div id="landing_display" className="desktop-splitter">
                        <div id="landing_desktop-copyright">
                            {/* // top display for desktop */}
                            <p>2021 Postmassive Inc.</p>
                        </div>
                        <Display
                            handleLogIn={() => {
                                handleLogIn();
                            }}
                            handleShow={() => {
                                handleShow();
                            }}
                        />
                        <div id="landing_mobile-only-show">
                            <div id="landing_ui-man-container">
                                <img
                                    id="landing_mobile-ui-man"
                                    src={BackgroundMan}
                                />
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
                <footer id="landing_footer">
                    <Footer />
                </footer>
            </div>
        </div>
    );
}

export default Landing;

// FIXME: modal error msg styling is off, improve.
