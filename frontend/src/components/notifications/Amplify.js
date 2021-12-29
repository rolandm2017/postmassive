import React from "react";

import EngagementContainer from "../engagementContainer/EngagementContainer";

import LeftBox from "./components/LeftBox";

import Amplify from "../../images/bluePfp.png";

import LargeNumberProcessor from "./LargeNumberProcessor";

import "./Amplify.css";

// TODO: Implement 4 line max for the content area

function Amp({ headliner, profilePics, others, author, content }) {
    return (
        <div className="notification bg-blue-highlight pb-2 pr-2 d-flex flex-row">
            <LeftBox />
            <div className="mr-3">
                <div className="d-flex notifications-height-spacer">
                    <div className="d-flex align-items-end">
                        {/* // TODO: Generate profile pics based on # of amplifiers (use func from Follow.js) */}
                        <img
                            className="notification-img-sml ml-0 mb-0"
                            src={profilePics}
                            alt="dummyPic"
                        ></img>
                        <img
                            className="notification-img-sml ml-0 mb-0"
                            src={profilePics}
                            alt="dummyPic"
                        ></img>
                        <img
                            className="notification-img-sml ml-0 mb-0"
                            src={profilePics}
                            alt="dummyPic"
                        ></img>
                    </div>
                </div>
                <div className="d-flex justify-content-start">
                    <div className="d-flex flex-column justify-content-center align-items-left">
                        <div className="">
                            {/* TODO: make the amplifier's name bold */}
                            <p className="my-1">
                                {headliner} and {LargeNumberProcessor(others)}{" "}
                                others amplified your massive!
                            </p>
                        </div>
                        <div className="">
                            {/* <div className="amplify_header">
                    <span>{author[0]}</span>
                    <span>@{author[1]}</span>
                </div> */}
                            <p className="text-grey my-1">{content}</p>
                        </div>
                        <EngagementContainer
                            replies={26}
                            amplifies={133}
                            likes={2311}
                            views={93887}
                            cap={"110932"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Amp;
