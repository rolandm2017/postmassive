import React, { useState, useEffect } from "react";

import { useAuth } from "../../auth/use-auth";

import DatePicker from "react-datepicker";

import {
    // formCheck,
    // usernameServerCheck,
    // usernameIsValid,
    // emailIsValid,
    validPassword,
    // verifyUsernameAndPassword,
    verifyCode,
} from "./Validation";

import {
    handleAddUsernameOrEmail,
    sendLogInIfInfoIsValid,
    handlePageOne,
    handlePageTwo,
    handlePageThree,
    handleFinish,
} from "./util";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";

import Button from "../../components/parts/Button";

import Logo from "../../images/gps-searching.png";
import Search from "../../images/icons8-search-64.png";
import UserGroups from "../../images/icons8-user-groups-50.png";
import Chat from "../../images/icons8-chat-50.png";

import "react-datepicker/dist/react-datepicker.css";
import "./Landing.scss";

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
    const [verifiable, setVerifiable] = useState("");
    const [error, setError] = useState("");
    const [desktopLoginError, setDesktopLoginError] = useState("");

    const auth = useAuth();

    useEffect(() => {
        document.title = "PostMassiv. Say it loud";
    }, []);

    useEffect(() => {
        document.title = "PostMassiv";
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
        // validates password and sets pw if it is valid so its ready to be sent to server
        console.log(pass.target.value, validPassword(pass.target.value));
        if (validPassword(pass.target.value)) {
            setPassword(pass.target.value);
        }
    };

    const handleUsername = (username) => {
        setUsername(username.target.value);
    };

    // const handleVerification = (code) => {
    //     // fixme: first, only allow user to click "send verification code" btn when code.length=6
    //     // fixme: second, only tell the server to await completion of the signup process once the
    //     // verification code has been received
    //     // ...to prevent clever hackers from passing to the final modal without receiving the a-ok from the server.
    //     // so really the verification code is partially a UX thing.
    //     // fixme: third, discover what twitter does in the final step of signing up, and copy it!
    //     setVerificationCode(code);
    // };

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
        // if (DEMO) {
        //     // TODO: fwd to logged in with fake auth
        //     auth.signIn("Crono", "", "ilovemarle", {
        //         pathname: "/home",
        //     }).catch((err) => {
        //         console.log("math!", err);
        //         if (false) {
        //             setError(err);
        //         } else {
        //             setDesktopLoginError(err);
        //         }
        //     });
        //     return;
        // }
        setShowPage(1);
    };

    return (
        <div id="landing" className="main-container">
            <Modal
                show={logIn}
                onHide={handleCloseLogIn}
                centered
                animation={false}
            >
                <Modal.Header closeButton className="black-button">
                    <Modal.Title>Log in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Username or email"
                            aria-label="Username or email"
                            aria-describedby="basic-addon1"
                            onChange={(value) =>
                                handleAddUsernameOrEmail(value.target.value)
                            }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Password"
                            aria-label="Password"
                            type="password"
                            aria-describedby="basic-addon1"
                            onChange={(value) => handlePassword(value)}
                        />
                    </InputGroup>
                    {/* FIXME IMPORTANT: onKeyUp, if key is enter, submit form. will need this on login&signup modal */}
                </Modal.Body>
                <Modal.Footer>
                    <p id="landing_error" className="black-text">
                        {error}
                    </p>
                    <BootstrapButton
                        variant="primary"
                        onClick={() =>
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
                        disabled={false}
                    >
                        Log In
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
            {/* sign up modal */}
            <Modal
                show={showPage === 1}
                onHide={handleClose}
                centered
                animation={false}
            >
                <Modal.Header closeButton className="black-button">
                    <Modal.Title>Create your account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                            onChange={(value) => handleName(value)}
                            defaultValue={"Marle Guardia"}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            onChange={(value) => handleEmail(value)}
                            defaultValue={"marle@guardia.gov"}
                        />
                    </InputGroup>
                    <h6 className="lightmode-text">
                        Type in your date of birth
                    </h6>
                    {/* // FIXME: The DatePicker SUCKS. Replace it. It shows a calendar dropdown BUT there is no year selector. */}
                    <DatePicker
                        selected={date}
                        onChange={(value) => handleDate(value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <p className="landing_error black-text">{error}</p>
                    <BootstrapButton
                        variant="primary"
                        onClick={() => {
                            handlePageOne(
                                name,
                                email,
                                date,
                                setShowPage,
                                setError
                            );
                        }}
                        disabled={false}
                    >
                        Next
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showPage === 2}
                onHide={handleClose}
                centered
                animation={false}
            >
                <Modal.Header closeButton className="black-button">
                    <Modal.Title>Select your username and password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(value) => handleUsername(value)}
                            defaultValue={"marle"}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="password"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            onChange={(value) => handlePassword(value)}
                            defaultValue={"ilovecrono"}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <p className="landing_error black-text">{error}</p>
                    <BootstrapButton
                        variant="primary"
                        onClick={() => {
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
                        disabled={false}
                    >
                        Next
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showPage === 3}
                onHide={handleClose}
                centered
                animation={false}
            >
                <Modal.Header closeButton className="black-button">
                    <Modal.Title>We sent you a verification code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Verification"
                            aria-label="Verification"
                            aria-describedby="basic-addon1"
                            onChange={(event) => {
                                console.log("code is now:", event.target.value);
                                setVerificationCode(event.target.value);
                            }}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <p className="landing_error">{error}</p>
                    <BootstrapButton
                        variant="primary"
                        onClick={() => {
                            handlePageThree(
                                verificationCode,
                                email,
                                setVerifiable,
                                setShowPage,
                                setError
                            );
                        }}
                        disabled={false}
                    >
                        Next
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showPage === 4}
                onHide={handleClose}
                centered
                animation={false}
            >
                <Modal.Header closeButton className="black-button">
                    <Modal.Title>You're all set!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    (TODO: figure out what Twitter does after verification)
                </Modal.Body>
                <Modal.Footer>
                    <p className="landing_error">
                        {error ? <p>Error:</p> : null}
                        {error}
                    </p>
                    <BootstrapButton
                        variant="primary"
                        onClick={() => {
                            handleFinish();
                        }}
                        disabled={false}
                    >
                        Next
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
            <div id="landing_main" className="d-flex">
                <div
                    id="landing_right-and-header"
                    className="landing_width-adjustment d-flex justify-content-center"
                >
                    <div id="landing_desktop-header">
                        <div className="landing_input">
                            <label>Email or Username</label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={(value) =>
                                        handleAddUsernameOrEmail(
                                            value.target.value
                                        )
                                    }
                                    onKeyUp={logInIfEnterKeyIsPressed}
                                />
                            </InputGroup>
                        </div>
                        <div className="landing_input">
                            <label>Password</label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Password"
                                    type="password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                    onChange={(value) => handlePassword(value)}
                                    onKeyUp={logInIfEnterKeyIsPressed}
                                />
                            </InputGroup>
                            <h6 className="lightmode-text">Forgot password?</h6>
                            <p className="black-text">{desktopLoginError}</p>
                        </div>
                        <div>
                            <Button
                                onClick={() =>
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
                                text="Log In"
                                type="submit"
                            ></Button>
                        </div>
                    </div>
                    <div className="parent-container">
                        <div id="landing_logo">
                            <img
                                id="landing_logo-img"
                                src={Logo}
                                alt="PostMassiv Logo"
                            ></img>
                        </div>
                        <div id="landing_prompt">
                            <h3 className="lightmode-text">
                                Hear the world's loudest social media.
                            </h3>
                        </div>
                        <div id="landing_join">
                            <h5 className="lightmode-text">
                                Join PostMassiv today.
                            </h5>
                        </div>
                        <div id="landing_buttons">
                            {/* // FIXME: buttons need space between them again */}
                            <div>
                                <Button
                                    text="Sign Up"
                                    blueBg={true}
                                    onClick={() => {
                                        handleShow();
                                    }}
                                ></Button>
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
                <div
                    id="landing_left-and-banner"
                    className="landing_width-adjustment d-flex justify-content-center"
                >
                    <div className="tagline">
                        <div className="tagline d-flex align-items-center">
                            <img src={Search} alt="Search" width="50px"></img>
                            <h4 className="lightmode-text">
                                Follow your interests.
                            </h4>
                        </div>
                        <div className="tagline d-flex align-items-center">
                            <img
                                src={UserGroups}
                                alt="People"
                                width="50px"
                            ></img>
                            <h4 className="lightmode-text">
                                Hear what people are saying.
                            </h4>
                        </div>
                        <div className="tagline d-flex align-items-center">
                            <img src={Chat} alt="Chat" width="50px"></img>
                            <h4 className="lightmode-text">
                                Get your word out.
                            </h4>
                        </div>
                    </div>
                </div>
                <div id="landing_repeat-buttons">
                    <div
                        id="landing_repeat-buttons-inline"
                        className="d-flex justify-content-center align-items-center"
                    >
                        {/* <button className="landing_button landing_sign-up">
                            Sign Up
                        </button> */}
                        <BootstrapButton
                            className="landing_button landing_sign-up d-flex force-sea-blue justify-content-center align-items-center"
                            variant="primary"
                            onClick={() => {
                                handleShow();
                            }}
                        >
                            {/* // FIXME: these 2 btns handleShow and handleLogIn definitely need to be updated */}
                            Sign Up
                        </BootstrapButton>
                        <button
                            className="d-flex justify-content-center align-items-center"
                            onClick={() => {
                                handleLogIn();
                            }}
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </div>

            <footer
                id="landing_footer"
                className="d-flex justify-content-around flex-row flex-wrap"
            >
                <div>About</div>
                <div>Help Center</div>
                <div>Terms</div>
                <div>Privacy Policy</div>
                <div>Cookies</div>
                <div>Ads Info</div>
                <div>Blog</div>
                <div>Status</div>
                <div>Jobs</div>
                <div>Brand</div>
                <div>Advertise</div>
                <div>Settings</div>
                <div>2020 PostMassiv Inc.</div>
            </footer>
        </div>
    );
}

export default Landing;

// FIXME: modal error msg styling is off, improve.
