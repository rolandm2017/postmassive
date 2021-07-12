import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";

import DatePicker from "react-datepicker";

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
            <Modal.Header closeButton className="black-button">
                <Modal.Title>Create your account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Name"
                        aria-label="Name"
                        aria-describedby="basic-addon1"
                        onChange={handleName}
                        defaultValue={"Marle Guardia"}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        onChange={handleEmail}
                        defaultValue={"marle@guardia.gov"}
                    />
                </InputGroup>
                <h6 className="lightmode-text">Type in your date of birth</h6>
                {/* // FIXME: The DatePicker SUCKS. Replace it. It shows a calendar dropdown BUT there is no year selector. */}
                <DatePicker selected={date} onChange={handleDate} />
            </Modal.Body>
            <Modal.Footer>
                <p className="landing_error black-text">{error}</p>
                <BootstrapButton
                    variant="primary"
                    onClick={handlePageOne}
                    disabled={false}
                >
                    Next
                </BootstrapButton>
            </Modal.Footer>
        </Modal>
    );
}

export default NameEmailBirthdayModal;
