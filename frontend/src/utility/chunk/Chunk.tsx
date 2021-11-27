import {FC, ReactNode} from "react";

type ChunkProps = {
    index: number,
    availableStylings: string,
    chunkValue: string,
};

export function Chunk: FC<ChunkProps>({ index, availableStylings, chunkValue }: ChunkProps) {
    return (
        <span key={index} className={`stylized ${availableStylings} `}>
            {chunkValue}
        </span>
    );
}
