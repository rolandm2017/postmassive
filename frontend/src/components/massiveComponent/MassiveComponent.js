import React from "react";

import { useLocation } from "react-router-dom";

import EngagementContainer from "../engagementContainer/EngagementContainer";
import Logo from "../../images/bluePfp.png";

import prettyText from "../../utility/prettyText.tsx";

import "./MassiveComponent.css";
import "../textStyling/TextStyling.css"; // this file will be imported in many places

function Massive(props) {
    console.log(14, props);
    // let customStyling = "fontSizeWholeText"; // hardcode via this input
    const location = useLocation();
    // console.log(props, 13, location.pathname)
    const stylings =
        props.stylings === undefined ? [{}, {}, {}] : props.stylings;

    // console.log(props, 17); // TODO: make bg-blue-highlight conditional on post not being singled out
    return (
        <div
            className={`${
                location.pathname.slice(0, 6) === "/home"
                    ? "bg-blue-highlight"
                    : null
            } background-blue `}
        >
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

                        {/* <p className="mt-0 text-left">{props.content}</p> */}
                        <p className="mt-0 text-left">
                            {prettyText(props.content, stylings)}
                        </p>

                        <EngagementContainer
                            key={10}
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
