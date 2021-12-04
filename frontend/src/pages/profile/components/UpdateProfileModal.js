import React, { useState } from "react";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";

function UpdateProfileModal({
    showPage,
    username,
    displayName,
    bio,
    location,
    url,
    handleClose,
    handleSave,
}) {
    const [newDisplayName, setNewDisplayName] = useState("");
    const [newBio, setNewBio] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newUrl, setNewUrl] = useState("");
    return (
        <Modal show={showPage} centered animation={false}>
            <div className="modal-container">
                <div className="modal-header-container w-100">
                    <div className="modal-header">
                        <h5>Update profile</h5>
                    </div>
                </div>
                <div className="modal-login-inputs w-100 d-flex align-items-center flex-column">
                    <div className="modal-w-90">
                        <div className="modal-input">
                            <p>Display name</p>
                            <input placeholder={displayName} />
                        </div>
                    </div>
                    <div className="modal-w-90">
                        <div className="modal-input">
                            <p>Bio</p>
                            <input placeholder={displayName} />
                        </div>
                    </div>
                    <div className="modal-datepicker-container d-flex justify-content-start flex-row modal-w-90">
                        <div className="w-50 modal-input d-flex flex-column">
                            <h6 className="lightmode-text">Location</h6>
                            <input placeholder={displayName} />
                        </div>
                        <div className="w-50 modal-input d-flex flex-column">
                            <h6 className="lightmode-text">Website</h6>
                            <input placeholder={displayName} />
                        </div>
                    </div>
                </div>
                <div>
                    <button>Save</button>
                </div>
            </div>
        </Modal>
    );
}

export default UpdateProfileModal;
