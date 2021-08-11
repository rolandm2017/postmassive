import React from "react";

function SelectedUserDisplay(props) {
    return (
        <div id="chat-display-inner-container" className="inbox-show-msg">
            <div>
                @{props.SelectedUserDisplay.author.username}{" "}
                <span>{props.SelectedUserDisplay.author.displayName}</span>
            </div>
            <div>
                <p>{props.SelectedUserDisplay.content} </p>
            </div>
            <div>
                <input placeholder="say what?" />
            </div>
        </div>
    );
}

export default SelectedUserDisplay;
