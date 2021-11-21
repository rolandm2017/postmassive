import React, { useState, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";

import { postOptions } from "../../_helper/authHeader";

import {
    FLOORS,
    EMPHASIS,
    SPECIALS,
    BG_COLORS,
    FONT_SIZES,
} from "../../_helper/consts";

import BackButton from "../../images/icons8-back-arrow-48-wh.png";
import Photo from "../../images/mountain-32.png";
import Gif from "../../images/gif-48.png";
import Poll from "../../images/poll-48.png";
import Emoji from "../../images/happy-48.png";
import Nicolai from "../../images/markZuckerberg.jpeg";

import Wrapper from "../_pageHelper/Wrapper";
import Styling from "./components/Styling";

import Emphasis from "./components/Emphasis";
import Special from "./components/Special";
import BackgroundColor from "./components/BackgroundColor";
import FontSlider from "./components/FontSlider";

import Flooring from "./components/Flooring";

import "./Post.scss";
import { current } from "@reduxjs/toolkit";

function Post(props) {
    const [username, setUsername] = useState(null);
    const [content, setContent] = useState("");
    const [price, setPrice] = useState(null);
    const [floor, setFloor] = useState(NaN);
    const [currentStyle, setCurrentStyle] = useState(0); // 0, 1, 2 selects radio btn
    const [firstStyle, setFirstStyle] = useState({});
    const [secondStyle, setSecondStyle] = useState({});
    const [thirdStyle, setThirdStyle] = useState({});

    let currentUrl = useLocation().pathname;
    let history = useHistory();

    useEffect(() => {
        // console.log(30, currentUrl);
        let usernameForState = currentUrl.split("/")[1];
        // console.log(31, usernameForState);
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

    function handleClick() {
        history.push("/home");
    }

    function postPost(username, content, price, floor, styling) {
        // let displayName = user.displayName; // todo: get displayName for data
        let postContentWithStyling = {
            username: username,
            content: content,
            price: price,
            floor: floor,
            styling: styling,
        };
        // TODO: stick it into localHistory so browser can reload the data upon pgBack
        console.log("Sending ........", postContentWithStyling);
        // send a post to the server to
        let postingUrl = process.env.REACT_APP_API_URL + "/post/post";
        fetch(
            postingUrl,
            postOptions(postingUrl, false, 51, postContentWithStyling)
        ) // todo: content packages stuff into json.
            .then((x) => {
                if (200) {
                    handleClick(); // redirect to /home
                    console.log("sent data to server successfully");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function addStyleToSection(type) {
        console.log(106, type, currentStyle, firstStyle);
        if (currentStyle === 0) {
            let current = firstStyle.styles;
            current.push(type);
            firstStyle.styles = current;
            let newStyle = firstStyle;
            setFirstStyle(newStyle);
        } else if (currentStyle === 1) {
            let current = secondStyle.styles;
            current.push(type);
            secondStyle.styles = current;
            let newStyle = secondStyle;
            setSecondStyle(newStyle);
        } else if (currentStyle === 2) {
            let current = thirdStyle.styles;
            current.push(type);
            thirdStyle.styles = current;
            let newStyle = thirdStyle;
            setThirdStyle(newStyle);
        } else {
            console.log(currentStyle, "<--- weird bug");
        }
    }

    function removeStyleFromSection(type, index) {
        if (index === 0) {
            let current = firstStyle;
            const index = current.indexOf(type);
            if (index > -1) {
                current.splice(index, 1);
            }
            setFirstStyle(current);
        } else if (index === 1) {
            let current = secondStyle;
            const index = current.indexOf(type);
            if (index > -1) {
                current.splice(index, 1);
            }
            setSecondStyle(current);
        } else if (index === 2) {
            let current = thirdStyle;
            const index = current.indexOf(type);
            if (index > -1) {
                current.splice(index, 1);
            }
            setThirdStyle(current);
        } else {
            console.log(currentStyle, "<--- weird bug");
            // throw "strange error";
        }
    }

    function handleChangeStartRange(styleObj, startAdjustment, indexSetter) {
        // setRange;
        let currentStart = styleObj.start;
        if (startAdjustment === 1) {
            let newStart = currentStart + 1;
            styleObj.start = newStart;
            indexSetter(styleObj);
        } else if (startAdjustment === -1) {
            let newStart = currentStart - 1;
            styleObj.start = newStart;
            indexSetter(styleObj);
        } else {
            console.log(startAdjustment, 170);
        }
    }

    function handleChangeEndRange(styleObj, endAdjustment, indexSetter) {
        // setRange;
        let currentStart = styleObj.end;
        if (endAdjustment === 1) {
            let newEnd = currentStart + 1;
            styleObj.start = newEnd;
            indexSetter(styleObj);
        } else if (endAdjustment === -1) {
            let newEnd = currentStart - 1;
            styleObj.start = newEnd;
            indexSetter(styleObj);
        } else {
            console.log(startAdjustment, 170);
        }
    }

    function handleChangeOption(number) {
        setCurrentStyle(number);
        console.log(110, number);
    }

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
            <div className="mt-4 d-flex flex-column">
                <div id="post_top-half" className="post_space-divider">
                    <div
                        id="post_profile-pic"
                        className="post_spacer post_generic-spacer post_generic-filler"
                    >
                        <img src={Nicolai} alt="profile pic"></img>
                    </div>
                    <div className="post_middle px-2">
                        <div className="">
                            <div className="d-flex flex-column align-items-center">
                                <label htmlFor="content">
                                    What do you want to say?
                                </label>
                                {/* <br /> */}
                                <textarea
                                    id="content"
                                    type="text"
                                    name="content"
                                    default="hello i am writing some text into the textbox so it has value by default"
                                    onChange={(event) => {
                                        console.log(
                                            170,
                                            event.target.value,
                                            content
                                        );
                                        setContent(event.target.value);
                                    }}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div
                        id="post_right-spacer"
                        className="post_spacer post_generic-spacer post_generic-filler"
                    >
                        <div className="w-100"></div>
                    </div>
                </div>
                <div id="post_bottom-half" className="post_space-divider">
                    <div
                        id="post_profile-pic"
                        className="post_spacer post_generic-spacer"
                    >
                        <div className="post_generic-filler"></div>
                        {/* <img src={Nicolai} alt="profile pic"></img> */}
                    </div>
                    <div
                        id="post_targeting"
                        className="d-flex flex-column justify-content-center"
                    >
                        <div id="post_option-buttons" className="w-100">
                            <img src={Photo} alt="upload a pic"></img>
                            <img src={Gif} alt="select gif"></img>
                            <img src={Poll} alt="start poll"></img>
                            <img src={Emoji} alt="pick emoji"></img>
                        </div>
                        <div id="post_typed-content-area">
                            {/* // select up to 3 types of stylings, set
                            textLocationRanges with sliders. // stack
                            stylingTypes with drag n drop, or by selecting the
                            type then selecting another styling */}
                            <div>
                                <p className="post_color-white">
                                    {
                                        "Wife surprised me by bringing home a picnic table. $150.\n Spent hours painting it, almost a hundo on paint and primer, and I’m pretty sure oil based Rustoleum ruined my sprayer. \n Would have been cheaper to light the damn thing on fire"
                                    }
                                </p>
                                <button
                                    onClick={() => {
                                        console.log(
                                            // stylingChoices,
                                            firstStyle,
                                            secondStyle,
                                            thirdStyle,
                                            225
                                        );
                                    }}
                                >
                                    Inspect
                                </button>
                            </div>
                        </div>
                        <div id="post_styling-area">
                            <Styling
                                key={0}
                                option={0}
                                handleClick={() => {
                                    handleChangeOption(0);
                                }}
                                currentlyChecked={currentStyle}
                                stylingInfo={firstStyle.styles}
                                range={() => {
                                    handleChangeRange();
                                }}
                                previousStyleEnd={null}
                                nextStyleStart={secondStyle.start}
                            />
                            <Styling
                                key={1}
                                option={1}
                                handleClick={() => {
                                    handleChangeOption(1);
                                }}
                                currentlyChecked={currentStyle}
                                stylingInfo={secondStyle.styles}
                                range={() => {
                                    handleChangeRange();
                                }}
                                previousStyleEnd={firstStyle.end}
                                nextStyleStart={thirdStyle.start}
                            />
                            <Styling
                                key={2}
                                option={2}
                                handleClick={() => {
                                    handleChangeOption(2);
                                }}
                                currentlyChecked={currentStyle}
                                stylingInfo={thirdStyle.styles}
                                range={() => {
                                    handleChangeRange();
                                }}
                                previousStyleEnd={secondStyle.start}
                                nextStyleStart={null}
                            />
                        </div>
                        <p>
                            {/* TODO: steal from Facebook's ad targeting. Allow
                            targeting by age, gender. */}
                        </p>
                        <div id="post_targeting-container">
                            <div className="post_tones-outer-container w-100">
                                <Emphasis
                                    emphasis={"bold"}
                                    onClick={addStyleToSection("bold")}
                                />
                                <Emphasis
                                    emphasis={"italics"}
                                    onClick={() => {
                                        addStyleToSection("italics");
                                    }}
                                />
                                <Emphasis
                                    emphasis={"strikethrough"}
                                    onClick={() => {
                                        addStyleToSection("strikethrough");
                                    }}
                                />
                                <Emphasis
                                    emphasis={"underline"}
                                    onClick={() => {
                                        addStyleToSection("underline");
                                    }}
                                />
                            </div>
                            <div id="" className="aaaaaa">
                                <FontSlider />
                            </div>
                            <div className="aaaaaa">
                                <div className="pl-2">backgroundColor:</div>
                                <div className="post_tones-outer-container w-100 aaaaaa">
                                    <BackgroundColor color={"red"} />
                                    <BackgroundColor color={"orange"} />
                                    <BackgroundColor color={"yellow"} />
                                    <BackgroundColor color={"purple"} />
                                    <BackgroundColor color={"blue"} />
                                    <BackgroundColor color={"green"} />
                                    <BackgroundColor color={"teal"} />
                                    <BackgroundColor color={"black"} />
                                </div>
                            </div>
                            <div className="aaaaaa">
                                <Special special={"textAlignmentUpDown"} />
                                <Special special={"textAlignmentAddPadding"} />
                                <Special special={"superscript"} />
                                <Special special={"subscript"} />
                            </div>
                        </div>
                        <div>
                            <div id="post_floor-container">
                                <div>
                                    <p>Audience Floor:</p>
                                </div>
                                <div className="post_floor-container-inner">
                                    {floors}
                                </div>
                                {/* <br /> */}
                            </div>
                            <div>
                                <p>Price: ${price}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        postPost(
                                            username,
                                            content,
                                            price,
                                            floor,
                                            [
                                                firstStyle,
                                                secondStyle,
                                                thirdStyle,
                                            ] // wrap up all 3 choices and put into Post
                                        );
                                    }}
                                >
                                    Post
                                </button>
                                <button
                                    onClick={() => {
                                        console.log(
                                            currentStyle,
                                            firstStyle,
                                            secondStyle,
                                            thirdStyle
                                        );
                                    }}
                                >
                                    Inspect
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        id="post_right-spacer"
                        className="post_spacer post_generic-spacer"
                    >
                        <div className="w-100 post_generic-filler"></div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default Post;

// TODO-MUCH-LATER: Dynamically generate audience sizes based on monthly(?) pageviews
// TODO-LATER: wire up the price to the server's generated price

// REMEMBER: The idea is to price posts as an auction. Or like a stock market
// the site is getting lots of views = price goes down. few views and lots of posts = price goes up.
