import React from "react";

import processAmount from "../ProcessAmount";

import "./EngagementStats.css";

function EngagementStats(props) {
    
    return(
        <div className="statistic d-flex justify-content-start align-items-center">
                <img className="massive-btn" src={props.type} alt="reply"></img>
                <div className="d-flex flex-col justify-content-center align-items-center">
                    <p className="m-engagement-txt mx-1 my-0">
                        {props.replies !== undefined ? processAmount(props.replies, props.inFeed) : null}
                        {props.amps !== undefined ? processAmount(props.amps, props.inFeed) : null}
                        {props.likes !== undefined ? processAmount(props.likes, props.inFeed) : null}
                        {props.views !== undefined ? processAmount(props.views, props.inFeed) : null}
                    </p>
                </div>
            </div>
    )
}

export default EngagementStats;