import React, { useState, useEffect } from "react";

import InboxItem from "../../components/inboxItem/InboxItem";

import profilePicPlaceholder3 from "../../images/profilePics/cat3.jpg";

import Button from "../../components/parts/Button";

import Wrapper from "../_helper/Wrapper";

import { getOptions } from "../../_helper/authHeader";

import "./Messages.scss";

function Messages() {
    const [messages, setMessages] = useState(null);

    useEffect(() => {
        const messagesUrl = process.env.REACT_APP_API_URL + "/messages";
        fetch(messagesUrl, getOptions(messagesUrl)).then((res) => {
            res.json().then((messages) => {
                console.log(messages);
                setMessages(messages);
            });
        });
    });

    const showMsg = (msgNum) => {
        return null;
    };

    return (
        <Wrapper
            pageName="messages"
            sectionName="messages_page"
            onSearchPage={false}
            breakpoints={this.props.breakpoints}
            onMessagePage={true}
        >
            <div className="d-flex">
                <div id="inbox">
                    <div className="inbox-header pl-2 py-1 d-flex justify-content-start align-items-center">
                        <h1 className="pl-2">Messages Page</h1>
                    </div>
                    <div className="inbox-header pl-2 py-2 d-flex justify-content-start align-items-center">
                        {/* TODO: make the search input have larger margins top/bot */}
                        <input
                            id="inbox-search"
                            className="ml-2 mr-5 pl-2 dark-mode-input"
                            placeholder="Search for people or message content"
                        ></input>
                    </div>
                    <div id="inbox-items">
                        {this.state.messages
                            ? this.state.messages.map((message) => {
                                  return (
                                      <InboxItem
                                          key={message.id}
                                          onClick={() => {
                                              showMsg(message.id);
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
                    {this.state.messageIsSelected > -1 ? (
                        <div id="chat-display-inner-container">
                            {this.state.selectedMessage}{" "}
                        </div>
                    ) : (
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
                                    // this.openNewMsg();
                                }}
                            ></Button>
                        </div>
                    )}
                </div>
            </div>
        </Wrapper>
    );
}

export default Messages;
