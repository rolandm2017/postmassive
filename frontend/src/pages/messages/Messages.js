import React, { useState, useEffect } from "react";

import InboxItem from "./components/InboxItem";
import SelectedUserDisplay from "./components/SelectedUserDisplay";

import NoMsgSelected from "./components/NoMsgSelected";
import Wrapper from "../_pageHelper/Wrapper";

import RightArrow from "../../images/icons8-right-arrow-50.png";
import Gear from "../../images/icons8-settings-50.png";
import Mail from "../../images/icons8-mail-50.png";
import bluePfp from "../../images/bluePfp.png";

import { getOptions } from "../../_helper/authHeader";

import "./Messages.scss";

function Messages(props) {
    // console.log(props, 19);
    const [messages, setMessages] = useState(null);
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [targetName, setTargetName] = useState(null);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        setTargetName(null);
        // TODO: expect this to be broken!
        const messagesUrl =
            process.env.REACT_APP_API_URL +
            "/messages/getAllMsgsForUser?username=" +
            props.username;
        // console.log(messagesUrl);
        fetch(messagesUrl, getOptions(messagesUrl)).then((res) => {
            res.json().then((messages) => {
                // username, content, deliveryDate
                console.log(messages);
                // let assembledMsgs = [];
                // let assembling = [];
                // let currentConvoPartner = "";
                // for (let i = 0; i < messages.length; i++) {
                //     const needToChangeConvoPartner =
                //         messages[i].users.indexOf(currentConvoPartner) === -1;
                //     if (needToChangeConvoPartner) {
                //         currentConvoPartner = getNewConvoPartner(
                //             messages,
                //             i,
                //             props.username
                //         );
                //     } else {
                //         assembling.push();
                //     }
                // }

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
    }, [setTargetName]);

    function getNewConvoPartner(messages, index, username) {
        if (messages[index].users.indexOf(username) !== 0) {
            return messages[index].users[0];
        } else {
            return messages[index].users[1];
        }
    }

    function loadMessageSelect() {
        if (messages) {
            return (
                <div id="inbox-items">
                    {messages.map((message, index) => {
                        return (
                            <InboxItem
                                key={message._id}
                                showMsg={() => {
                                    console.log("bbb");
                                    setSelectedMsg(message);
                                }}
                                username={message.users}
                                profilePic={bluePfp}
                                content={message.userMsgs[0].content}
                                deliveryDate={message.userMsgs[0].time}
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
            <div className="d-flex hacky-hider">
                <div id="inbox">
                    <div className="inbox-header inbox-header-border pl-2 py-1 d-flex justify-content-between align-items-center">
                        <h1 className="pl-2">Messages Page</h1>
                        <div className="mr-3 d-flex">
                            <img
                                src={Mail}
                                className="msgs-img-btn mr-2"
                                onClick={() => {
                                    setSelectedMsg("new");
                                }}
                                alt="new msg"
                            />
                            <img
                                src={Gear}
                                className="msgs-img-btn mr-2"
                                onClick={() => {
                                    console.error(
                                        "you shouldn't have clicked me, feature not installed"
                                    );
                                    setShowSettings(true); // i know this is bad but, convenience
                                    // open a div when openSettings===true;
                                }}
                                alt="settings for msgs"
                            />
                        </div>
                    </div>
                    <div id="inbox-msg-requests">
                        <p>Message requests</p>
                        <img
                            src={RightArrow}
                            alt="to requests"
                            height="30px"
                            with="30px"
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
                            <div id="inbox-items">
                                <SelectedUserDisplay
                                    selectedMsg={selectedMsg}
                                    userIsSelected={targetName}
                                    profilePic={bluePfp}
                                />
                            </div>
                        ) : (
                            // this one handles when a msg is open but no user is selected. tis "new".
                            <div id="inbox-items">
                                <SelectedUserDisplay
                                    selectedMsg={selectedMsg}
                                    userIsSelected={targetName}
                                    profilePic={bluePfp}
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
                            profilePic={bluePfp}
                        /> // this one handles when a msg is open but no user is selected. tis "new".
                    ) : (
                        <SelectedUserDisplay
                            selectedMsg={selectedMsg}
                            userIsSelected={targetName}
                            profilePic={bluePfp}
                        />
                        // this 1 handles after a user is selected.
                    )}
                </div>
            </div>
        </Wrapper>
    );
}

export default Messages;
