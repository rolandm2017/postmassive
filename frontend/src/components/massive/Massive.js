import React from "react";

import EngagementContainer from "../engagementContainer/EngagementContainer";

import Logo from "../../images/bluePfp.png";

import "./Massive.css";

import "../textStyling/TextStyling.css";

function Massive(props) {
    // showMassiveAsPage(massiveId) {
    //     // massiveId is slug
    //     console.log(massiveId);
    //     props.history.push("/massive/" + massiveId.toString());
    // }

    function convertEngagementText(inputNum) {
        // will receive views and likes in the millions.
        // convert 10,000-999,999 -> 10.0k - 999.9k
        // 1,000,000 to 999m -> 1.00m - 999.9m
        const lengthOfSingleDigitThousands = String(1000).length;
        const lengthOfSingleDigitMillions = String(1000 * 1000).length;
        const stringVer = String(inputNum);

        if (inputNum < 1000) {
            return String(inputNum);
        } else if (inputNum < 1000000) {
            // thousands
            if (stringVer.length === lengthOfSingleDigitThousands) {
                // single digit thousands, special case
                return stringVer.slice(0, 1) + "." + stringVer.slice(1, 2);
            }
            const lengthPreDecimal = stringVer.length - 3;
            const decimal = stringVer.slice(
                lengthPreDecimal,
                lengthPreDecimal + 1
            );
            return (
                stringVer.slice(0, lengthPreDecimal) +
                "." +
                stringVer.slice(lengthPreDecimal, decimal) +
                "k"
            );
        } else if (inputNum < 1000000000) {
            if (stringVer.length === lengthOfSingleDigitMillions) {
                // single digit millions, special case
                return stringVer.slice(0, 1) + "." + stringVer.slice(1, 2);
            }
            const lengthPreDecimal = stringVer.length - 6; // 6: slice off the 0's in 13,000,000, for instance
            const decimal = stringVer.slice(
                lengthPreDecimal,
                lengthPreDecimal + 1
            );
            return (
                stringVer.slice(0, lengthPreDecimal) +
                "." +
                stringVer.slice(lengthPreDecimal, decimal) +
                "m"
            );
        } else {
            // don't ever expect a billion but maybe some day...
            console.log("wow!");
            return stringVer.slice(0, 1) + "." + stringVer.slice(1, 3) + "b";
        }
    }

    function enterCustomStyling(inputText, locationCodes, customStyling) {
        // how to locationCode? [1, 9, 36, 42, 49, 53, 193, 207] divide those up into subdivisions within the text.
        // 1-9 is span1, 36-42 is span2, 49-53 is span3

        return <span className={`${customStyling}`}>{inputText}</span>;
    }

    let customStyling = "fontSizeWholeText"; // hardcode via this input

    return (
        <div className="background-blue bg-blue-highlight">
            <div className="massive-container py-2 d-flex flex-column border-top ">
                <div className="d-flex">
                    <div className="m-profile-pic-container">
                        <img
                            className="massive-profile-pic profile-pic"
                            src={Logo}
                            alt="dish"
                        />
                    </div>
                    <div className="width-control text-left">
                        <div className="m-author-container mt-1 d-flex">
                            <p className="mr-2 mb-2">
                                <strong>{props.displayName}</strong>
                                {/* // props.displayName goes here! */}
                            </p>
                            <p className="m-author-handle mb-0">
                                {" "}
                                @{props.author}{" "}
                                {/* // this props author aka username goes here!!!! */}
                            </p>
                        </div>

                        <p className="mt-0 text-left">
                            {enterCustomStyling(
                                props.content,
                                "backgroundColorRed paddingMedium textSize26 makeStrikethrough"
                            )}
                        </p>
                        <EngagementContainer
                            replies={props.replies}
                            amps={props.amps}
                            likes={props.likes}
                            views={props.views}
                            cap={props.cap}
                            inFeed={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Massive;
