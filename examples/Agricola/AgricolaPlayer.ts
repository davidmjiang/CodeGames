import { GamePlayer } from "../../src/GamePlayer";

export class AgricolaPlayer extends GamePlayer {
    // building materials
    public food: number;
    public wood: number;
    public clay: number;
    public reed: number;
    public stone: number;

    // farming
    public grain: number;
    public vegetables: number;
    public familyMembers: number;
}