import React, { useState } from "react";

import { updateProfileLogic } from "./UpdateProfileLogic";

import Button from "../../../components/parts/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";

import "./UpdateProfileModal.css";

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
    console.log(23, displayName);
    const [newDisplayName, setNewDisplayName] = useState("");
    const [newBio, setNewBio] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newUrl, setNewUrl] = useState("");
    return (
        <Modal show={showPage} centered animation={false}>
            <div className="modal-container">
                <div className="modal-header-container w-100">
                    <div className="modal-header upm_text-aligner">
                        <h5>Update profile</h5>
                    </div>
                </div>
                <div className="modal-login-inputs w-100 d-flex align-items-center flex-column">
                    <div className="modal-w-90">
                        <div className="modal-input">
                            <div className="upm_label-width-adjust">
                                <p>Display name</p>
                            </div>
                            <input
                                className="profile_modal-input-style upm_top-two-inputs-resizer "
                                placeholder={displayName}
                            />
                        </div>
                    </div>
                    <div className="modal-w-90">
                        <div className="modal-input">
                            <div className="upm_label-width-adjust">
                                <p>Bio</p>
                            </div>
                            <input
                                className="profile_modal-input-style upm_top-two-inputs-resizer"
                                placeholder={displayName}
                            />
                        </div>
                    </div>
                    <div className="modal-datepicker-container d-flex justify-content-start flex-row modal-w-90">
                        <div className="w-50 modal-input d-flex flex-column modal-input upm_special-height-mod upm_special-margin-mod">
                            <h6 className="lightmode-text">Location</h6>
                            <input
                                className="profile_modal-input-style"
                                placeholder={displayName}
                            />
                        </div>
                        <div className="w-50 modal-input d-flex flex-column modal-input upm_special-height-mod">
                            <h6 className="lightmode-text">Website</h6>
                            <input
                                className="profile_modal-input-style"
                                placeholder={displayName}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end h-25 b-debug2">
                    <div className="height-100 mt-2 px-4">
                        <Button
                            text="Save"
                            wide={true}
                            onClick={() => {
                                handleSave(
                                    newDisplayName,
                                    newBio,
                                    newLocation,
                                    newUrl
                                );
                            }}
                        ></Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default UpdateProfileModal;
