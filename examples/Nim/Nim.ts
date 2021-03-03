import { Game } from "../../src/Game";
import { NimPhase } from "./NimPhase";

let nim: Game = new Game("Nim");
nim.hasPlayers(2, 2);
nim.addSetup((ctx) => {
    ctx.custom.stones = 10;
});

nim.addPhase(new NimPhase());

nim.endIf((ctx: Game) => {
    if (ctx.custom.stones === 0) {
        return {winner: ctx.getCurrentPlayer().name};
    }
});

export default nim;