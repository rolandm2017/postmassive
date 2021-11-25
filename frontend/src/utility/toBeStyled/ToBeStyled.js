import React from "react";

function Chunk({ index, availableStylings, chunkValue }) {
    return (
        <span key={index} className={`stylized ${availableStylings} `}>
            {chunkValue}
        </span>
    );
}

export default Chunk;
