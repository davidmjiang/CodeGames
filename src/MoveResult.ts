export enum Result {
    SUCCESS,
    INVALID,
    GAME_OVER
};

export type MoveResult = {result: Result, data?: any}

export const MoveResults = {
    SUCCESS: {
        result: Result.SUCCESS
    },
    INVALID: {
        result: Result.INVALID
    },
    GAME_OVER: {
        result: Result.GAME_OVER
    }
};