import React from "react";

import bluePfp from "../../../images/bluePfp.png";

function LeftBox() {
    // takes up the left side of all notifications
    return (
        <div>
            <div className="notification_type-img-container d-flex justify-content-center align-items-end">
                <img
                    className="notification-img-lg mb-0"
                    src={bluePfp}
                    alt="dummy3"
                ></img>
            </div>
        </div>
    );
}

export default LeftBox;
