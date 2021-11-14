import React from "react";

import "./Poll.css";

function Poll(props) {
    // props.poll1.percentage for pct filled
    function convertWidthToCssClass(width, rightHandSide) {
        if (rightHandSide) {
            let remainder = 100 - width;
            return ".pct" + remainder.toString();
        }
        return ".pct" + width.toString();
    }

    return (
        <div>
            <div>
                <div className={convertWidthToCssClass(10)}>
                    <p>Fact</p>
                </div>
                <div className={convertWidthToCssClass(90)}></div>
            </div>
            <div>
                <div>
                    <p>Fiction</p>
                </div>
                <div></div>
            </div>
            <div>
                <div>
                    <p>Option 3</p>
                </div>
                <div></div>
            </div>
            <div>
                <div>
                    <p>Option 4</p>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default Poll;
