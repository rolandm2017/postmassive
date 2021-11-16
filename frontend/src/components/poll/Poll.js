import React from "react";

import "./Poll.css";

function Poll(props) {
    function convertWidthToCssClass(width, rightHandSide) {
        if (rightHandSide) {
            let remainder = 100 - width;
            // console.log(width, rightHandSide, remainder);

            if (rightHandSide !== remainder) {
                throw "How could it not be the right value?";
                // if this function is ever misused, this Throw will be thrown
            }
            let actualReturnValue = ".pct" + remainder.toString();
            // console.log(width, "17marker", remainder, actualReturnValue);
            return actualReturnValue;
        }
        let actualReturnValue = ".innerPollGeneric .pct" + width.toString();
        // console.log(width, "21marker", rightHandSide, actualReturnValue);
        return actualReturnValue;
    }
    // props.poll1.percentage for pct filled
    return (
        <div className="pollGeneric">
            <div className="">
                <div className="shellInner">
                    <div
                        className={`.thePollItself ${convertWidthToCssClass(
                            10
                        )}`}
                    >
                        <p>Fact</p>
                    </div>
                    <div
                        className={`.thePollItself ${convertWidthToCssClass(
                            10,
                            90
                        )}`}
                    ></div>
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
            {/* <div className="shellOuter">
                <div className="shellInner">
                    <div className={convertWidthToCssClass(10)}>
                        <p>Option 3</p>
                    </div>
                </div>
            </div>
            <div className="shellOuter">
                <div className="shellInner">
                    <div className={convertWidthToCssClass(90)}>
                        <p>Option 4</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Poll;
