import React, { useState, useEffect } from "react";

import InboxItem from "../../components/inboxItem/InboxItem";

import profilePicPlaceholder3 from "../../images/profilePics/cat3.jpg";

import Button from "../../components/parts/Button";

import Wrapper from "../_helper/Wrapper";

import { getOptions } from "../../_helper/authHeader";

import "./Messages.scss";

function Messages(props) {
    const [messages, setMessages] = useState(null);
    const [selectedMsg, setSelectedMsg] = useState(null);

    useEffect(() => {
        const messagesUrl = process.env.REACT_APP_API_URL + "/messages";
        fetch(messagesUrl, getOptions(messagesUrl)).then((res) => {
            res.json().then((messages) => {
                console.log(messages);
                setMessages(messages);
            });
        });
    }, []);

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
                            <img alt="settings for msgs" />
                            <img alt="new msg" />
                        </div>
                    </div>
                    <div>
                        <p>Message requests</p>
                    </div>
                    <div className="inbox-header pl-2 py-2 d-flex justify-content-start align-items-center">
                        {/* TODO: make the search input have larger margins top/bot */}
                        <input
                            id="inbox-search"
                            className="ml-2 mr-5 pl-2 dark-mode-input"
                            placeholder="Search for people or content"
                        ></input>
                    </div>
                    <div id="inbox-items">
                        {messages !== null
                            ? messages.map((message) => {
                                  return (
                                      <InboxItem
                                          key={message.id}
                                          showMsg={() => {
                                              console.log("bbb");
                                              setSelectedMsg(message);
                                          }}
                                          displayName={
                                              message.author.displayName
                                          }
                                          username={message.author.username}
                                          profilePic={profilePicPlaceholder3}
                                          content={message.content}
                                          deliveryDate={message.deliveryDate}
                                      />
                                  );
                              })
                            : null}
                    </div>
                </div>
                <div id="chat-display-container">
                    {selectedMsg === null ? (
                        <div id="chat-display-inner-container">
                            {" "}
                            <h2>You don't have a message selected</h2>
                            <p>
                                Choose from your existing messages, or start a
                                new one.
                            </p>
                            <Button
                                text={"New message"}
                                blueBg={false}
                                authed={true}
                                onClick={() => {
                                    console.log("a");
                                    setSelectedMsg("new");
                                }}
                            ></Button>
                        </div>
                    ) : selectedMsg === "new" ? (
                        <div
                            id="chat-display-inner-container"
                            className="inbox-show-msg"
                        >
                            <div>
                                <input placeholder="username..." />
                            </div>
                            <div>{/* empty div */}</div>
                            <div>Input</div>
                        </div>
                    ) : (
                        <div
                            id="chat-display-inner-container"
                            className="inbox-show-msg"
                        >
                            <div>
                                @{selectedMsg.author.username}{" "}
                                <span>{selectedMsg.author.displayName}</span>
                            </div>
                            <div>
                                <p>{selectedMsg.content} </p>
                            </div>
                            <div>
                                <input placeholder="say what?" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    );
}

export default Messages;
