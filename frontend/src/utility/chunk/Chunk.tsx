import React from "react";

type IChunkProps = {
    index: number,
    availableStylings: string,
    chunkValue: string,
};

export const Chunk: React.FC<IChunkProps> = ({ index, availableStylings, chunkValue }) => {
    return (
        <span key={index} className={`stylized ${availableStylings} `}>
            {chunkValue}
        </span>
    );
}
