import React from "react";

import Button from "../parts/Button";

import profilePicPlaceholder2 from "../../images/profilePics/cat2.jpg";

import styles from "./FollowRec.module.css";

function FollowRec(props) {
    return (
        <div
            className={`${styles.followRec} d-flex justify-content-between align-items-center`}
        >
            <div className="mx-2 d-flex justify-content-center align-items-center">
                <img src={profilePicPlaceholder2} alt="profile pic" />
            </div>
            <div className={`${styles.container}`}>
                <h3 className={`${styles.text}`}>{props.displayName}</h3>
                <p className={`${styles.text}`}>@{props.username}</p>
            </div>
            <div className={`${styles.heightAdjustment} ml-1 mr-3 d-flex`}>
                <Button
                    text="Follow"
                    blueBg={false}
                    thin={true}
                    authed={true}
                />
            </div>
        </div>
    );
}

export default FollowRec;
