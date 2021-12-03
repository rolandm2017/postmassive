import React from "react";

import ChatBubble from "./ChatBubble";

import "../Messages.scss";

function SelectedUserDisplay({
    selectedMsg,
    currentlyLoggedInUser,
    userMsgs,
    conversationPartner,
    userIsSelected,
    profilePic,
}) {
    // if user is selected ...

    if (selectedMsg === "new") {
        console.log("succe55"); // if blank slate...
        return (
            <div
                id="chat-display_outer-container"
                className="inbox-show-msg w-100 "
            >
                <div
                    id="cd-username-container"
                    className="chat-display_grey-outline w-100"
                >
                    {userIsSelected ? (
                        <div>
                            <span id="cd-username-color" className="pr-2">
                                @{currentlyLoggedInUser}{" "}
                            </span>
                            {/* <span>{selectedMsg.author.displayName}</span> */}
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
                <div id="chat-display_messages-outer-shell">
                    <div id="chat-display_messages">
                        <div>{/* empty div */}</div>
                    </div>
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
        console.log("55ss", userMsgs);

        return (
            <div
                id="chat-display_outer-container"
                className="inbox-show-msg w-100 "
            >
                <div
                    id="cd-username-container"
                    className="chat-display_grey-outline w-100 d-flex"
                >
                    <div className="p-2">
                        <img src={profilePic} alt="profile pic for the user" />
                    </div>
                    <div className="d-flex justify-content-start align-items-center pl-2">
                        <span id="cd-username-color" className="pr-2">
                            @{conversationPartner} and @{currentlyLoggedInUser}
                        </span>
                    </div>
                </div>
                {/* // center box */}
                <div id="chat-display_messages-outer-shell">
                    <div id="chat-display_messages">
                        <div id="chat-display_messages-inner-shell">
                            {userMsgs.msgs
                                .map((msg, index) => {
                                    if (msg.sender === currentlyLoggedInUser) {
                                        // right hand side
                                        return (
                                            <ChatBubble
                                                key={index}
                                                divIsAlignedLeft={false}
                                                msg={msg.content}
                                                profilePic={profilePic}
                                            />
                                        );
                                    } else {
                                        // left hand side
                                        return (
                                            <ChatBubble
                                                key={index}
                                                divIsAlignedLeft={true}
                                                msg={msg.content}
                                                profilePic={profilePic}
                                            />
                                        );
                                    }
                                })
                                .reverse()}
                            {/* // it has to be .reversed() because the y-scroll
                            depends on flex-direction: column-reverse; */}
                        </div>
                    </div>
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
