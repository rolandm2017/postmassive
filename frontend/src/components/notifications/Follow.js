import React from "react";

import Follower from "../../images/icons8-user-48.png";

import LeftBox from "./components/LeftBox";

import LargeNumberProcessor from "./LargeNumberProcessor";

import "./Follow.css";

function Follow(props) {
    const baseImg = (key) => {
        return (
            <img
                key={key}
                className="notification-img-sml mb-0"
                src={props.profilePic}
                alt="follow"
            ></img>
        );
    };
    const others = [];
    const numberOfProfilePicsToDisplay = props.others < 7 ? props.others : 7;
    for (let i = 0; i < numberOfProfilePicsToDisplay; i++) {
        others.push(baseImg(i));
    }
    const profilePicJsx = (
        <div className="d-flex justify-content-center align-items-end">
            <img
                className="notification-img-sml ml-0 mb-0"
                src={props.profilePic}
                alt="follow"
            ></img>
            {others}
        </div>
    );

    let followText = (
        <span>
            <strong>{props.user}</strong> followed you
        </span>
    );
    const moreThanOneFollow = props.others > 0;
    if (moreThanOneFollow) {
        followText = (
            <span>
                <strong>{props.user}</strong> and{" "}
                {LargeNumberProcessor(props.others)} others followed you
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
