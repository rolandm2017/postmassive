import React, { useState, useEffect } from "react";

import InboxItem from "../../components/inboxItem/InboxItem";
import SelectedUserDisplay from "./components/SelectedUserDisplay";

import NoMsgSelected from "./components/NoMsgSelected";
import Wrapper from "../_helper/Wrapper";

import profilePicPlaceholder3 from "../../images/profilePics/cat3.jpg";

import { getOptions } from "../../_helper/authHeader";

import "./Messages.scss";

function Messages(props) {
    const [messages, setMessages] = useState(null);
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [targetName, setTargetName] = useState(null);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const messagesUrl = process.env.REACT_APP_API_URL + "/messages";
        fetch(messagesUrl, getOptions(messagesUrl)).then((res) => {
            res.json().then((messages) => {
                console.log(messages);
                setMessages(messages);
            });
        });

        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function loadMessageSelect() {
        if (messages) {
            return (
                <div id="inbox-items">
                    {messages.map((message) => {
                        return (
                            <InboxItem
                                key={message.id}
                                showMsg={() => {
                                    console.log("bbb");
                                    setSelectedMsg(message);
                                }}
                                displayName={message.author.displayName}
                                username={message.author.username}
                                profilePic={profilePicPlaceholder3}
                                content={message.content}
                                deliveryDate={message.deliveryDate}
                            />
                        );
                    })}
                </div>
            );
        }
    }

    return (
        <Wrapper
            pageName="messages"
            sectionName="messages_page"
            onSearchPage={false}
            breakpoints={props.breakpoints}
            onMessagePage={true}
        >
            <div className="d-flex">
                <div id="inbox">
                    <div className="inbox-header pl-2 py-1 d-flex justify-content-start align-items-center">
                        <h1 className="pl-2">Messages Page</h1>
                        <div>
                            <img
                                alt="settings for msgs"
                                onClick={() => {
                                    console.error(
                                        "you shouldn't have clicked me, feature not installed"
                                    );
                                    setSelectedMsg("settings"); // i know this is bad but, convenience
                                }}
                            />
                            <img
                                onClick={() => {
                                    setSelectedMsg("new");
                                }}
                                alt="new msg"
                            />
                        </div>
                    </div>
                    <div>
                        <p>Message requests</p>
                    </div>
                    <div className="inbox-header pl-2 py-2 d-flex justify-content-start align-items-center">
                        {/* TODO: make the search input have larger margins top/bot */}
                        <input
                            id="inbox-search"
                            className="ml-2 mr-5 pl-2 dark-mode-input inbox-search"
                            placeholder="Search for people or content"
                        ></input>
                    </div>

                    {/* // smallerload chat in left pane when chat is selected */}
                    {/* // desktop: load chat in right pane when chat is
                        selected */}

                    {windowSize.width >= 1005 ? loadMessageSelect() : null}
                    {windowSize.width < 1005 ? (
                        selectedMsg === null ? (
                            loadMessageSelect()
                        ) : selectedMsg === "new" ? (
                            <div id="inbox-items">
                                <SelectedUserDisplay
                                    selectedMsg={selectedMsg}
                                    userIsSelected={targetName}
                                    profilePic={profilePicPlaceholder3}
                                />
                            </div>
                        ) : (
                            // this one handles when a msg is open but no user is selected. tis "new".
                            <div id="inbox-items">
                                <SelectedUserDisplay
                                    selectedMsg={selectedMsg}
                                    userIsSelected={targetName}
                                    profilePic={profilePicPlaceholder3}
                                />
                            </div>
                            // this 1 handles after a user is selected.
                        )
                    ) : null}
                </div>
                <div id="chat-display-container">
                    {selectedMsg === null ? (
                        <NoMsgSelected
                            setSelectedMsg={() => setSelectedMsg("new")}
                        />
                    ) : selectedMsg === "new" ? (
                        <SelectedUserDisplay
                            selectedMsg={selectedMsg}
                            userIsSelected={targetName}
                            profilePic={profilePicPlaceholder3}
                        /> // this one handles when a msg is open but no user is selected. tis "new".
                    ) : (
                        <SelectedUserDisplay
                            selectedMsg={selectedMsg}
                            userIsSelected={targetName}
                            profilePic={profilePicPlaceholder3}
                        />
                        // this 1 handles after a user is selected.
                    )}
                </div>
            </div>
        </Wrapper>
    );
}

export default Messages;
