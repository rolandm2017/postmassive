import React from "react";

import EngagementContainer from "../engagementContainer/EngagementContainer";

import Amplify from "../../images/profilePics/cat2.jpg";

import LargeNumberProcessor from "./LargeNumberProcessor";

import "./Amplify.css";

// TODO: Implement 4 line max for the content area

function Amp(props) {
    return (
        <div className="notification bg-blue-highlight pb-2 pr-2">
            <div className="d-flex">
                <div className="notification_type-img-container d-flex justify-content-center align-items-end">
                    <img
                        className="notification-img-lg mb-0"
                        src={Amplify}
                        alt="fave"
                    ></img>
                </div>
                <div className="d-flex align-items-end">
                    {/* // TODO: Generate profile pics based on # of amplifiers (use func from Follow.js) */}
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
            <div className="spacer">
                {/* TODO: make the amplifier's name bold */}
                <p className="my-1">
                    {props.amplifier} and {LargeNumberProcessor(props.others)}{" "}
                    others amplified your massive!
                </p>
            </div>
            <div className="spacer">
                {/* <div className="amplify_header">
                    <span>{props.author[0]}</span>
                    <span>@{props.author[1]}</span>
                </div> */}
                <p className="text-grey my-1">{props.content}</p>
            </div>
            <EngagementContainer
                replies={26}
                amplifies={133}
                likes={2311}
                views={93887}
                cap={"110932"}
            />
        </div>
    );
}

export default Amp;
