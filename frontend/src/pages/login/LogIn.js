import React from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

import Logo from "../../images/gps-searching.png";

import "./LogIn.scss";

function LogIn(props) {
    return (
        <div>
            <div id="log-in_main">
                <div id="log-in_container">
                    <div id="log-in_logo-container">
                        <img src={Logo} alt="PostMassiv Logo" />
                    </div>
                    <div id="log-in_headline-container">
                        <h1>Log in to PostMassiv</h1>
                    </div>
                    <div id="log-in_input-container">
                        <Form>
                            <Form.Label htmlFor="log-in_email-input">
                                Password
                            </Form.Label>
                            <Form.Control
                                type="email"
                                id="log-in_email-input"
                                placeholder="Your email"
                                aria-describedby="emailHelpBlock"
                            />
                            <Form.Label htmlFor="log-in_password-input">
                                Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                id="log-in_password-input"
                                placeholder="Your password"
                                aria-describedby="passwordHelpBlock"
                            />
                            <Button>Log in</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
