import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { getOptions } from "../../_helper/authHeader";

import BackButton from "../../images/icons8-back-50.png";
import BluePfp from "../../images/bluePfp.png";
import Reply from "../../images/Group 57 - reply.png";
import Amplify from "../../images/Group 32 - retweet.png";
import Fave from "../../images/Group 56 - like.png";

import MassiveComponent from "../../components/massiveComponent/MassiveComponent";

import { formatDateForRepliesSection } from "../../utility/TimeLogic";
import prettyText from "../../utility/prettyText.tsx";

import Wrapper from "../_pageHelper/Wrapper";

import { REPLIES } from "../../_helper/consts";

import "./Massive.css";

// TODO: make each Massiv have a custom URL based on Poster Username + MassivID

function Massive(props) {
    const { id } = useParams();
    const history = useHistory();

    const [massive, setMassive] = useState([]);
    // const [replies, setReplies] = useState([]);

    useEffect(() => {
        let feedUrl = process.env.REACT_APP_API_URL + "/massive/" + id;
        console.log(id, feedUrl);
        fetch(feedUrl, getOptions(feedUrl))
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(232323, data);
                setMassive(data[0]);
            });
    }, []);

    return (
        <Wrapper
            pageName="massive"
            sectionName="massive_viewer"
            onSearchPage={false}
            onMessagePgae={false}
            breakpoints={props.breakpoints}
        >
            <div className="d-flex align-items-center">
                <div className="singularMassiveBtnContainer">
                    <input
                        type="image"
                        src={BackButton}
                        className="singularMassiveBtn"
                        onClick={() => {
                            history.push("/home");
                        }}
                    />
                </div>
                {/* // back btn */}
                <p id="singularMsvBackBtn">Massives</p>
            </div>
            <div>
                {massive.length !== 0 ? (
                    <div id="msv_mainContainer">
                        <div
                            id="msv_usernameDisplayName"
                            className="d-flex msv_borderBottom"
                        >
                            <div>
                                <img src={BluePfp} />
                            </div>
                            <div>
                                <p>{massive.postedByUser}</p>
                                <p>@{massive.displayName}</p>
                            </div>
                        </div>
                        <div id="msv_content" className="msv_textFormat">
                            <div>
                                {prettyText(massive.text, massive.stylings)}
                            </div>
                            <div id="msv_date">
                                {formatDateForRepliesSection(
                                    new Date(
                                        parseInt(massive.date, 10)
                                    ).toString()
                                )}
                            </div>
                        </div>
                        <div
                            id="msv_engagement"
                            className="msv_textFormat d-flex justify-content-start"
                        >
                            <div>{massive.replies} replies</div>
                            <div>{massive.amps} amps</div>
                            <div>{massive.likes} likes</div>
                            <div>{massive.views} views</div>
                        </div>
                        <div
                            id="msv_buttons"
                            className="d-flex justify-content-around align-items-center"
                        >
                            <div className="d-flex align-items-center">
                                <button>
                                    <img
                                        className="massive-btn"
                                        src={Reply}
                                        alt="reply"
                                    ></img>
                                </button>
                            </div>
                            <div className="d-flex align-items-center">
                                <button>
                                    <img
                                        className="massive-btn"
                                        src={Amplify}
                                        alt="amp"
                                    />
                                </button>
                            </div>
                            <div className="d-flex align-items-center">
                                <button>
                                    <img
                                        className="massive-btn"
                                        src={Fave}
                                        alt="fave"
                                    />
                                </button>
                            </div>
                        </div>
                        <div id="msv_addReply">
                            <div></div>
                        </div>
                        <div id="msv_replies">
                            {REPLIES.map((reply, index) => {
                                // todo: make a reply component, prolly mostly the same as already writ code tho
                                // const stylings = reply.stylings
                                <MassiveComponent
                                    key={index}
                                    postedByUser={reply.postedByUser}
                                    displayName={reply.displayName}
                                    text={reply.text}
                                    replies={reply.replies}
                                    amps={reply.amps}
                                    likes={reply.likes}
                                    views={reply.views}
                                />;
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
        </Wrapper>
    );
}

export default Massive;
