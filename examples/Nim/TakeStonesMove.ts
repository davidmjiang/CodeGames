import { Game } from "../../src/Game";
import { GameMove } from "../../src/GameMove";
import { MoveResult, MoveResults } from "../../src/MoveResult";

export class TakeStones extends GameMove {
    constructor() {
        super("Take stones");
    }
    public onMoveTaken(ctx: Game, numToTake: number): MoveResult {
        let stonesLeft = ctx.custom.stones;
        if (numToTake == 1) {
            stonesLeft -= 1;
            return MoveResults.SUCCESS;
        }
        else if (numToTake == 2 && stonesLeft >= 2) {
            stonesLeft -= 2;
            return MoveResults.SUCCESS;
        }
        else {
            return MoveResults.INVALID;
        }
    }
}