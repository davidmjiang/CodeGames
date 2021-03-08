import { GameContext } from "../../../src/GameContext";
import { MoveResult, MoveResults } from "../../../src/MoveResult";
import { AgricolaPlayer } from "../AgricolaPlayer";
import { AgricolaMove } from "./AgricolaMove";

export class StartingPlayer extends AgricolaMove {
    constructor() {
        super("Starting Player");
    }

    onMoveTaken(ctx: GameContext, ...args: any[]): MoveResult {
        if (this.moveTaken) {
            return MoveResults.INVALID;
        }
        let currentPlayer = ctx.getCurrentPlayer() as AgricolaPlayer;
        currentPlayer.food += 1;
        ctx.setStartPlayer(currentPlayer);
        return super.onMoveTaken(ctx);
    }
}