import React from "react";

import Gear from "../../../images/icons8-settings-50.png";
import Mail from "../../../images/icons8-mail-50.png";

function InboxHeader({ setSelectedMsg, setShowSettings }) {
    return (
        <div className="inbox-header inbox-header-border pl-2 py-1 d-flex justify-content-between align-items-center">
            <h1 className="pl-2">Messages Page</h1>
            <div className="mr-3 d-flex">
                <img
                    src={Mail}
                    className="msgs-img-btn mr-2"
                    onClick={() => {
                        setSelectedMsg("new");
                    }}
                    alt="new msg"
                />
                <img
                    src={Gear}
                    className="msgs-img-btn mr-2"
                    onClick={() => {
                        console.error(
                            "you shouldn't have clicked me, feature not installed"
                        );
                        setShowSettings(true); // i know this is bad but, convenience
                        // open a div when openSettings===true;
                    }}
                    alt="settings for msgs"
                />
            </div>
        </div>
    );
}

export default InboxHeader;
