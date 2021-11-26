import React from "react";

export function Chunk({ index, availableStylings, chunkValue }) {
    return (
        <span key={index} className={`stylized ${availableStylings} `}>
            {chunkValue}
        </span>
    );
}
