import React from "react";

function Styling(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p className={`${props.styling}`}>{props.styling}</p>
        </div>
    );
}

export default Styling;
