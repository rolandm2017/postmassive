import React from "react";

import Dropdown from "../../images/dropdown-field-48-white.png";

import "./SidebarProfile.scss";

// TODO: Make the dropdown box allow you to switch accounts. (This is a low importance thing)

function SidebarProfile(props) {
    return (
        <div
            id="sidebar-profile"
            className="p-2 d-flex"
            onClick={props.clicked}
        >
            <div className="d-flex justify-items-center align-items-center">
                <img
                    id="sidebar-profile_profile-pic"
                    src={props.profilePic}
                    alt="profile pic"
                ></img>
            </div>
            <div id="sidebar-profile_names-container">
                <div>
                    <h3 id="sidebar-profile_display-name" className="my-0">
                        {props.displayName}
                    </h3>
                </div>
                <div>
                    <h3 id="sidebar-profile_username" className="my-0">
                        @{props.username}
                    </h3>
                </div>
            </div>
            <div id="sidebar-profile_dropdown-container">
                <img src={Dropdown} alt="clickable dropdown" />
            </div>
        </div>
    );
}

export default SidebarProfile;
