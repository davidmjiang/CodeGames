import { GameContext } from "../../../src/GameContext";
import { GameMove } from "../../../src/GameMove";
import { MoveResults } from "../../../src/MoveResult";

export class AgricolaMove extends GameMove {
    public moveTaken: boolean;

    constructor(name: string) {
        super(name);
    }

    onTurnStart(ctx: GameContext) {
        this.moveTaken = false;
    }

    onMoveTaken(ctx: GameContext) {
        this.moveTaken = true;
        return MoveResults.SUCCESS;
    }
}