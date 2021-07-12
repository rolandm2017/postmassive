import React, { Component } from "react";

import Reply from "../../components/notifications/Reply";
import Amplify from "../../components/notifications/Amplify";
import Like from "../../components/notifications/Like";
import Follow from "../../components/notifications/Follow";
import Quote from "../../components/notifications/Quote";

import profilePicPlaceholder from "../../images/cat1.jpg";
import profilePicPlaceholder2 from "../../images/cat2.jpg";
import profilePicPlaceholder3 from "../../images/cat3.jpg";

import Wrapper from "../helper/Wrapper";

import "./Notifications.scss";
import "../../components/notifications/Shared.scss";

class Notifications extends Component {
    state = {
        notifications: null,
    };

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "/mock/notifications", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then((res) => {
            res.json().then((notifications) => {
                // console.log(notifications);
                this.setState({ notifications: notifications });
            });
        });
    }

    generate(data) {
        let profilePic;
        const choice = Math.floor(Math.random() * 3);
        if (choice === 0) {
            profilePic = profilePicPlaceholder;
        } else if (choice === 1) {
            profilePic = profilePicPlaceholder2;
        } else if (choice === 2) {
            profilePic = profilePicPlaceholder3;
        }

        // TODO: use multiple profile pics when the notification demands it
        // return <div style={{ color: "red" }}>Foo</div>;
        if (data.type === "reply") {
            return (
                // <div>Foo</div>
                <Reply
                    key={data.data.id}
                    replier={data.data.replier}
                    replierProfilePic={profilePic}
                    to={data.data.to}
                    content={data.data.content}
                />
            );
        } else if (data.type === "amplify") {
            return (
                <Amplify
                    key={data.data.id}
                    amplifier={data.data.amplifier}
                    profilePics={profilePic}
                    others={data.data.others}
                    author={data.data.author}
                    content={data.data.content}
                />
                // <div>Foo</div>
            );
        } else if (data.type === "like") {
            return (
                // <div>Foo</div>
                <Like
                    key={data.data.id}
                    headliner={data.data.headliner}
                    profilePics={profilePic}
                    likes={data.data.likes}
                    text={data.data.content}
                />
            );
        } else if (data.type === "follow") {
            return (
                <Follow
                    key={data.data.id}
                    user={data.data.user}
                    profilePic={profilePic}
                    others={data.data.others}
                />
                // <div>Foo</div>
            );
        } else if (data.type === "quote") {
            return (
                // <div>Foo</div>
                <Quote
                    key={data.data.id}
                    quoter={data.data.quoter}
                    quoterProfilePic={profilePic}
                    content={data.data.content}
                    OP={data.data.OP}
                    opProfilePic={profilePic}
                    originalText={data.data.originalText}
                />
            );
        }
    }

    render() {
        return (
            <Wrapper
                pageName="notifications"
                sectionName="notifications_main"
                onSearchPage={false}
                breakpoints={this.props.breakpoints}
            >
                <div className="notifications_container">
                    <div className="pt-3 pb-2">
                        <h2 id="notifications_headline">Notifications</h2>
                    </div>
                    {this.state.notifications
                        ? this.state.notifications.map(
                              (notification, index) => {
                                  return this.generate(notification);
                              }
                          )
                        : null}
                </div>
            </Wrapper>
        );
    }
}

export default Notifications;

// changing 100vh to 99vh in notifications.js, probably other places too, might rm vertical scroll bar
