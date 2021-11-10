import React from "react";

function Flooring({ flooring }) {
    return (
        <div>
            <input
                type="radio"
                id="highEnd"
                name="audienceSize"
                value="highEnd"
            />
            <label htmlFor="highEnd">{flooring}</label>
        </div>
    );
}

export default Flooring;
