import { GameContext } from "../../../src/GameContext";
import { MoveResult, MoveResults } from "../../../src/MoveResult";
import { AgricolaPlayer } from "../AgricolaPlayer";
import { AgricolaMove } from "./AgricolaMove";

export class ThreeWood extends AgricolaMove {
    public wood: number;

    constructor() {
        super("Three Wood");
        this.wood = 0;
    }

    onTurnStart(ctx: GameContext) {
        this.wood += 3;
        super.onTurnStart(ctx);
    }

    onMoveTaken(ctx: GameContext, ...args: any[]): MoveResult {
        if (this.moveTaken) {
            return MoveResults.INVALID;
        }
        let currentPlayer = ctx.getCurrentPlayer() as AgricolaPlayer;
        currentPlayer.wood += this.wood;
        this.wood = 0;
        return super.onMoveTaken(ctx);
    }
}