import React, { useState, useEffect } from "react";

import Reply from "../../components/notifications/Reply"; // commented out 11-16
import Amplify from "../../components/notifications/Amplify";
import Like from "../../components/notifications/Like";
import Follow from "../../components/notifications/Follow";
import Quote from "../../components/notifications/Quote"; // commented out 11-16

import profilePicPlaceholder3 from "../../images/bluePfp.png";

import Wrapper from "../_pageHelper/Wrapper";

import "./Notifications.scss";
import "../../components/notifications/Shared.scss";

import { getOptions } from "../../_helper/authHeader";

function Notifications(props) {
    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        // TODO get username and link it where marle is hardcoded now
        const notificationsUrl =
            process.env.REACT_APP_API_URL + "/notifications/marle";
        console.log(notificationsUrl);
        fetch(notificationsUrl, getOptions(notificationsUrl)).then((res) => {
            res.json().then((notifications) => {
                // console.log(notifications);
                console.log("json inspection", notifications);
                setNotifications(notifications);
            });
        });
    }, []);

    function generate(data) {
        let profilePic;
        const choice = Math.floor(Math.random() * 3);
        if (choice === 0) {
            profilePic = profilePicPlaceholder3;
        } else if (choice === 1) {
            profilePic = profilePicPlaceholder3;
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
                    amplifier={data.data.author.displayName}
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

    return (
        <Wrapper
            pageName="notifications"
            sectionName="notifications_main"
            onSearchPage={false}
            breakpoints={props.breakpoints}
        >
            <div className="notifications_container">
                <div className="pt-3 pb-2">
                    <h2 id="notifications_headline">Notifications</h2>
                </div>
                {notifications === null
                    ? null
                    : notifications.map((notification, index) => {
                          return generate(notification);
                      })}
            </div>
        </Wrapper>
    );
}

export default Notifications;

// changing 100vh to 99vh in notifications.js, probably other places too, might rm vertical scroll bar
