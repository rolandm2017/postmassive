import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Styling from "../../utility/classes/Styling";
// logic imports
import {
    FLOORS,
    EMPHASIS,
    // SPECIALS,
    // BG_COLORS,
    // FONT_SIZES,
} from "../../_helper/consts";
import {
    processMin,
    processMax,
} from "../../utility/process";
import prettyText from "../../utility/prettyText";

import { postPost } from "../../_helper/Post";
import {
    getAuctioneerResponse,
    
    addStyleToSection,
    removeStyleFromSection,
} from "../../_helper/auctioneer";
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
// import Special from "./components/Special"; // lighthouse
// import BackgroundColor from "./components/BackgroundColor";
import FontSlider from "./components/FontSlider";

import Flooring from "./components/Flooring";

import "./Post.scss";
import "../../components/textStyling/TextStyling.css";
import { first } from "rxjs";
// import { current } from "@reduxjs/toolkit";

function Post(props: any) {
    const [username, setUsername] = useState<string>("");
    const [content, setContent] = useState("");
    const [price, setPrice] = useState<string>("");
    const [floor, setFloor] = useState(NaN);
    const [currentStyle, setCurrentStyle] = useState(0); // 0, 1, 2 selects radio btn
    const [firstStyle, setFirstStyle] = useState(new Styling( 0, 0, []));
    const [secondStyle, setSecondStyle] = useState(new Styling( 0, 0, []));
    const [thirdStyle, setThirdStyle] = useState(new Styling( 0, 0, []));

    let currentUrl = useLocation().pathname;
    let history = useHistory();

    useEffect(() => {
        // console.log(30, currentUrl);
        let usernameForState: string = currentUrl.split("/")[1];
        // console.log(31, usernameForState);
        setUsername(usernameForState);
        let price: string = getAuctioneerResponse();
        setPrice(price);
    }, [currentUrl]);

    function handleGoToHome() {
        history.push("/home");
    }

    function convertToFormalStyling(start: number, end: number, stylings: string[], setter: any): void {
        const avoidPassByReference = new Styling(start, end, [...stylings]);
        setter(avoidPassByReference);
        return undefined;
    }

    function changeStartRange(styleObjectIndex: number, newStartIndex: any): void {
        // TODO: nail down newStartIndex as either string||integer
        // console.log(2248, styleObjectIndex, newStartIndex);
        let integerNewStartIndex: number = parseInt(newStartIndex, 10);
        if (styleObjectIndex === 0) {
            let newFirstStyle = new Styling(firstStyle.start, firstStyle.end, [...firstStyle.stylings]);
            newFirstStyle.start = integerNewStartIndex;
            setFirstStyle(newFirstStyle);
        } else if (styleObjectIndex === 1) {
            let newSecondStyle = new Styling(secondStyle.start, secondStyle.end, [...secondStyle.stylings]);
            newSecondStyle.start = integerNewStartIndex;
            setSecondStyle(newSecondStyle);
        } else if (styleObjectIndex === 2) {
            let newThirdStyle = new Styling(thirdStyle.start, thirdStyle.end, [...thirdStyle.stylings]);
            newThirdStyle.start = integerNewStartIndex;
            setThirdStyle(newThirdStyle);
        } else {
            throw Error("Index out of range for changeStartRange");
        }
    }

    // TODO: rewrite this func to use these 4 args -- it was plainly obvious to me that it was doable before
    function changeEndRange(
        styleObjectIndex: any, 
        newEndIndex: any,
    ): void {
        // console.log(108, styleObjectIndex, newEndIndex, setter)
        
        let integerNewEndIndex:number = parseInt(newEndIndex, 10);
        // console.log(2265, styleObjectIndex, newEndIndex, integerNewEndIndex);
        if (styleObjectIndex === 0) {
            let newFirstStyle = new Styling(firstStyle.start, firstStyle.end, [...firstStyle.stylings]);
            newFirstStyle.end = integerNewEndIndex;
            setFirstStyle(newFirstStyle);
        } else if (styleObjectIndex === 1) {
            let newSecondStyle = new Styling(secondStyle.start, secondStyle.end, [...secondStyle.stylings]);
            newSecondStyle.end = integerNewEndIndex;
            setSecondStyle(newSecondStyle);
        } else if (styleObjectIndex === 2) {
            let newThirdStyle = new Styling(thirdStyle.start, thirdStyle.end, [...thirdStyle.stylings]);
            newThirdStyle.end = integerNewEndIndex;
            setThirdStyle(newThirdStyle);
        }
    }

    function handleChangeStylingSelection(number: number): void {
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

    function inspecter(input1: any, inputArr: any): any {
        console.log(input1, inputArr[0], inputArr[1], inputArr[2])
        return input1;
    }

    function prettyWrapper(textInput, stylings) {
        let processedStylings: Styling[] = [];
        return prettyText(textInput, processedStylings);
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
                                <div className="post_color-white">
                                    {content.length > 4
                                        ? prettyText(
                                              content,
                                              [
                                                  new Styling(firstStyle.start, firstStyle.end, [...firstStyle.stylings]),
                                                  new Styling(secondStyle.start, secondStyle.end, [...secondStyle.stylings]),
                                                  new Styling(thirdStyle.start, thirdStyle.end, [...thirdStyle.stylings]),
                                              ]
                                              // setContent // YAGNI
                                          )
                                          
                                          
                                        //   .map((Chunk, index) => {
                                        //       return (
                                        //           <div>
                                        //               <Chunk />
                                        //           </div>
                                        //       );
                                        //   })
                                        : null}
                                </div>
                            </div>
                        </div>
                        <div id="post_styling-area">
                            <ChoiceMaker
                                key={0}
                                menuOption={0}
                                handleClick={() => {
                                    console.log(340, "should update sel", 0);
                                    handleChangeStylingSelection(0);
                                }}
                                currentlyChecked={currentStyle}
                                currentMin={0}
                                currentMax={processMax(
                                    0,
                                    secondStyle.start,
                                    content.length
                                )}
                                // currentMax={content.length}
                                stylingInfo={firstStyle.stylings}
                                adjustStart={changeStartRange}
                                // styling,styleObjectIndex,newStartIndex,setter
                                adjustEnd={changeEndRange}
                                handleRemoval={removeStyleFromSection}
                                styling={firstStyle}
                                setter={setFirstStyle}
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
                                adjustStart={changeStartRange}
                                adjustEnd={changeEndRange}
                                handleRemoval={removeStyleFromSection}
                                styling={secondStyle}
                                setter={setSecondStyle}
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
                                adjustStart={changeStartRange}
                                adjustEnd={changeEndRange}
                                handleRemoval={removeStyleFromSection}
                                styling={thirdStyle}
                                setter={setThirdStyle}
                            />
                        </div>
                        <p>
                            {/* TODO: steal from Facebook's ad targeting. Allow
                            targeting by age, gender. */}
                        </p>
                        <div id="post_targeting-container">
                            <div className="post_tones-outer-container w-100">
                                {EMPHASIS.map((styling, index) => {
                                    return (
                                        <div key={index}>
                                            <Emphasis
                                                emphasis={styling}
                                                onClick={() => {
                                                    if (currentStyle === 0) {
                                                        addStyleToSection(
                                                            firstStyle,
                                                            styling,
                                                            0,
                                                            setFirstStyle
                                                        );
                                                    } else if (
                                                        currentStyle === 1
                                                    ) {
                                                        addStyleToSection(
                                                            secondStyle,
                                                            styling,
                                                            1,
                                                            setSecondStyle
                                                        );
                                                    } else if (
                                                        currentStyle === 2
                                                    ) {
                                                        addStyleToSection(
                                                            thirdStyle,
                                                            styling,
                                                            2,
                                                            setThirdStyle
                                                        );
                                                    } else {
                                                        throw Error(
                                                            "You shouldn't be able to get here you know"
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    );
                                })}

                                {/* <Emphasis
                                    emphasis={"bold"}
                                    onClick={() => {
                                        // console.log(
                                        //     433,
                                        //     "inside Emphasis onClick"
                                        // );
                                        addStyleToSection("bold");
                                    })
                                }
                                /> */}
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
                                            ],
                                            // wrap up all 3 choices and put into Post
                                            handleGoToHome
                                        );
                                    }}
                                >
                                    Post
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
