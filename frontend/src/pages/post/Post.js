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

import Flooring from "./Flooring";

import "./Post.css";

function Post(props) {
    const FLOORS = [100, 1000, 10000, 100000];
    const [username, setUsername] = useState(null);
    const [content, setContent] = useState("");
    const [price, setPrice] = useState(null);
    const [floor, setFloor] = useState(NaN);

    let currentUrl = useLocation().pathname;
    let history = useHistory();

    useEffect(() => {
        console.log(30, currentUrl);
        let usernameForState = currentUrl.split("/")[1];
        console.log(31, usernameForState);
        setUsername(usernameForState);
        let price = getAuctioneerResponse();
        setPrice(price);
    }, [currentUrl]);

    // todo: on load, get username from slug.

    function getAuctioneerResponse() {
        // talks to server's auctioneer to get price of post
        let auctioneerSays = Math.random() * 1000;
        console.log(36, auctioneerSays);
        let asMoney = auctioneerSays.toString().split(".")[0];
        let decimalValue = Math.ceil(Math.random() * 99)
            .toString()
            .substring(0, 3);

        let price = asMoney + "." + decimalValue;

        return price;
    }

    // function processIntToString(integer) {
    //     // whatever comes into the func, it leaves with its trailing 2 ints as decimals.
    //     // 1003 --> 10.03; 20 => 0.20; 48320 => 483.20
    //     let toBeMoney = integer.toString();
    //     let processedIntoMoney =
    //         toBeMoney.slice(0, toBeMoney.length - 3) +
    //         "." +
    //         toBeMoney.slice(toBeMoney.length - 3);
    //     console.log(48, processedIntoMoney);
    //     return processedIntoMoney;
    // }

    function handleClick() {
        history.push("/home");
    }

    function postPost(username, content, price, floor) {
        // let displayName = user.displayName; // todo: get displayName for data
        let data = {
            username: username,
            content: content,
            price: price,
            floor: floor,
        };
        console.log("Sending ........", data);
        // send a post to the server to
        let postingUrl = process.env.REACT_APP_API_URL + "/post/post";
        fetch(postingUrl, postOptions(postingUrl, false, 51, data)) // todo: content packages stuff into json.
            .then((x) => {
                if (200) {
                    handleClick(); // FIXME: why isnt this a redirect??
                    console.log("sent data to server successfully");
                    // TODO: tell user it was successful, redirect them to see their engagement pour in.
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // function handler(floor) {
    //     setFloor(floor);
    // }

    const floors = FLOORS.map((floor, index) => (
        <div
            key={floor}
            onClick={() => {
                setFloor(floor);
            }}
        >
            <Flooring flooring={floor} />
        </div>
    ));

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
                        <p>Audience Floor:</p>

                        {floors}
                        {/* <br /> */}
                        <label htmlFor="content">
                            What do you want to say?
                        </label>
                        {/* <br /> */}
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
                            <p>Price: ${price}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    postPost(username, content, price, floor);
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
