import React from "react";

import Follower from "../../images/icons8-user-48.png";

import LeftBox from "./components/LeftBox";

import LargeNumberProcessor from "./LargeNumberProcessor";

import "./Follow.css";

function Follow({ user, profilePic, othersList }) {
    const baseImg = (key) => {
        return (
            <img
                key={key}
                className="notification-img-sml mb-0"
                src={profilePic}
                alt="follow"
            ></img>
        );
    };
    const others = [];
    const numberOfProfilePicsToDisplay = othersList < 7 ? othersList : 7;
    for (let i = 0; i < numberOfProfilePicsToDisplay; i++) {
        others.push(baseImg(i));
    }
    const profilePicJsx = (
        <div className="d-flex justify-content-center align-items-end">
            <img
                className="notification-img-sml ml-0 mb-0"
                src={profilePic}
                alt="follow"
            ></img>
            {others}
        </div>
    );

    let followText = (
        <span>
            <strong>{user}</strong> followed you
        </span>
    );
    const moreThanOneFollow = othersList.length > 0;
    if (moreThanOneFollow) {
        followText = (
            <span>
                <strong>{user}</strong> and{" "}
                {LargeNumberProcessor(othersList.length)}{" "}
                {othersList.length === 1 ? "other" : "others"} followed you
            </span>
        );
    }
    // TODO: write it so the images and text are mt-2 away from the top of the notification, along with the image
    return (
        <div className="notification bg-blue-highlight pb-2 pr-2 d-flex">
            <LeftBox />
            <div className="d-flex flex-column">
                <div className="d-flex notifications-height-spacer">
                    {profilePicJsx}
                </div>
                <div className="follow_text-container mt-2">
                    <p className="ml-0">{followText}</p>
                </div>
            </div>
        </div>
    );
}

export default Follow;
