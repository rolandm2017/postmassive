import React from "react";

import "./Poll.css";

function Poll(props) {
    // props.poll1.percentage for pct filled
    return (
        <div>
            <div>
                <div>
                    <p>Fact</p>
                </div>
            </div>
            <div>
                <div>
                    <p>Fiction</p>
                </div>
            </div>
            <div>
                <div>
                    <p>Option 3</p>
                </div>
            </div>
            <div>
                <div>
                    <p>Option 4</p>
                </div>
            </div>
        </div>
    );
}

export default Poll;
