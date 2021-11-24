import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
// logic imports
import { postOptions } from "../../_helper/authHeader";
import Styling from "../../utility/classes/Styling";
import {
    FLOORS,
    // EMPHASIS,
    // SPECIALS,
    // BG_COLORS,
    // FONT_SIZES,
} from "../../_helper/consts";
import {
    prettyText,
    detectIsStylingEmpty,
    styleObjectIsEmpty,
    processMin,
    processMax,
} from "../../utility/utility";
// images
import BackButton from "../../images/icons8-back-arrow-48-wh.png";
import Photo from "../../images/mountain-32.png";
import Gif from "../../images/gif-48.png";
import Poll from "../../images/poll-48.png";
import Emoji from "../../images/happy-48.png";
import Nicolai from "../../images/markZuckerberg.jpeg";
// major imports
import Wrapper from "../_pageHelper/Wrapper";
import TextArea from "./components/TextArea";
import ChoiceMaker from "./components/ChoiceMaker";

import Emphasis from "./components/Emphasis";
import Special from "./components/Special"; // lighthouse
import BackgroundColor from "./components/BackgroundColor";
import FontSlider from "./components/FontSlider";

import Flooring from "./components/Flooring";

import "./Post.scss";
import "../../components/textStyling/TextStyling.css";
// import { current } from "@reduxjs/toolkit";

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

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function updateStyleWithType(type, styleObject, setter) {
        console.log(116, type, styleObject, setter);
        let newNthStyle = {
            ...styleObject,
        };
        let currentStyles = styleObject.stylings;
        if (typeof currentStyles === "undefined") {
            currentStyles = [];
        }
        currentStyles.push(type);
        newNthStyle.stylings = currentStyles.filter(onlyUnique);

        setter(newNthStyle);
    }

    // function createNouveauObject()

    function addStyleToSection(type) {
        console.log(
            113,
            type,
            currentStyle,
            firstStyle,
            secondStyle,
            thirdStyle
        );
        if (currentStyle === 0) {
            // https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            let firstStyleIsEmpty = styleObjectIsEmpty(firstStyle);
            console.log(131, firstStyleIsEmpty, firstStyle);

            if (!firstStyleIsEmpty) {
                // type can still be empty tho
                updateStyleWithType(type, firstStyle, setFirstStyle);
            } else {
                // make the style. DO NOT refactor this to be outside of "currentStyle" dependency
                let styleInit = {
                    start: 0,
                    end: 3,
                    styles: [type],
                };
                console.log("creating style...", styleInit, 134);
                setFirstStyle(styleInit);
            }
        } else if (currentStyle === 1) {
            let secondStyleIsEmpty = styleObjectIsEmpty(secondStyle);
            console.log(149, secondStyleIsEmpty, secondStyle);

            if (!secondStyleIsEmpty) {
                updateStyleWithType(type, secondStyle, setSecondStyle);
            } else {
                // make the style. DO NOT refactor this to be outside of "currentStyle" dependency
                let styleInit = {
                    start: 0,
                    end: content.length,
                    styles: [type],
                };
                console.log("creating style...", 154);
                setSecondStyle(styleInit);
            }
        } else if (currentStyle === 2) {
            let thirdStyleIsEmpty = styleObjectIsEmpty(thirdStyle);
            console.log(179, thirdStyle, thirdStyleIsEmpty);
            if (!thirdStyleIsEmpty) {
                updateStyleWithType(type, thirdStyle, setThirdStyle);
            } else {
                // make the style. DO NOT refactor this to be outside of "currentStyle" dependency
                let styleInit = {
                    start: 0,
                    end: content.length,
                    styles: [type],
                };
                console.log("creating style...", 179);
                setThirdStyle(styleInit);
            }
        } else {
            console.log(currentStyle, "<--- weird bug");
        }
    }

    function removeStyleFromSection(type, index) {
        // fixme: very broken! if bold,italic,strikethrough, clicking 1 removes all.
        console.log(
            197,
            type,
            "this is index of what",
            index,
            "aiemd for bold"
        );
        let currentStyles;
        if (index === 0) {
            currentStyles = [...firstStyle.stylings];
            const typeIndex = currentStyles.indexOf(type);
            if (typeIndex > -1) {
                currentStyles.splice(typeIndex, 1);
            }
            let newFirstStyleObject = {
                start: firstStyle.start,
                end: firstStyle.end,
                styles: currentStyles,
            };
            setFirstStyle(newFirstStyleObject);
        } else if (index === 1) {
            currentStyles = [...secondStyle.stylings];
            const typeIndex = currentStyles.indexOf(type);
            if (typeIndex > -1) {
                currentStyles.splice(typeIndex, 1);
            }
            let newSecondStyleObject = {
                start: secondStyle.start,
                end: secondStyle.end,
                styles: currentStyles,
            };
            setSecondStyle(newSecondStyleObject);
        } else if (index === 2) {
            currentStyles = [...thirdStyle.stylings];
            const typeIndex = currentStyles.indexOf(type);
            // FIXME: i suspect something is broken in here
            if (typeIndex > -1) {
                currentStyles.splice(typeIndex, 1);
            }
            let newThirdStyleObject = {
                start: thirdStyle.start,
                end: thirdStyle.end,
                styles: currentStyles,
            };
            setThirdStyle(newThirdStyleObject);
        } else {
            console.log(currentStyle, "<--- weird bug");
            // throw "strange error";
        }
    }

    function handleChangeStartRange(styleObjectIndex, newStartIndex) {
        // console.log(2248, styleObjectIndex, newStartIndex);
        let integerNewStartIndex = parseInt(newStartIndex, 10);
        if (styleObjectIndex === 0) {
            let newFirstStyle = { ...firstStyle };
            newFirstStyle.start = integerNewStartIndex;
            setFirstStyle(newFirstStyle);
        } else if (styleObjectIndex === 1) {
            let newSecondStyle = { ...secondStyle };
            newSecondStyle.start = integerNewStartIndex;
            setSecondStyle(newSecondStyle);
        } else if (styleObjectIndex === 2) {
            let newThirdStyle = { ...thirdStyle };
            newThirdStyle.start = integerNewStartIndex;
            setThirdStyle(newThirdStyle);
        }
    }

    function handleChangeEndRange(styleObjectIndex, newEndIndex) {
        let integerNewEndIndex = parseInt(newEndIndex, 10);
        // console.log(2265, styleObjectIndex, newEndIndex, integerNewEndIndex);
        if (styleObjectIndex === 0) {
            let newFirstStyle = { ...firstStyle };
            newFirstStyle.end = integerNewEndIndex;
            setFirstStyle(newFirstStyle);
        } else if (styleObjectIndex === 1) {
            let newSecondStyle = { ...secondStyle };
            newSecondStyle.end = integerNewEndIndex;
            setSecondStyle(newSecondStyle);
        } else if (styleObjectIndex === 2) {
            let newThirdStyle = {
                ...thirdStyle,
            };
            newThirdStyle.end = integerNewEndIndex;
            setThirdStyle(newThirdStyle);
        }
    }

    function handleChangeStylingSelection(number) {
        setCurrentStyle(number); // does work btw!
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
                        <TextArea setContent={setContent} />
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
                                    {content.length > 8
                                        ? prettyText(
                                              content,
                                              [
                                                  firstStyle,
                                                  secondStyle,
                                                  thirdStyle,
                                              ]
                                              // setContent // YAGNI
                                          )
                                        : null}
                                </p>
                            </div>
                        </div>
                        <div id="post_styling-area">
                            <ChoiceMaker
                                key={0}
                                menuOption={0}
                                handleClick={() => {
                                    console.log(340, "should update sel");
                                    handleChangeStylingSelection(0);
                                }}
                                currentlyChecked={currentStyle}
                                currentMin={0}
                                currentMax={processMax(
                                    0,
                                    secondStyle.start,
                                    content.length
                                )}
                                stylingInfo={firstStyle.stylings}
                                adjustStart={handleChangeStartRange}
                                adjustEnd={handleChangeEndRange}
                                handleRemoval={removeStyleFromSection}
                            />
                            <ChoiceMaker
                                key={1}
                                menuOption={1}
                                handleClick={() => {
                                    console.log(340, "should update sel", 1);
                                    handleChangeStylingSelection(1);
                                }}
                                currentlyChecked={currentStyle}
                                currentMin={processMin(
                                    1,
                                    firstStyle.end,
                                    content.length
                                )}
                                currentMax={processMax(
                                    1,
                                    thirdStyle.start,
                                    content.length
                                )}
                                stylingInfo={secondStyle.stylings}
                                adjustStart={handleChangeStartRange}
                                adjustEnd={handleChangeEndRange}
                                handleRemoval={removeStyleFromSection}
                            />
                            <ChoiceMaker
                                key={2}
                                menuOption={2}
                                handleClick={() => {
                                    console.log(340, "should update sel", 2);
                                    handleChangeStylingSelection(2);
                                }}
                                currentlyChecked={currentStyle}
                                currentMin={processMin(
                                    2,
                                    secondStyle.end,
                                    content.length
                                )}
                                currentMax={processMax(
                                    2,
                                    undefined,
                                    content.length
                                )}
                                stylingInfo={thirdStyle.stylings}
                                adjustStart={handleChangeStartRange}
                                adjustEnd={handleChangeEndRange}
                                handleRemoval={removeStyleFromSection}
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
                                    onClick={() => {
                                        // console.log(
                                        //     433,
                                        //     "inside Emphasis onClick"
                                        // );
                                        addStyleToSection("bold");
                                    }}
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
                                        console.log(
                                            433,
                                            "inside Emphasis onClick"
                                        );
                                        addStyleToSection("underline");
                                    }}
                                />
                            </div>
                            <div id="" className="">
                                <FontSlider />
                            </div>
                            {/* <div className="">
                                <div className="pl-2">backgroundColor:</div>
                                <div className="post_tones-outer-container w-100">
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
                            <div className="">
                                <Special special={"textAlignmentUpDown"} />
                                <Special special={"textAlignmentAddPadding"} />
                                <Special special={"superscript"} />
                                <Special special={"subscript"} />
                            </div> */}
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
