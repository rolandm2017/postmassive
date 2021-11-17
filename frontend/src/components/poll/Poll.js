import React from "react";

import Option from "./Option";
// import convertWidthToCSS from "./convertWidthToCSS";
import "./Poll.css";
function Poll({ pollText, possibilities, options, votesTotal, timeRemaining }) {
    function makeOptions(optionsInput) {
        // console.log(optionsInput);
        let pollOptions = (
            <div className="pollResultContainer">
                {optionsInput.map((poll, index) => {
                    // console.log(poll);
                    return (
                        <Option
                            key={index}
                            text={poll.text}
                            percentage={poll.percentage}
                        />
                    );
                })}
            </div>
        );
        return pollOptions;
    }
    // console.log(90, options, options.length);
    return (
        <div className="pollMainContainer">
            <div className="pollTextContainer">{pollText}</div>
            <div className={`heightModifier${possibilities}`}>
                {options.length === possibilities // safeguards
                    ? makeOptions(options)
                    : null}
            </div>
            <div>
                {votesTotal} - {timeRemaining}
            </div>
        </div>
    );
}

export default Poll;
