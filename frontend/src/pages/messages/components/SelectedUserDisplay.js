import React from "react";

import ChatBubble from "./ChatBubble";

import "../Messages.scss";

function SelectedUserDisplay(props) {
    // if user is selected ...
    console.log("sel:", props);
    if (props.selectedMsg === "new") {
        console.log("succe55");
        return (
            <div
                id="chat-display_outer-container"
                className="inbox-show-msg h-100 w-100 "
            >
                <div
                    id="cd-username-container"
                    className="chat-display_grey-outline w-100"
                >
                    {props.userIsSelected ? (
                        <div>
                            <span id="cd-username-color" className="pr-2">
                                @
                                {props.username === props.selectedMsg.sender
                                    ? props.username
                                    : props.selectedMsg.sender}{" "}
                            </span>
                            {/* <span>{props.selectedMsg.author.displayName}</span> */}
                        </div>
                    ) : (
                        // input
                        <div
                            id="cd_search-for-user-container"
                            className="w-100 h-100 d-flex justify-content-center align-items-center"
                        >
                            <input
                                className="dark-mode-input inbox-search chat-display_inbox-adjust"
                                placeholder="write username here..."
                            />
                        </div>
                    )}
                </div>
                {/* // center box */}
                <div id="chat-display_messages">
                    <div>{/* empty div */}</div>
                </div>
                {/* // input */}
                <div
                    id="cd_msg-input-container"
                    className="chat-display_grey-outline w-100"
                >
                    <div
                        id="cd_search-for-user-container"
                        className="w-100 h-100 d-flex justify-content-center align-items-center"
                    >
                        <input
                            className="dark-mode-input inbox-search chat-display_inbox-adjust"
                            placeholder="say what?"
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        console.log("55ss");
        // if blank slate...
        return (
            <div
                id="chat-display_outer-container"
                className="inbox-show-msg h-100 w-100 "
            >
                <div
                    id="cd-username-container"
                    className="chat-display_grey-outline w-100 d-flex"
                >
                    <div className="p-2">
                        <img
                            src={props.profilePic}
                            alt="profile pic for the user"
                        />
                    </div>
                    <div className="d-flex justify-content-start align-items-center pl-2">
                        <span id="cd-username-color" className="pr-2">
                            @{props.selectedMsg.author.username}{" "}
                        </span>
                        <span>{props.selectedMsg.author.displayName}</span>
                    </div>
                </div>
                {/* // center box */}
                <div id="chat-display_messages">
                    {props.selectedMsg.content.map((msg, index) => {
                        const isLeftSide = Math.random() > 0.5;
                        return (
                            <ChatBubble
                                key={index}
                                left={isLeftSide}
                                msg={msg}
                                profilePic={props.profilePic}
                            />
                        );
                    })}
                </div>
                {/* // input */}
                <div
                    id="cd_msg-input-container"
                    className="chat-display_grey-outline w-100"
                >
                    <div
                        id="cd_search-for-user-container"
                        className="w-100 h-100 d-flex justify-content-center align-items-center"
                    >
                        <input
                            className="dark-mode-input inbox-search chat-display_inbox-adjust"
                            placeholder="say what?"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectedUserDisplay;
