import React from "react";

import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";

import DatePicker from "react-datepicker";

import "../Modal.scss";

function NameEmailBirthdayModal({
    showPage,
    handleClose,
    handleName,
    handleEmail,
    handleDate,
    handlePageOne,
    error,
    date,
}) {
    return (
        <Modal show={showPage} onHide={handleClose} centered animation={false}>
            {" "}
            <div className="modal-container">
                <div className="modal-header-container w-100">
                    <div className="modal-header">
                        <h3>Create your account</h3>
                    </div>
                </div>
                <div className="modal-login-inputs w-100 d-flex align-items-center flex-column">
                    <div className="modal-w-90">
                        <div className="modal-input">
                            <input placeholder="Name" onChange={handleName} />
                        </div>
                    </div>
                    <div className="modal-w-90">
                        <div className="modal-input">
                            <input placeholder="Email" onChange={handleEmail} />
                        </div>
                    </div>
                    <div className="modal-datepicker-container d-flex justify-content-start flex-column modal-w-90">
                        <div>
                            <h6 className="lightmode-text">
                                Type in your date of birth
                            </h6>
                            <DatePicker selected={date} onChange={handleDate} />
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
                                onClick={handlePageOne}
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

export default NameEmailBirthdayModal;

// const a = (
//     // <div>
//     //     <Modal.Header closeButton className="black-button">
//     //         <Modal.Title>Create your account</Modal.Title>
//     //     </Modal.Header>
//     //     <Modal.Body>
//     //         <InputGroup className="mb-3">
//     //             <FormControl
//     //                 placeholder="Name"
//     //                 aria-label="Name"
//     //                 aria-describedby="basic-addon1"
//     //                 onChange={handleName}
//     //                 defaultValue={"Marle Guardia"}
//     //             />
//     //         </InputGroup>
//     //         <InputGroup className="mb-3">
//     //             <FormControl
//     //                 placeholder="Email"
//     //                 aria-label="Email"
//     //                 aria-describedby="basic-addon1"
//     //                 onChange={handleEmail}
//     //                 defaultValue={"marle@guardia.gov"}
//     //             />
//     //         </InputGroup>
//     //         <h6 className="lightmode-text">Type in your date of birth</h6>
//     //         <DatePicker selected={date} onChange={handleDate} />
//     //     </Modal.Body>
//     //     <Modal.Footer>
//     //         <p className="landing_error black-text">{error}</p>
//     //         <BootstrapButton
//     //             variant="primary"
//     //             onClick={handlePageOne}
//     //             disabled={false}
//     //         >
//     //             Next
//     //         </BootstrapButton>
//     //     </Modal.Footer>
//     // </div>
// );
