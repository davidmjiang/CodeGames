import { GameContext } from "../../../src/GameContext";
import { MoveResult, MoveResults } from "../../../src/MoveResult";
import { AgricolaPlayer } from "../AgricolaPlayer";
import { AgricolaMove } from "./AgricolaMove";

export class Plow extends AgricolaMove {
    constructor() {
        super("Plow");
        this.customArgs = 1;
    }

    // args
    // space: number - the index in the farmyard to plow
    onMoveTaken(ctx: GameContext, ...args: any[]): MoveResult {
        if (this.moveTaken) {
            return MoveResults.INVALID;
        }
        let currentPlayer = ctx.getCurrentPlayer() as AgricolaPlayer;
        let spaceToPlow: number = args[0];
        if (currentPlayer.farmyard.plow(spaceToPlow)) {
            return super.onMoveTaken(ctx);
        } else {
            return MoveResults.INVALID;
        }
    }
}