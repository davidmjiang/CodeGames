import { GameContext } from "../../../src/GameContext";
import { MoveResult, MoveResults } from "../../../src/MoveResult";
import { AgricolaPlayer } from "../AgricolaPlayer";
import { BuildingResource } from "../BuildingResource";
import { AgricolaMove } from "./AgricolaMove";

export class DayLaborer extends AgricolaMove {
    constructor() {
        super("Day Laborer");
    }

    // args 
    // resourceChosen: BuildingResource - the resource chosen by the user
    onMoveTaken(ctx: GameContext, ...args: any[]): MoveResult {
        if (this.moveTaken) {
            return MoveResults.INVALID;
        }
        let currentPlayer = ctx.getCurrentPlayer() as AgricolaPlayer;
        currentPlayer.food += 1;
        let resourceChosen = args[0] as BuildingResource;
        this.addResource(currentPlayer, resourceChosen);
        return super.onMoveTaken(ctx);
    }

    private addResource(currentPlayer: AgricolaPlayer, resource: BuildingResource) {
        switch (resource) {
            case BuildingResource.Wood:
                currentPlayer.wood += 1;
                break;
            case BuildingResource.Clay:
                currentPlayer.clay += 1;
                break;
            case BuildingResource.Reed:
                currentPlayer.reed += 1;
                break;
            case BuildingResource.Stone:
                currentPlayer.stone += 1;
                break;
        }
    }   
}