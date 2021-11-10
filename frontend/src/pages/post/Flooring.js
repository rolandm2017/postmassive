import React from "react";

function Flooring({ flooring }) {
    return (
        <div style={{ border: "2px solid red" }}>
            <input
                type="radio"
                id="highEnd"
                name="audienceSize"
                value="highEnd"
            />
            <label style={{ color: "white" }} htmlFor="highEnd">
                {flooring}
            </label>
        </div>
    );
}

export default Flooring;
