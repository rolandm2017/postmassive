import React from "react";

import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";

function AllSetModal({ showPage, handleClose, handleFinish, error }) {
    return (
        <Modal show={showPage} onHide={handleClose} centered animation={false}>
            <Modal.Header closeButton className="black-button">
                <Modal.Title>You're all set!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Click below to be redirected to all the fun stuff :-)
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
                    Start the Party
                </BootstrapButton>
            </Modal.Footer>
        </Modal>
    );
}

export default AllSetModal;
