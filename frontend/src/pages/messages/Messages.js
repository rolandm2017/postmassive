import React, { Component } from "react";

import InboxItem from "../../components/inboxItem/InboxItem";

import profilePicPlaceholder3 from "../../images/cat3.jpg";

import Wrapper from "../helper/Wrapper";

import "./Messages.scss";

class Messages extends Component {
    state = {
        messages: null,
    };

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/messages", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then((res) => {
            res.json().then((messages) => {
                console.log(messages);
                this.setState({ messages: messages });
            });
        });
    }

    render() {
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
                        <div className="inbox-header pl-2 d-flex justify-content-start align-items-center">
                            <h1>Messages Page</h1>
                        </div>
                        <div className="inbox-header pl-2 d-flex justify-content-start align-items-center">
                            {/* TODO: make the search input have larger margins top/bot */}
                            <input
                                id="inbox-search"
                                className="ml-2 mr-5"
                                placeholder="Search for people or message content"
                            ></input>
                        </div>
                        <div id="inbox-items">
                            {this.state.messages
                                ? this.state.messages.map((message) => {
                                      return (
                                          <InboxItem
                                              key={message.id}
                                              displayName={
                                                  message.author.displayName
                                              }
                                              username={message.author.username}
                                              profilePic={
                                                  profilePicPlaceholder3
                                              }
                                              content={message.content}
                                              deliveryDate={
                                                  message.deliveryDate
                                              }
                                          />
                                      );
                                  })
                                : null}
                        </div>
                    </div>
                    <div id="chat-display">
                        <h2>You don't have a message selected</h2>
                        <p>
                            Choose from your existing messages, or start a new
                            one.
                        </p>
                        <button>New message</button>
                    </div>
                </div>
            </Wrapper>
        );
    }
}

export default Messages;
