import { GameContext } from "../../../src/GameContext";
import { MoveResult, MoveResults } from "../../../src/MoveResult";
import { AgricolaPlayer } from "../AgricolaPlayer";
import { AgricolaMove } from "./AgricolaMove";

export class OneReed extends AgricolaMove {
    public reed: number;

    constructor() {
        super("One Reed");
        this.reed = 0;
    }

    onTurnStart(ctx: GameContext) {
        this.reed += 1;
    }

    onMoveTaken(ctx: GameContext, ...args: any[]): MoveResult {
        if (this.moveTaken) {
            return MoveResults.INVALID;
        }
        let currentPlayer = ctx.getCurrentPlayer() as AgricolaPlayer;
        currentPlayer.reed += this.reed;
        this.reed = 0;
        return super.onMoveTaken(ctx);
    }
}