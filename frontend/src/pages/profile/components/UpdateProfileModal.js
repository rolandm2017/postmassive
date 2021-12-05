import React, { useState } from "react";

import { updateProfileLogic } from "./UpdateProfileLogic";

import Button from "../../../components/parts/Button";
import Modal from "react-bootstrap/Modal";

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
    const [newDisplayName, setNewdisplayName] = useState(displayName);
    const [newBio, setNewBio] = useState(bio);
    const [newLocation, setNewLocation] = useState(location);
    const [newUrl, setNewUrl] = useState(url);
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
                                defaultValue={displayName}
                                onChange={(event) => {
                                    setNewdisplayName(event.target.value);
                                }}
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
                                defaultValue={bio}
                                onChange={(event) => {
                                    setNewBio(event.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="modal-datepicker-container d-flex justify-content-start flex-row modal-w-90">
                        <div className="w-50 modal-input d-flex flex-column modal-input upm_special-height-mod upm_special-margin-mod">
                            <h6 className="lightmode-text">Location</h6>
                            <input
                                className="profile_modal-input-style"
                                defaultValue={location}
                                onChange={(event) => {
                                    setNewLocation(event.target.value);
                                }}
                            />
                        </div>
                        <div className="w-50 modal-input d-flex flex-column modal-input upm_special-height-mod">
                            <h6 className="lightmode-text">Website</h6>
                            <input
                                className="profile_modal-input-style"
                                defaultValue={url}
                                onChange={(event) => {
                                    setNewUrl(event.target.value);
                                }}
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
                                // TODO: Send API to update dn, bio, loc, url
                                console.log(82);
                                handleSave(
                                    username,
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
