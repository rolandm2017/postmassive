import React from "react";

import "./Poll.css";

function convertWidthToCSSClassUsingSwitch(width) {
    let classForPoll;
    switch (width) {
        case 0:
            classForPoll = ".pct0";
            break;
        case 10:
            // code blockclassForPoll = ".pct0"
            classForPoll = ".pct10";
            break;
        case 20:
            // code blockclassForPoll = ".pct0"
            classForPoll = ".pct20";
            break;
        case 30:
            classForPoll = ".pct30";
            break;
        case 40:
            classForPoll = ".pct40";
            break;
        case 50:
            classForPoll = ".pct50";
            break;
        case 60:
            classForPoll = ".pct60";
            break;
        case 70:
            classForPoll = ".pct70";
            break;
        case 80:
            classForPoll = ".pct80";
            break;
        case 90:
            classForPoll = ".pct90";
            break;
        case 100:
            classForPoll = ".pct100";
            break;
        default:
            let errMsg = "this should never happen" + width;
            throw errMsg;
        // code block
    }
    return classForPoll;
}

let oldPoll = (
    <div className="pollGeneric">
        <div className="">
            <div className="shellInner">
                <div
                    className={`.thePollItself ${convertWidthToCSSClassUsingSwitch(
                        40
                    )}`}
                >
                    <p>aaaaaaaaaaaaa</p>
                </div>
                <div
                    className={`.thePollItself ${convertWidthToCSSClassUsingSwitch(
                        60
                    )}`}
                >
                    BBBBBBBBBBBBb
                </div>
            </div>
        </div>
        <div id="testOuter">
            <div id="testInnerOne">Words</div>
            <div id="testInnerTwo"></div>
        </div>
        <div id="testOuter2">
            <div id={"testInnerOne2"}>
                <p>Fiction</p>
            </div>
            <div id="testInnerTwo2"></div>
        </div>
        <div className="shellOuter">
            <div className="shellInner">
                <div className={convertWidthToCSSClassUsingSwitch(10)}>
                    <p>Option 3</p>
                </div>
            </div>
        </div>
        <div className="shellOuter">
            <div className="shellInner">
                <div className={convertWidthToCSSClassUsingSwitch(90)}>
                    <p>Option 4</p>
                </div>
            </div>
        </div>
    </div>
);

let newPoll = (
    <div className="secondaryPoll">
        <div className="pollResultContainer">
            <div className="side30">30%</div>
            <div className="side70">70%</div>
        </div>
        <div className="pollResultContainer">bar</div>
        <div className="pollResultContainer">baz</div>
        <div className="pollResultContainer">gad</div>
        <div className="pollResultContainer">zukes</div>
    </div>
);

function Poll(props) {
    // function convertWidthToCssClass(width, rightHandSide) {
    //     if (rightHandSide) {
    //         let remainder = 100 - width;
    //         // console.log(width, rightHandSide, remainder);

    //         if (rightHandSide !== remainder) {
    //             throw "How could it not be the right value?";
    //             // if this function is ever misused, this Throw will be thrown
    //         }
    //         let actualReturnValue = ".pct" + remainder.toString();
    //         // console.log(width, "17marker", remainder, actualReturnValue);
    //         return actualReturnValue;
    //     }
    //     let actualReturnValue = ".innerPollGeneric .pct" + width.toString();
    //     // console.log(width, "21marker", rightHandSide, actualReturnValue);
    //     return actualReturnValue;
    // }

    // props.poll1.percentage for pct filled
    return newPoll;
}

export default Poll;
