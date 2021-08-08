import React from "react";

import Fave from "../../images/twit_fave.png";

import LargeNumberProcessor from "./LargeNumberProcessor";

import "./Like.scss";

function Like(props) {
    // TODO: write it so the images and text are mt-2 away from the top of the notification, along with the image
    return (
        <div className="notification bg-blue-highlight pb-2 pr-2">
            <div className="d-flex">
                <div className="notification_type-img-container d-flex justify-content-center align-items-end">
                    <img
                        className="notification-img-lg mb-0"
                        src={Fave}
                        alt="fave"
                    ></img>
                </div>
                <div className="d-flex align-items-end">
                    <img
                        className="notification-img-sml ml-0 mb-0"
                        src={props.profilePics}
                        alt="dummyPic"
                    ></img>
                    <img
                        className="notification-img-sml ml-0 mb-0"
                        src={props.profilePics}
                        alt="dummyPic"
                    ></img>
                    <img
                        className="notification-img-sml ml-0 mb-0"
                        src={props.profilePics}
                        alt="dummyPic"
                    ></img>
                </div>
            </div>
            <div className="like_text-container spacer">
                <p className="mt-2 mb-1">
                    <strong>{props.headliner}</strong> and{" "}
                    {LargeNumberProcessor(props.likes)} others liked your
                    Massive
                </p>
                <p className="text-grey mid-line-height mt-2">{props.text}</p>
            </div>
        </div>
    );
}

export default Like;
