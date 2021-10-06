import React from "react";

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
                <div className="modal-login-inputs w-100">
                    <div className="d-flex justify-content-center">
                        <div className="modal-input modal-w-90">
                            <input
                                placeholder="Username or email"
                                onChange={handleAddUsernameOrEmail}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="modal-input modal-w-90">
                            <input
                                placeholder="Password"
                                type="password"
                                onChange={handleAddPassword}
                            />
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
        </Modal>
    );
}

export default LogInModal;
