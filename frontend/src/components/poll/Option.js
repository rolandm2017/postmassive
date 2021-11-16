import React from "react";

import convertWidthToCSS from "./convertWidthToCSS";

function Option(text, percentage) {
    return (
        <div className="pollInnerContainer">
            <div className={convertWidthToCSS(percentage)}>{text}</div>
            <div className={convertWidthToCSS(100 - percentage)}></div>
        </div>
    );
}

export default Option;
