import React from "react";

import "../Messages.scss";

function ChatBubble(props) {
    return (
        <div
            className={`generic-chat-bub-container ${
                props.left ? "left-side-chat" : "right-side-chat"
            }`}
        >
            {props.left ? (
                <div className="generic-chat-bub">
                    <img
                        className="generic-chat-bub-pfp"
                        alt="profile pic"
                        src={props.profilePic}
                    />
                    <p>{props.msg}</p>
                </div>
            ) : (
                <div className="generic-chat-bub">
                    <p>{props.msg}</p>
                    <img
                        className="generic-chat-bub-pfp"
                        alt="profile pic"
                        src={props.profilePic}
                    />
                </div>
            )}
        </div>
    );
}

export default ChatBubble;
