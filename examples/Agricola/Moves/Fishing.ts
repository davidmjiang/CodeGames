import { GameContext } from "../../../src/GameContext";
import { MoveResult, MoveResults } from "../../../src/MoveResult";
import { AgricolaPlayer } from "../AgricolaPlayer";
import { AgricolaMove } from "./AgricolaMove";

export class Fishing extends AgricolaMove {
    public food: number;

    constructor() {
        super("Fishing");
        this.food = 0;
    }

    onTurnStart(ctx: GameContext) {
        this.food += 1;
        super.onTurnStart(ctx);
    }

    onMoveTaken(ctx: GameContext, ...args: any[]): MoveResult {
        if (this.moveTaken) {
            return MoveResults.INVALID;
        }
        let currentPlayer = ctx.getCurrentPlayer() as AgricolaPlayer;
        currentPlayer.food += this.food;
        this.food = 0;
        return super.onMoveTaken(ctx);
    }
}