import { GamePhase } from "../../src/GamePhase";
import { TakeStones } from "./TakeStonesMove";

export class NimPhase extends GamePhase {
    constructor() {
        super("Nim Phase");
    }
    
    public getMoves() {
        return [new TakeStones()];
    }
}