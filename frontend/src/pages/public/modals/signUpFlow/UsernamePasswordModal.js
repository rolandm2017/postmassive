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
            <div className="modal-container">
                <div className="modal-header-container w-100">
                    <div className="modal-header">
                        <h3 id="modal-user-pw-select">
                            Select your username and password
                        </h3>
                    </div>
                </div>
                <div
                    id="modal-user-pw-select-inputs-container"
                    className="modal-login-inputs w-100 d-flex align-items-center flex-column"
                >
                    <div className="modal-w-90">
                        <div className="modal-input">
                            <input
                                placeholder="Username"
                                onChange={handleUsername}
                            />
                        </div>
                    </div>
                    <div className="modal-w-90">
                        <div className="modal-input">
                            <input
                                placeholder="Password"
                                type="password"
                                onChange={handlePassword}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-100 d-flex justify-content-center">
                    <div className="d-flex modal-w-90">
                        <div
                            id="modal-signup-error-container"
                            className="modal-message w-100"
                        >
                            {error ? (
                                <p className="w-100">Error: {error} </p>
                            ) : null}
                        </div>
                        <div
                            id="modal-signup-btn-container"
                            className="modal-button-mod d-flex justify-content-end"
                        >
                            <BootstrapButton
                                variant="primary"
                                onClick={handlePageTwo}
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

export default UsernamePasswordModal;

// const d = (
//     <div>
//         <Modal.Header closeButton className="black-button">
//             <Modal.Title>Select your username and password</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//             <InputGroup className="mb-3">
//                 <FormControl
//                     placeholder="Username"
//                     aria-label="Username"
//                     aria-describedby="basic-addon1"
//                     onChange={handleUsername}
//                     defaultValue={"marle"}
//                 />
//             </InputGroup>
//             <InputGroup className="mb-3">
//                 <FormControl
//                     type="password"
//                     id="exampleInputPassword1"
//                     placeholder="Password"
//                     onChange={handlePassword}
//                     defaultValue={"ilovecrono"}
//                 />
//             </InputGroup>
//         </Modal.Body>
//         <Modal.Footer>
//             <p className="landing_error black-text">{error}</p>
//             <BootstrapButton
//                 variant="primary"
//                 onClick={handlePageTwo}
//                 disabled={false}
//             >
//                 Next
//             </BootstrapButton>
//         </Modal.Footer>
//     </div>
// );
