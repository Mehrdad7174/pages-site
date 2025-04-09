import { useReducer} from "react";
import { Block, BlockShape, BoardShape, EmptyCell, SHAPES } from "../types";


export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

type BoardState = {
    board: BoardShape;
    droppingRow: number;
    droppingColumn: number;
    droppingBlock: Block;
    droppingShape: BlockShape;
};

type Action = {
    type: 'start' | 'drop' | 'move'  | 'commit' | 'reset';
    newBoard?: BoardShape,
    newBlock?: Block,
    isRotating?: boolean,
    isPressingLeft?: boolean,
    isPressingRight?: boolean,
};

export function useTetrisBoard(): [BoardState, React.Dispatch<Action>] {
    const [boardState, dispatchBoardState] = useReducer(
        boardReducer,
        {
            board: [],
            droppingRow: 0,
            droppingColumn: 0,
            droppingBlock: Block.I,
            droppingShape: SHAPES.I.shape,
        },
        (emptyState: any) => {
            const state = {
                ...emptyState,
                board: getEmptyBoard(),
            };
            return state;
        }
    );
    return [boardState, dispatchBoardState];
}

export function getEmptyBoard(height = BOARD_HEIGHT): BoardShape {
    return Array(height)
  .fill(null)
  .map(() => Array(BOARD_WIDTH).fill(EmptyCell.EMPTY));
}

export function hasCollision(
    board: BoardShape,
    currentShape: BlockShape,
    row: number,
    column: number
): boolean {
    let hasCollision = false;
    currentShape.filter((shapeRow) => shapeRow.some((isSet) => isSet))
        .forEach((shapeRow: boolean[], rowIndex: number) => {
            shapeRow.forEach((isSet: boolean, colIndex: number) => {
                if (isSet && (row + rowIndex >= board.length ||
                    column + colIndex >= board[0].length ||
                    column + colIndex < 0 || 
                    board[row + rowIndex][column + colIndex] !== EmptyCell.EMPTY)
                ) {
                    hasCollision = true;   

                }
            });
        });
    return hasCollision;
}



export function getRandomBlock(): Block {
    const blockValues = Object.values(Block);
    return blockValues[Math.floor(Math.random() * blockValues.length)] as Block;
}

function rotateBlock(shape: BlockShape): BlockShape {
    const rows = shape.length;
    const columns = shape[0].length;
    const rotated = Array(rows).fill(null)
        .map(() => Array(columns).fill(false));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            rotated[col][rows - row - 1] = shape[row][col];
        }
    }
    return rotated;
}


function boardReducer(state: BoardState, action: Action): BoardState {
    let newState = { ...state };

    switch (action.type) {
        case 'start':
            const firstBlock = getRandomBlock();
            return {
                board: getEmptyBoard(),
                droppingRow: 0,
                droppingColumn: 3,
                droppingBlock: firstBlock,
                droppingShape: SHAPES[firstBlock].shape,
            };
        case 'drop':
            newState.droppingRow += 1;
            break;
        case 'commit':
            if (!action.newBoard || !action.newBlock) {
                throw new Error('Invalid commit action: newBoard or newBlock is missing');
            }
            return {
                board: [
                    ...getEmptyBoard(BOARD_HEIGHT - action.newBoard!.length),
                    ...action.newBoard!,
                ],
                droppingRow: 0,
                droppingColumn: 3,
                droppingBlock: action.newBlock!,
                droppingShape: SHAPES[action.newBlock!].shape,
            };
        case 'move':
            const rotatedShape = action.isRotating
                ? rotateBlock(newState.droppingShape)
                : newState.droppingShape;
            let columnOffset = action.isPressingLeft ? -1 : 0;
            columnOffset = action.isPressingRight ? 1 : columnOffset;
            if (!hasCollision(newState.board, rotatedShape, newState.droppingRow, newState.droppingColumn + columnOffset)) {
                newState.droppingColumn += columnOffset;
                newState.droppingShape = rotatedShape;
            }
            break;
            case 'reset':
                return {
                    board: getEmptyBoard(),
                    droppingRow: 0,
                    droppingColumn: 3,
                    droppingBlock: getRandomBlock(),
                    droppingShape: SHAPES[getRandomBlock()].shape,
                }
        
        default:
            const unhandledType: never = action.type;
            throw new Error(`Unhandled action type: ${unhandledType}`);
    }

    return newState;
}