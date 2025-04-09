import { CellOption } from "../types";
import React from "react";

interface Props {
    type: CellOption;

}

function Cell({type}: Props) { 
    return <div className={`cell ${type}`} />;

}

export default Cell;