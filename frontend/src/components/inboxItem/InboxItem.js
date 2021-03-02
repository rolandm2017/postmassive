import React from "react";

import styles from "./InboxItem.module.css";

function InboxItem(props) {
    return (
        <div className={`${styles.itemBox} d-flex`}>
            <div
                className={`${styles.profilePicContainer} d-flex justify-content-center align-items-center`}
            >
                <img src={props.profilePic} alt="profile pic"></img>
            </div>
            <div className={`${styles.theNonProfilePicPart} d-flex`}>
                <div className={`${styles.theTextPart} mt-3`}>
                    <div>
                        <h3 className={`${styles.truncateText} my-0`}>
                            <span className={`${styles.displayName}`}>
                                {props.displayName}
                            </span>{" "}
                            <span className={`${styles.usernameOrMessage}`}>
                                @{props.username}
                            </span>
                        </h3>
                    </div>
                    <div>
                        <p className={`${styles.truncateText}`}>
                            {props.content}
                        </p>
                    </div>
                </div>
                <div
                    className={`${styles.deliveryDate} d-flex justify-content-center align-items-center`}
                >
                    <p className="my-0">{props.deliveryDate}</p>
                </div>
            </div>
        </div>
    );
}

export default InboxItem;
