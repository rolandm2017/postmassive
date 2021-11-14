import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";

function ValidationCodeModal({ showPage, handleClose }) {
    return (
        <Modal show={showPage} onHide={handleClose} centered animation={false}>
            <Modal.Header closeButton className="black-button">
                <Modal.Title>We sent you a verification code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Verification"
                        aria-label="Verification"
                        aria-describedby="basic-addon1"
                        onChange={setVerificationCode}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <p className="landing_error">{error}</p>
                <BootstrapButton
                    variant="primary"
                    onClick={handlePageThree}
                    disabled={false}
                >
                    Next
                </BootstrapButton>
            </Modal.Footer>
        </Modal>
    );
}

export default ValidationCodeModal;
