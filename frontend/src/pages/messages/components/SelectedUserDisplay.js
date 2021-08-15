import React from "react";

import "../Messages.scss";

function SelectedUserDisplay(props) {
    // if user is selected ...
    return (
        <div id="chat-display-inner-container" className="inbox-show-msg">
            {props.userIsSelected ? (
                <div id="chat-display-username-container">
                    @{props.selectedMsg.author.username}{" "}
                    <span>{props.selectedMsg.author.displayName}</span>
                </div>
            ) : (
                <div id="chat-display-username-container">
                    <input placeholder="username..." />
                </div>
            )}
            {props.userIsSelected ? (
                <div>
                    <p>{props.selectedMsg.content} </p>
                </div>
            ) : (
                <div>{/* empty div */}</div>
            )}
            <div>
                <input placeholder="say what?" />
            </div>
        </div>
    );

    // if blank slate...
    return (
        <div id="chat-display-inner-container" className="inbox-show-msg">
            <div>Input</div>
        </div>
    );
}

export default SelectedUserDisplay;
