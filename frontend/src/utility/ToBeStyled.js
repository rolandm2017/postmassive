import React from "react";

function ToBeStyled({ index, availableStylings, chunkValue }) {
    return (
        <span key={index} className={`stylized ${availableStylings} `}>
            {chunkValue}
        </span>
    );
}

export default ToBeStyled;
