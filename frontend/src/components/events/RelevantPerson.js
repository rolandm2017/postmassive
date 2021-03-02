import React from "react";

import Button from "../parts/Button";

import profilePicPlaceholder from "../../images/cat1.jpg";

import styles from "./RelevantPerson.module.css";

function RelevantPerson(props) {
    function truncateDisplayName(name) {
        if (name.length > 20) {
            return name.slice(0, 20) + "...";
        } else {
            return name;
        }
    }

    function generateUsernameText(username, accountFollowsYou) {
        let returnedUsername;
        if (accountFollowsYou) {
            returnedUsername = username.slice(0, 6) + "...";
        } else {
            returnedUsername = username;
        }
        return (
            <p className={`${styles.username} ${styles.fontSizing} mr-2 my-0`}>
                @{returnedUsername}
            </p>
        );
    }

    function insertFollowsDiv(accountFollowsYou) {
        if (accountFollowsYou) {
            return (
                <div className={`${styles.followsYou} my-0`}>
                    <h4 className={`${styles.followsYouText}`}>Follows you</h4>
                </div>
            );
        } else {
            return null;
        }
    }

    return (
        <div className={`${styles.border}`}>
            <div
                className={`${styles.profilePic} d-flex justify-content-center ml-1 pt-2`}
            >
                <img src={profilePicPlaceholder} alt="profile pic" />
            </div>
            <div>
                <div className="d-flex mr-3">
                    <div className={`${styles.names} my-1 py-1`}>
                        <h3
                            className={`${styles.displayName} ${styles.fontSizing} m-0`}
                        >
                            {truncateDisplayName(props.displayName)}
                        </h3>
                        <div className="d-flex align-items-center flex-row">
                            {generateUsernameText(
                                props.username,
                                props.followsYou
                            )}
                            {insertFollowsDiv(props.followsYou)}
                        </div>
                    </div>
                    <div className="d-flex">
                        <Button text="Follow" blueBg={false} thin={true} />
                    </div>
                </div>
                <div className="mb-2 mr-3">
                    <p className={`${styles.bio} ${styles.fontSizing} m-0`}>
                        {props.bio}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RelevantPerson;
