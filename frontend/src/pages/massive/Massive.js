import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { getOptions } from "../../_helper/authHeader";

import BackButton from "../../images/icons8-back-50.png";
import BluePfp from "../../images/bluePfp.png";

import Reply from "../../images/Group 57 - reply.png";
import Amplify from "../../images/Group 32 - retweet.png";
import Fave from "../../images/Group 56 - like.png";

import Wrapper from "../_pageHelper/Wrapper";

import { REPLIES } from "../../_helper/consts";

import "./Massive.css";

// TODO: make each Massiv have a custom URL based on Poster Username + MassivID

function Massive(props) {
    const { id } = useParams();
    const history = useHistory();

    const [massive, setMassive] = useState([]);
    const [replies, setReplies] = useState([]);

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
                        <div id="msv_content" className="">
                            {massive.text}
                        </div>
                        <div id="msv_date" className="">
                            {new Date(massive.date).toString()}
                        </div>
                        <div id="msv_engagement" className="">
                            {massive.replies} {massive.amps} {massive.likes}{" "}
                            {massive.views}
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
                                return <div>fooo</div>;
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
        </Wrapper>
    );
}

export default Massive;
