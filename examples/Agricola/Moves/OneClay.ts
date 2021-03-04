import { GameContext } from "../../../src/GameContext";
import { MoveResult, MoveResults } from "../../../src/MoveResult";
import { AgricolaPlayer } from "../AgricolaPlayer";
import { AgricolaMove } from "./AgricolaMove";

export class OneClay extends AgricolaMove {
    public clay: number;

    constructor() {
        super("One Clay");
        this.clay = 0;
    }

    onTurnStart(ctx: GameContext) {
        this.clay += 1;
    }

    onMoveTaken(ctx: GameContext, ...args: any[]): MoveResult {
        if (this.moveTaken) {
            return MoveResults.INVALID;
        }
        let currentPlayer = ctx.getCurrentPlayer() as AgricolaPlayer;
        currentPlayer.clay += this.clay;
        this.clay = 0;
        super.onMoveTaken(ctx);
    }
}