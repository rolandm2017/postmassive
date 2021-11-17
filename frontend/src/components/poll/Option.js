import React from "react";

import convertWidthToCSS from "./convertWidthToCSS";

import "./Option.css";

function Option({ text, percentage }) {
    console.log(6, text, percentage, "returning option...");
    return (
        <div className="pollInnerContainer">
            <div className={convertWidthToCSS(percentage)}>
                <span>{text}</span>
            </div>
            <div className={convertWidthToCSS(100 - percentage)}></div>
        </div>
    );
}

export default Option;
