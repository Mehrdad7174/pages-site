import { Block, SHAPES } from "../types";
import React from "react";

interface Props {
    upcomingBlock: Block[];
}

function UpcomingBlock({ upcomingBlock }: Props) {
    return (
        <div className="upcoming">
            {upcomingBlock.map((block, blockIndex) => {
                let shape = SHAPES[block].shape.filter((row) =>
                    row.some((Cell) => Cell)
                );
                return (
                    <div key={blockIndex}>
                        {shape.map((row, rowIndex) => {
                            <div key={rowIndex} className="row">
                                {row.map((isSet, cellIndex) => {
                                    const cellClass = isSet ? block : `hidden`;
                                    const key = `${blockIndex}-${rowIndex}-${cellIndex}`;
                                    return (
                                        <div key={key} className={`cell ${cellClass}`}></div>
                                    );
                                })}
                            </div>
                        })}
                    </div>
                );       
            })}
        </div>
    );
}

export default UpcomingBlock;