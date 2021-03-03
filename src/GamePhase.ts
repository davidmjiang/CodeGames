import { GameContext } from "./GameContext";
import { GameMove } from "./GameMove";

export abstract class GamePhase {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
    
    abstract getMoves(): GameMove[];

    setup(ctx: GameContext): void {}
    postPhase(ctx: GameContext): void {}

    onTurnStart(ctx: GameContext): void {}
    onTurnEnd(ctx: GameContext): void {}
}