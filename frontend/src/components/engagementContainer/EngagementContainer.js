import React from "react";

import EngagementStats from "./EngagementStats";

import Reply from "../../images/Group 57 - reply.png";
import Amplify from "../../images/Group 32 - retweet.png";
import Fave from "../../images/Group 56 - like.png";
import View from "../../images/Group 58 - views.png";

import "./EngagementContainer.css";

function EngagementContainer(props) {
    return (
        <div className="massive-btn-container mb-2">
            <EngagementStats type={Reply} replies={props.replies} inFeed={props.inFeed}/>
            <EngagementStats type={Amplify} amps={props.amps} inFeed={props.inFeed}/>            
            <EngagementStats type={Fave} likes={props.likes} inFeed={props.inFeed}/>
            <EngagementStats type={View} views={props.views} inFeed={props.inFeed}/>
        </div>
    );
}

export default EngagementContainer;

// FIXME: make container have margin left and margin right so the mobile view has margins
