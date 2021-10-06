import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";

import "./Modal.scss";

function LogInModal({
    logIn,
    handleCloseLogIn,
    handleAddUsernameOrEmail,
    handleAddPassword,
    sendLogInIfInfoIsValid,
    error,
}) {
    return (
        <Modal
            show={logIn}
            onHide={handleCloseLogIn}
            centered
            animation={false}
        >
            <div className="modal-container">
                <div className="modal-header-container w-100">
                    <div className="modal-header">
                        <h3>Log in</h3>
                        <p>Log into your account</p>
                    </div>
                </div>
                <div className="w-100">
                    <div>
                        <div className="modal-input">
                            <input placeholder="Username or email" />
                        </div>
                    </div>
                    <div>
                        <div className="modal-input">
                            <input placeholder="Password" />
                        </div>
                    </div>
                </div>
                <div className="w-100">
                    <div className="modal-button-mod">
                        <BootstrapButton
                            variant="primary"
                            onClick={() => {
                                sendLogInIfInfoIsValid();
                            }}
                            disabled={false}
                        >
                            Log In
                        </BootstrapButton>
                    </div>
                    <div className="modal-message">
                        {error ? (
                            <p id="landing_error" className="black-text">
                                {error}
                            </p>
                        ) : (
                            <p>
                                No account? <span>Register now</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {/* <Modal.Header closeButton className="bgColor fontSize textColor">
                <Modal.Title>Log in</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bgColor fontSize textColor">
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
            </Modal.Body>
            <Modal.Footer className="bgColor fontSize textColor">
                <p id="landing_error" className="black-text">
                    {error}
                </p>
                <BootstrapButton
                    variant="primary"
                    onClick={() => {
                        sendLogInIfInfoIsValid();
                    }}
                    disabled={false}
                >
                    Log In
                </BootstrapButton>
            </Modal.Footer> */}
        </Modal>
    );
}

export default LogInModal;
