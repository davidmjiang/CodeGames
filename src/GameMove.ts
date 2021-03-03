import { GameContext } from "./GameContext";
import { MoveResult } from "./MoveResult";

export abstract class GameMove {
    name: string;
    shouldBroadcast: boolean = false;

    constructor(name: string) {
        this.name = name;
    }

    onTurnStart(ctx: GameContext) {}

    onTurnEnd(ctx: GameContext) {}

    abstract onMoveTaken(ctx: GameContext, ...args: any[]): MoveResult;
    
    log(ctx: GameContext) {
        // logger logs current player and move and args
        console.log(`${ctx.getCurrentPlayer().name} takes ${this.name}`);
    }
}