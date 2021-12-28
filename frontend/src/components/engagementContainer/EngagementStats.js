import React, { useState } from "react";

import processAmount from "../ProcessAmount";

import "./EngagementStats.scss";

function EngagementStats(props) {
    const [replies, setReplies] = useState(props.replies);
    const [amps, setAmps] = useState(props.amps);
    const [likes, setLikes] = useState(props.likes);
    const [replyClicked, setReplyClicked] = useState(false);
    const [ampClicked, setAmpClicked] = useState(false);
    const [likeClicked, setLikeClicked] = useState(false);

    return (
        <div
            onClick={() => {
                if (replies !== undefined) {
                    console.log("16");

                    if (replyClicked) {
                        setReplyClicked(false);
                        let update = replies - 1;
                        setReplies(update);
                    } else {
                        setReplyClicked(true);
                        let update = replies + 1;
                        setReplies(update);
                    }
                }
                if (amps !== undefined) {
                    console.log(20);

                    if (ampClicked) {
                        setAmpClicked(false);
                        let update = amps - 1;
                        setAmps(update);
                    } else {
                        setAmpClicked(true);
                        let update = amps + 1;
                        setAmps(update);
                    }
                }
                if (likes !== undefined) {
                    console.log(24);

                    if (likeClicked) {
                        setLikeClicked(false);
                        let update = likes - 1;
                        setLikes(update);
                    } else {
                        setLikeClicked(true);
                        let update = likes + 1;
                        setLikes(update);
                    }
                }
            }}
            className={`statistic d-flex justify-content-start align-items-center`}
        >
            <img className="massive-btn" src={props.type} alt="reply"></img>
            <div className="d-flex flex-col justify-content-center align-items-center">
                <p className="m-engagement-txt mx-1 my-0">
                    {replies !== undefined
                        ? processAmount(replies, props.inFeed)
                        : null}
                    {amps !== undefined
                        ? processAmount(amps, props.inFeed)
                        : null}
                    {likes !== undefined
                        ? processAmount(likes, props.inFeed)
                        : null}
                    {props.views !== undefined
                        ? processAmount(props.views, props.inFeed)
                        : null}
                </p>
            </div>
        </div>
    );
}

export default EngagementStats;
