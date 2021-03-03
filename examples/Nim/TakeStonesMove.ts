import { Game } from "../../src/Game";
import { GameMove } from "../../src/GameMove";
import { MoveResult, MoveResults } from "../../src/MoveResult";

export class TakeStones extends GameMove {
    constructor() {
        super("Take stones");
    }
    public onMoveTaken(ctx: Game, numToTake: number): MoveResult {
        if (numToTake == 1) {
            ctx.custom.stones -= 1;
            return MoveResults.SUCCESS;
        }
        else if (numToTake == 2 && ctx.custom.stones >= 2) {
            ctx.custom.stones -= 2;
            return MoveResults.SUCCESS;
        }
        else {
            return MoveResults.INVALID;
        }
    }
}