import React from "react";

import processAmount from "../ProcessAmount";

import Reply from "../../images/Group 57 - reply.png";
import Amplify from "../../images/Group 32 - retweet.png";
import Fave from "../../images/Group 56 - like.png";
import View from "../../images/Group 58 - views.png";

import "./EngagementContainer.css";

function EngagementContainer(props) {
    return (
        <div className="massive-btn-container mb-2">
            <div className="statistic d-flex justify-content-start align-items-center">
                <img className="massive-btn" src={Reply} alt="reply"></img>
                <div className="d-flex flex-col justify-content-center align-items-center">
                    <p className="m-engagement-txt mx-1 my-0">
                        {processAmount(props.replies, props.inFeed)}
                    </p>
                </div>
            </div>
            <div className=" d-flex justify-content-center align-items-center">
                <img className="massive-btn" src={Amplify} alt="amplify"></img>
                <div className="d-flex flex-col justify-content-center align-items-center">
                    <p className="m-engagement-txt mx-1 my-0">
                        {processAmount(props.amplifies, props.inFeed)}
                    </p>
                </div>
            </div>
            <div className=" d-flex justify-content-center align-items-center">
                <img className="massive-btn" src={Fave} alt="fave"></img>
                <div className="d-flex flex-col justify-content-center align-items-center">
                    <p className="m-engagement-txt mx-1 my-0">
                        {processAmount(props.likes, props.inFeed)}
                    </p>
                </div>
            </div>
            <div className="statistic d-flex justify-content-center align-items-center">
                <img className="massive-btn" src={View} alt="views"></img>
                <div className="d-flex flex-col justify-content-center align-items-center">
                    <p className="m-engagement-txt mx-1 my-0">
                        {processAmount(props.views, props.inFeed)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EngagementContainer;

// FIXME: make container have margin left and margin right so the mobile view has margins
