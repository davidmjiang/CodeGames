import { Game } from "../../src/Game";
import { GameContext } from "../../src/GameContext";
import { AgricolaPlayer } from "./AgricolaPlayer";
import { MainPhase } from "./MainPhase";

let agricola: Game = new Game("Agricola");
agricola.hasPlayers(2,5);
agricola.addSetup((ctx: GameContext) => {
    let allPlayers = ctx.getPlayers() as AgricolaPlayer[];
    allPlayers.forEach(p => {
        p.food = p === ctx.getCurrentPlayer() ? 2 : 3;
    });
});

agricola.endIf((ctx) => false);

agricola.addPhase(new MainPhase());

export default agricola;