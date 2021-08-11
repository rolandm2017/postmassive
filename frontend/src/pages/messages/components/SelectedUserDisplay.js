import React from "react";

function SelectedUserDisplay(props) {
    return (
        <div id="chat-display-inner-container" className="inbox-show-msg">
            <div>
                @{props.selectedMsg.author.username}{" "}
                <span>{props.selectedMsg.author.displayName}</span>
            </div>
            <div>
                <p>{props.selectedMsg.content} </p>
            </div>
            <div>
                <input placeholder="say what?" />
            </div>
        </div>
    );

    return (
        <div id="chat-display-inner-container" className="inbox-show-msg">
            <div>
                <input placeholder="username..." />
            </div>
            <div>{/* empty div */}</div>
            <div>Input</div>
        </div>
    );
}

export default SelectedUserDisplay;
