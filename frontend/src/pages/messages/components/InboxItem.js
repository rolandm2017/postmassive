import React from "react";

import { processDateToString } from "../../../utility/TimeLogic";

import styles from "./InboxItem.module.scss";

function InboxItem(props) {
    // console.log(props, 6);

    return (
        <div
            className={`${styles.itemBox} d-flex`}
            onClick={() => {
                // console.log(props.conversationPartner, props.showMsg, 14);
                props.showMsg(props.conversationPartner);
            }}
        >
            <div
                className={`${styles.profilePicContainer} d-flex justify-content-center align-items-center`}
            >
                <img
                    src={props.profilePic}
                    className={`${styles.profilePicIsBlue}`}
                    alt="profile pic"
                ></img>
            </div>
            <div className={`${styles.theNonProfilePicPart}`}>
                <div className={`${styles.theTextPart} mt-3`}>
                    <div>
                        <h3 className={`${styles.truncateText} my-0`}>
                            {/* <span className={`${styles.displayName}`}>
                                {props.displayName}
                            </span>{" "} */}
                            <span className={`${styles.usernameOrMessage}`}>
                                @{props.username} and @
                                {props.conversationPartner}
                            </span>
                        </h3>
                    </div>
                    <div>
                        <p className={`${styles.truncateText}`}>
                            {props.content}
                        </p>
                    </div>
                    <div
                        className={`${styles.deliveryDate} d-flex justify-content-start align-items-center`}
                    >
                        <p className="my-0">
                            {processDateToString(props.deliveryDate)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InboxItem;
