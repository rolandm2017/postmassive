import React from "react";

import EngagementContainer from "../engagementContainer/EngagementContainer";

import LeftBox from "./components/LeftBox";

// import LargeNumberProcessor from "./LargeNumberProcessor";

import "./Quote.scss";

// FIXME: the d-flex on line 14 breaks the css and I don't know why. specificially the width and height of
// .notification_type-img-container becomes broken because of the d-flex.

function Quote({
    quoter,
    quoterProfilePic,
    content,
    OP,
    opProfilePic,
    originalText,
}) {
    return (
        <div className="notification bg-blue-highlight pb-2 pr-2 d-flex">
            <LeftBox />
            <div className="d-flex">
                <div className="mr-3 d-flex flex-column justify-content-center align-items-start">
                    <div className="flex-basis-80">
                        <div className="notifications-height-spacer d-flex align-items-end">
                            <span>
                                <strong>{quoter.displayName}</strong>
                            </span>{" "}
                            <span>@{quoter.username}</span>
                        </div>
                        <p className="mid-line-height text-grey my-2">
                            {content}
                        </p>
                    </div>
                    <div className="quote_background mb-2 p-2">
                        <div className="d-flex">
                            <div className="quote_spacer d-flex justify-content-center">
                                <img
                                    className="notification-img-sml mx-2"
                                    src={opProfilePic}
                                    alt="lol"
                                ></img>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="my-0">
                                    {/* TODO: make OP display name bold */}
                                    <span>{OP.displayName}</span>{" "}
                                    <span>@{OP.username}</span>
                                </p>
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="quote_margin">
                                <p className="text-grey">{originalText}</p>
                                {/* TODO: make originalText have max 3 lines, then ellipse. */}
                            </div>
                        </div>
                    </div>
                    <EngagementContainer
                        replies={13}
                        amplifies={97}
                        likes={593}
                        views={1392}
                        cap={15000}
                    />
                </div>
            </div>
        </div>
    );
}

export default Quote;
