import React from "react";

import EngagementContainer from "../engagementContainer/EngagementContainer";
import Logo from "../../images/bluePfp.png";

import {
    enterCustomStylingCodes,
    convertEngagementText,
} from "../../utility/utility";

import "./Massive.css";
import "../textStyling/TextStyling.css"; // this file will be imported in many places

function Massive(props) {
    let customStyling = "fontSizeWholeText"; // hardcode via this input

    return (
        <div className="background-blue bg-blue-highlight">
            <div className="massive-container py-2 d-flex flex-column border-top ">
                <div className="d-flex">
                    <div className="m-profile-pic-container">
                        <img
                            className="massive-profile-pic profile-pic"
                            src={Logo}
                            alt="dish"
                        />
                    </div>
                    <div className="width-control text-left">
                        <div className="m-author-container mt-1 d-flex">
                            <p className="mr-2 mb-2">
                                <strong>{props.displayName}</strong>
                                {/* // props.displayName goes here! */}
                            </p>
                            <p className="m-author-handle mb-0">
                                {" "}
                                @{props.author}{" "}
                                {/* // this props author aka username goes here!!!! */}
                            </p>
                        </div>

                        <p className="mt-0 text-left">{props.content}</p>
                        <EngagementContainer
                            replies={props.replies}
                            amps={props.amps}
                            likes={props.likes}
                            views={props.views}
                            cap={props.cap}
                            inFeed={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Massive;
