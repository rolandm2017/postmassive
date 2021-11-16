import React from "react";

import Option from "./Option";
import convertWidthToCSS from "./convertWidthToCSS";
import "./Poll.css";

let oldPoll = (
    <div className="pollGeneric">
        <div className="">
            <div className="shellInner">
                <div className={`.thePollItself ${convertWidthToCSS(40)}`}>
                    <p>aaaaaaaaaaaaa</p>
                </div>
                <div className={`.thePollItself ${convertWidthToCSS(60)}`}>
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
                <div className={convertWidthToCSS(10)}>
                    <p>Option 3</p>
                </div>
            </div>
        </div>
        <div className="shellOuter">
            <div className="shellInner">
                <div className={convertWidthToCSS(90)}>
                    <p>Option 4</p>
                </div>
            </div>
        </div>
    </div>
);

let newPoll = <div></div>;

let originalPollResultsContainer = (
    <div className="pollResultContainer">
        <div className="pollInnerContainer">
            <div className="side30fill">30%</div>
            <div className="side70">70%</div>
        </div>
        <div className="pollInnerContainer">
            <div className="side10fill">10%</div>
            <div className="side90">90%</div>
        </div>
        <div className="pollInnerContainer">
            <div className="side10fill">10%</div>
            <div className="side90">90%</div>
        </div>
        <div className="pollInnerContainer">
            <div className="side0fill">0%</div>
            <div className="side100">100%</div>
        </div>
        <div className="pollInnerContainer">
            <div className="side80fill">80%</div>
            <div className="side20">20%</div>
        </div>
    </div>
);

function Poll({ possibilities, options }) {
    // props.poll1.percentage for pct filled
    let pollOptions = (
        <div className="pollResultContainer">
            {options.map((poll, index) => {
                <Option text={poll.text} percentage={poll.percentage} />;
            })}
        </div>
    );
    return (
        <div className="pollMainContainer">
            <div className="pollTextContainer"></div>
            {pollOptions}
        </div>
    );
}

export default Poll;
