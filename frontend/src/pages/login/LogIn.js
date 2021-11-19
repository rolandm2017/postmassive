import React, { useState } from "react";
import { useAuth } from "../../auth/use-auth";

// import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Logo from "../../images/gps-searching.png";

import {
    sendLogInIfInfoIsValid,
    handleAddUsernameOrEmail,
} from "../../loginTools/util";
import { validPassword } from "../../loginTools/Validation";

import "./LogIn.scss";

function LogIn(props) {
    // TODO: finish this page!!! it is unfinished
    const [username, setUsername] = useState("marle");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("ilovecronoa");
    const [error, setError] = useState("");
    const [desktopLoginError, setDesktopLoginError] = useState(""); // todo; remove this desktoPLogInerror universally, p sure its worthless

    const auth = useAuth();
    // import login func

    const handlePassword = (pass) => {
        // validates password and sets pw if it is valid so its ready to be sent to server
        console.log(pass.target.value, validPassword(pass.target.value));
        if (validPassword(pass.target.value)) {
            setPassword(pass.target.value);
        }
    };

    return (
        <div id="log-in-screen_container" className="background-blue">
            <div id="log-in_main">
                <div id="log-in_container">
                    <div id="log-in_logo-container">
                        <img src={Logo} alt="PostMassiv Logo" />
                    </div>
                    <div id="log-in_headline-container">
                        <h1>Log in to PostMassive</h1>
                    </div>
                    <div id="log-in_input-container">
                        <div className="mt-3">
                            <h4>Email or Username</h4>
                            <input
                                onChange={(value) =>
                                    handleAddUsernameOrEmail(
                                        value.target.value,
                                        setUsername,
                                        setEmail
                                    )
                                }
                            />
                        </div>
                        <div className="mt-2">
                            <h4>Password</h4>
                            <input
                                type="password"
                                onChange={(value) => handlePassword(value)}
                            />
                        </div>
                        <div
                            id="log-in-button-container"
                            className="d-flex align-items-center justify-content-left"
                        >
                            <Button
                                className="mt-4"
                                onClick={() =>
                                    sendLogInIfInfoIsValid(
                                        username,
                                        email,
                                        password,
                                        false, // displayErrInModal = false, so it will be DesktopLoginError
                                        setError,
                                        setDesktopLoginError,
                                        auth
                                    )
                                }
                            >
                                Log in
                            </Button>
                            <p className="mt-4 pl-3">
                                {desktopLoginError} {error}
                                {/* // remove error if it shwos double */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
