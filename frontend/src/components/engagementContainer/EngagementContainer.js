import React from "react";

import ProcessAmount from "../ProcessAmount";

import Reply from "../../images/twit_reply.png";
import Amplify from "../../images/amplify.png";
import Fave from "../../images/twit_fave.png";
import View from "../../images/PostMassiv-Satellite.png";

import "./EngagementContainer.css";

function EngagementContainer(props) {
    return (
        <div className="massive-btn-container mb-2">
            <div className="statistic d-flex">
                <img className="massive-btn" src={Reply} alt="reply"></img>
                <p className="m-engagement-txt mx-1 mt-2">{props.replies}</p>
            </div>
            <div className="statistic d-flex">
                <img className="massive-btn" src={Amplify} alt="amplify"></img>
                <p className="m-engagement-txt mx-1 mt-2">{props.amplifies}</p>
            </div>
            <div className="statistic d-flex">
                <img className="massive-btn" src={Fave} alt="fave"></img>
                <p className="m-engagement-txt mx-1 mt-2">{props.likes}</p>
            </div>
            <div className="statistic d-flex">
                <img className="massive-btn" src={View} alt="views"></img>
                <p className="m-engagement-txt mx-1 mt-2">
                    {ProcessAmount(props.views, props.inFeed)}
                </p>
            </div>
        </div>
    );
}

export default EngagementContainer;

// FIXME: make container have margin left and margin right so the mobile view has margins
