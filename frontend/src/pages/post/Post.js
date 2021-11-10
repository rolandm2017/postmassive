import React, { useState, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";

import { postOptions } from "../../_helper/authHeader";

import BackButton from "../../images/icons8-back-arrow-48-wh.png";
import Photo from "../../images/mountain-32.png";
import Gif from "../../images/gif-48.png";
import Poll from "../../images/poll-48.png";
import Emoji from "../../images/happy-48.png";
import Nicolai from "../../images/markZuckerberg.jpeg";

import Wrapper from "../_helper/Wrapper";

import "./Post.css";

function Post(props) {
    const [content, setContent] = useState("");
    const [username, setUsername] = useState(null);

    let currentUrl = useLocation().pathname;

    useEffect(() => {
        let usernameForState = currentUrl.split("/")[0];
        console.log(currentUrl, usernameForState);
        setUsername(usernameForState);
    }, [currentUrl]);

    // todo: on load, get username from slug.
    const history = useHistory();

    function getAuctioneerResponse() {
        // talks to server's auctioneer to get price of post
        return processIntToString(1050.13); // hardcoded for now
    }

    function processIntToString(integer) {
        return "$1,050.13";
    }

    async function postPost(username, content) {
        console.log("Sending ........", content);
        // send a post to the server to
        let postingUrl = process.env.REACT_APP_API_URL + "/api/post/post";
        await fetch(postingUrl, postOptions(postingUrl, false, 51, content)) // todo: content packages stuff into json.
            .then((x) => {
                if (200) {
                    return "success!";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Wrapper
            pagename="post"
            sectionName="post_main"
            onSearchPage={false}
            breakpoints={props.breakpoints}
        >
            <div id="post_headline" className="mt-2">
                <h3>Post A Massive</h3>
            </div>
            <div id="post_back-button-container" className="d-flex p-1">
                <img
                    id="post_back-button"
                    src={BackButton}
                    alt="go back"
                    onClick={() => {
                        history.goBack();
                    }}
                ></img>
            </div>
            <div className="mt-4 d-flex justify-content-center">
                <div id="post_profile-pic" className="post_spacer">
                    <img src={Nicolai} alt="profile pic"></img>
                </div>
                <div className="post_middle px-2">
                    <div className="">
                        <p>Audience Size:</p>
                        <input
                            type="radio"
                            id="lowEnd"
                            name="audienceSize"
                            value="lowEnd"
                        />
                        <label htmlFor="lowEnd">100</label>
                        <br />
                        <input
                            type="radio"
                            id="midRange"
                            name="audienceSize"
                            value="midRange"
                        />
                        <label htmlFor="midRange">1000</label>
                        <br />
                        <input
                            type="radio"
                            id="highEnd"
                            name="audienceSize"
                            value="highEnd"
                        />
                        <label htmlFor="highEnd">10000</label>
                        <br />
                        <input
                            type="radio"
                            id="premium"
                            name="audienceSize"
                            value="premium"
                        />
                        <label htmlFor="premium">100000</label>
                        <br />
                        <label htmlFor="content">
                            What do you want to say?
                        </label>
                        <br />
                        <textarea
                            id="content"
                            type="text"
                            name="content"
                            onChange={(event) => {
                                setContent(event.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div id="post-targeting">
                        <div>
                            <img src={Photo} alt="upload a pic"></img>
                            <img src={Gif} alt="select gif"></img>
                            <img src={Poll} alt="start poll"></img>
                            <img src={Emoji} alt="pick emoji"></img>
                        </div>
                        <p>
                            {/* TODO: steal from Facebook's ad targeting. Allow
                            targeting by age, gender. */}
                        </p>
                    </div>
                    <div>
                        <div>
                            <p>Price: {getAuctioneerResponse()}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    postPost(username, content);
                                }}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
                <div className="post_spacer"></div>
            </div>
        </Wrapper>
    );
}

export default Post;

// TODO-MUCH-LATER: Dynamically generate audience sizes based on monthly(?) pageviews
// TODO-LATER: wire up the price to the server's generated price

// REMEMBER: The idea is to price posts as an auction. Or like a stock market
// the site is getting lots of views = price goes down. few views and lots of posts = price goes up.
