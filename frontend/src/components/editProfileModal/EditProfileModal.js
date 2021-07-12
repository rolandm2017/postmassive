import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";

function EditProfile() {
    return (
        <Modal show={true} onHide={} centered animation={false}>
            <Modal.Header closeButton className="black-button">
                <Modal.Title>Edit profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Name"
                        aria-label="Name"
                        aria-describedby="basic-addon1"
                        onChange={}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Bio"
                        aria-label="Bio"
                        aria-describedby="basic-addon1"
                        onChange={}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Location"
                        aria-label="Location"
                        aria-describedby="basic-addon1"
                        onChange={}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Date of birth"
                        aria-label="Date of birth"
                        aria-describedby="basic-addon1"
                        onChange={}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <p id="" className="black-text">
                    {error}
                </p>
                <BootstrapButton
                    variant="primary"
                    onClick={() => sendLogInIfInfoIsValid(true)} // FIXME: totally borked, it takes numerous args now
                    disabled={false}
                >
                    Save
                </BootstrapButton>
            </Modal.Footer>
        </Modal>
    );
}

export default EditProfile;
