import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import InboxHeader from "./components/InboxHeader";
// import { processDateToString } from "./components/TimeLogic";
import InboxItem from "./components/InboxItem";
import SelectedUserDisplay from "./components/SelectedUserDisplay";

import NoMsgSelected from "./components/NoMsgSelected";
import Wrapper from "../_pageHelper/Wrapper";

import RightArrow from "../../images/icons8-right-arrow-50.png";

import bluePfp from "../../images/bluePfp.png";

import { getOptions } from "../../_helper/authHeader";

import "./Messages.scss";

function Messages(props) {
    // console.log(props, 19);
    const [messages, setMessages] = useState(null);
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [conversationPartner, setConversationPartner] = useState(null);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        // setConversationPartner(null);
        console.log("RETRIGGERED", 32);

        const messagesUrl =
            process.env.REACT_APP_API_URL +
            "/messages/getAllMsgsForUser?username=" +
            props.username;
        // console.log(messagesUrl);
        fetch(messagesUrl, getOptions(messagesUrl)).then((res) => {
            res.json().then((messages) => {
                // username, content, deliveryDate
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
    }, [setConversationPartner]);

    function updateMsgsWithNewMsg(additionalMsg, conversationPartner) {
        console.log(additionalMsg, conversationPartner, 67);
        const oldMessages = [...messages];
        const updatedSetOfMsgs = [];

        let time = Date.now();
        let newMessage = {
            sender: props.username,
            content: additionalMsg,
            time: time,
        };
        console.log(oldMessages, 72);
        oldMessages.forEach((msg) => {
            if (msg.conversationPartner === conversationPartner) {
                msg.msgs.push(newMessage);
                console.log(msg);
            }
            updatedSetOfMsgs.push(msg);
        });
        // fixme: pushed additionalMsg to oldState array, wanted { sender: username, content: additionalMsg, time: time }
        setMessages(updatedSetOfMsgs);
    }

    function loadMessageSelect() {
        if (messages) {
            return (
                <div id="inbox-items">
                    {messages.map((message, index) => {
                        // console.log(message.msgs, 91);
                        return (
                            <InboxItem
                                key={index}
                                showMsg={() => {
                                    console.log("bbb");
                                    // change the chat window display to be the message object,
                                    // access its contents inside SelectedUserDisplay
                                    setSelectedMsg(message);
                                    setConversationPartner(
                                        message.conversationPartner
                                    );
                                }}
                                username={message.username}
                                conversationPartner={
                                    message.conversationPartner
                                }
                                profilePic={bluePfp}
                                content={
                                    message.msgs[message.msgs.length - 1]
                                        .content
                                }
                                deliveryDate={
                                    message.msgs[message.msgs.length - 1].time
                                }
                            />
                        );
                    })}
                </div>
            );
        }
    }

    function getOnlyRelevantMessageData(messages) {
        return messages.filter((message) => {
            if (message.conversationPartner === conversationPartner) {
                return message;
            }
        })[0];
    }

    return (
        <Wrapper
            pageName="messages"
            sectionName="messages_page"
            onSearchPage={false}
            breakpoints={props.breakpoints}
            onMessagePage={true}
        >
            <div className="d-flex hacky-hider">
                <div id="inbox">
                    <InboxHeader
                        setSelectedMsg={setSelectedMsg}
                        setShowSettings={setShowSettings}
                    />
                    <div id="inbox-msg-requests">
                        <p>Message requests</p>
                        <img
                            src={RightArrow}
                            alt="to requests"
                            height="30px"
                            with="30px"
                            onClick={() => {
                                setSelectedMsg(null);
                            }}
                        />
                    </div>
                    <div className="inbox-header pl-2 py-2 d-flex justify-content-start align-items-center">
                        {/* TODO: make the search input have larger margins top/bot */}
                        <input
                            id="inbox-search"
                            className="ml-2 mr-5 dark-mode-input inbox-search messages-search internal-input"
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
                            <div id="inbox-items-mobile">
                                <SelectedUserDisplay
                                    selectedMsg={selectedMsg}
                                    currentlyLoggedInUser={props.username}
                                    userMsgs={null}
                                    conversationPartner={conversationPartner}
                                    userIsSelected={conversationPartner}
                                    profilePic={bluePfp}
                                    changeParentMsgsState={updateMsgsWithNewMsg}
                                />
                            </div>
                        ) : (
                            // this one handles when a msg is open but no user is selected. tis "new".
                            <div id="inbox-items-mobile">
                                <SelectedUserDisplay
                                    selectedMsg={selectedMsg}
                                    currentlyLoggedInUser={props.username}
                                    userMsgs={getOnlyRelevantMessageData(
                                        messages
                                    )}
                                    conversationPartner={conversationPartner}
                                    userIsSelected={conversationPartner}
                                    profilePic={bluePfp}
                                    changeParentMsgsState={updateMsgsWithNewMsg}
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
                            currentlyLoggedInUser={props.username}
                            userMsgs={null}
                            conversationPartner={conversationPartner}
                            userIsSelected={conversationPartner}
                            profilePic={bluePfp}
                            changeParentMsgsState={updateMsgsWithNewMsg}
                        /> // this one handles when a msg is open but no user is selected. tis "new".
                    ) : (
                        <SelectedUserDisplay
                            selectedMsg={selectedMsg}
                            currentlyLoggedInUser={props.username}
                            userMsgs={getOnlyRelevantMessageData(messages)}
                            conversationPartner={conversationPartner}
                            userIsSelected={conversationPartner}
                            profilePic={bluePfp}
                            changeParentMsgsState={updateMsgsWithNewMsg}
                        />
                        // this 1 handles after a user is selected.
                    )}
                </div>
            </div>
        </Wrapper>
    );
}

export default Messages;
