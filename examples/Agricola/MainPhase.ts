import { GameMove } from "../../src/GameMove";
import { GamePhase } from "../../src/GamePhase";
import { BuildRoomOrStable } from "./Moves/BuildRoomOrStable";
import { DayLaborer } from "./Moves/DayLaborer";
import { Fishing } from "./Moves/Fishing";
import { OneClay } from "./Moves/OneClay";
import { OneGrain } from "./Moves/OneGrain";
import { OneReed } from "./Moves/OneReed";
import { Plow } from "./Moves/Plow";
import { StartingPlayer } from "./Moves/StartingPlayer";
import { ThreeWood } from "./Moves/ThreeWood";

export class MainPhase extends GamePhase {
    private moves: GameMove[];
    
    constructor() {
        super("Main Phase");
        this.moves = [new BuildRoomOrStable(),
            new StartingPlayer(),
            new OneGrain(),
            new Plow(),
            new DayLaborer(),
            new ThreeWood(),
            new OneClay(),
            new OneReed(),
            new Fishing()];
    }

    public getMoves() {
        return this.moves;
    }
}