import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";

function UsernamePasswordModal({
    showPage,
    handleClose,
    handleUsername,
    handlePassword,
    handlePageTwo,
    error,
}) {
    return (
        <Modal show={showPage} onHide={handleClose} centered animation={false}>
            <Modal.Header closeButton className="black-button">
                <Modal.Title>Select your username and password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={handleUsername}
                        defaultValue={"marle"}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        type="password"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        onChange={handlePassword}
                        defaultValue={"ilovecrono"}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <p className="landing_error black-text">{error}</p>
                <BootstrapButton
                    variant="primary"
                    onClick={handlePageTwo}
                    disabled={false}
                >
                    Next
                </BootstrapButton>
            </Modal.Footer>
        </Modal>
    );
}

export default UsernamePasswordModal;
