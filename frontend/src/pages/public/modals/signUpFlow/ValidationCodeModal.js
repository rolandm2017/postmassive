import React from "react";

import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";

import "../Modal.scss";

function ValidationCodeModal({
    showPage,
    handleClose,
    setVerificationCode,
    handlePageThree,
    error,
}) {
    return (
        <Modal show={showPage} onHide={handleClose} centered animation={false}>
            <div className="modal-container">
                <div className="modal-header-container w-100">
                    <div className="modal-header">
                        <h3 id="modal-user-pw-select">
                            We sent you a verification code
                        </h3>
                    </div>
                </div>
                <div
                    id="modal-validation-inputs-container"
                    className="modal-login-inputs w-100 d-flex align-items-center flex-column"
                >
                    <div className="modal-w-90">
                        <div className="modal-input">
                            <input
                                placeholder="Verification code"
                                onChange={setVerificationCode}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-100 d-flex justify-content-center">
                    <div className="d-flex modal-w-90">
                        <div
                            id="modal-signup-error-container"
                            className="modal-message w-100 modal-padding-reset"
                        >
                            {error ? (
                                <p className="w-100">
                                    For demo purposes, the verification code is:
                                    <span
                                        style={{
                                            fontFamily: "Courier New",
                                            fontSize: "18px",
                                        }}
                                    >
                                        {" "}
                                        {error}{" "}
                                    </span>
                                </p>
                            ) : null}
                        </div>
                        <div
                            id="modal-signup-btn-container"
                            className="modal-button-mod d-flex justify-content-end"
                        >
                            <BootstrapButton
                                variant="primary"
                                onClick={handlePageThree}
                                disabled={false}
                            >
                                Continue
                            </BootstrapButton>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ValidationCodeModal;
