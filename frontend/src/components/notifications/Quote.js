import React from "react";

import EngagementContainer from "../engagementContainer/EngagementContainer";

import "./Quote.scss";

// FIXME: the d-flex on line 14 breaks the css and I don't know why. specificially the width and height of
// .notification_type-img-container becomes broken because of the d-flex.

function Quote(props) {
    return (
        <div className="notification">
            <div className="d-flex">
                <div className="notification_type-img-container d-flex justify-content-center align-items-end">
                    <img
                        className="notification-img-lg mb-0"
                        src={props.quoterProfilePic}
                        alt="dummy3"
                    ></img>
                </div>
                <div className="flex-basis-80">
                    <div className="mt-3">
                        <span>
                            <strong>{props.quoter.displayName}</strong>
                        </span>{" "}
                        <span>@{props.quoter.username}</span>
                    </div>
                    <p className="mid-line-height text-grey my-2">
                        {props.content}
                    </p>
                </div>
            </div>
            <div className="spacer quote_background mb-2 p-2">
                <div className="d-flex">
                    <div className="quote_spacer d-flex justify-content-center">
                        <img
                            className="notification-img-sml mx-2"
                            src={props.opProfilePic}
                            alt="lol"
                        ></img>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="my-0">
                            {/* TODO: make OP display name bold */}
                            <span>{props.OP.displayName}</span>{" "}
                            <span>@{props.OP.username}</span>
                        </p>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="quote_margin">
                        <p className="text-grey">{props.originalText}</p>
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
    );
}

export default Quote;
