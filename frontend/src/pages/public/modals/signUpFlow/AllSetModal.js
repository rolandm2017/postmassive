import React from "react";

import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";

function AllSetModal({ showPage, handleClose, handleFinish, error }) {
    return (
        <Modal show={showPage} onHide={handleClose} centered animation={false}>
            <div className="modal-container">
                <div className="modal-header-container w-100">
                    <div className="modal-header">
                        <h3>You're all set!</h3>
                    </div>
                </div>
                <div className="w-100 h-50 d-flex justify-content-center align-items-center">
                    <div id="modal-yay-container">
                        <p id="modal-yay">
                            Click below to be redirected to all the fun stuff!
                        </p>
                    </div>
                </div>
                <div className="w-100">
                    <div className="modal-button-mod">
                        <BootstrapButton
                            variant="primary"
                            onClick={() => {
                                handleFinish();
                            }}
                            disabled={false}
                        >
                            Start the Party
                        </BootstrapButton>
                    </div>
                    <div className="modal-message">
                        {error ? <p>Error: {error} </p> : null}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default AllSetModal;

// const x = (
//     // <div>
//     //     <Modal.Header closeButton className="black-button">
//     //         <Modal.Title>You're all set!</Modal.Title>
//     //     </Modal.Header>
//     //     <Modal.Body>
//     //         Click below to be redirected to all the fun stuff :-)
//     //     </Modal.Body>
//     //     <Modal.Footer>
//     //         <p className="landing_error">
//     //             {error ? <p>Error:</p> : null}
//     //             {error}
//     //         </p>
//     //         <BootstrapButton
//     //             variant="primary"
//     //             onClick={() => {
//     //                 handleFinish();
//     //             }}
//     //             disabled={false}
//     //         >
//     //             Start the Party
//     //         </BootstrapButton>
//     //     </Modal.Footer>
//     // </div>
// );
