import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";

import Button from "../../components/parts/Button";

function LogInModal({
    logIn,
    handleCloseLogIn,
    handleAddUsernameOrEmail,
    handleAddPassword,
    sendLogInIfInfoIsValid,
}) {
    return (
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
                        onChange={handleAddUsernameOrEmail}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Password"
                        aria-label="Password"
                        type="password"
                        aria-describedby="basic-addon1"
                        onChange={handleAddPassword}
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
                    onClick={sendLogInIfInfoIsValid}
                    disabled={false}
                >
                    Log In
                </BootstrapButton>
            </Modal.Footer>
        </Modal>
    );
}

export default LogInModal;
