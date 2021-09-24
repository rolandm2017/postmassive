import React from "react";

import "../Messages.scss";

function ChatBubble(props) {
    return (
        <div
            className={`generic-chat-bub-container ${
                props.left
                    ? "left-side-chat"
                    : "right-side-chat d-flex justify-content-end"
            }`}
        >
            {props.left ? (
                <div className="generic-chat-bub">
                    <img
                        className="generic-chat-bub-pfp "
                        alt="profile pic"
                        src={props.profilePic}
                    />
                    <p className="greyBackgroundForMessage">{props.msg}</p>
                </div>
            ) : (
                <div className="generic-chat-bub right-side-chat-inner d-flex justify-content-end">
                    <p className="blueBackgroundForMessage">{props.msg}</p>
                    <img
                        className={`generic-chat-bub-pfp`}
                        alt="profile pic"
                        src={props.profilePic}
                    />
                </div>
            )}
        </div>
    );
}

export default ChatBubble;
