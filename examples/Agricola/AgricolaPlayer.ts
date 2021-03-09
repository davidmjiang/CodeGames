import { GamePlayer } from "../../src/GamePlayer";
import { Farmyard } from "./Farmyard";

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

    // board
    public farmyard: Farmyard;

    private movesTaken: number;

    constructor(name: string) {
        super(name);
        this.familyMembers = 2;
        this.food = 0;
        this.wood = 0;
        this.clay = 0;
        this.reed = 0;
        this.stone = 0;
        this.grain = 0;
        this.vegetables = 0;
        this.farmyard = new Farmyard();

        this.movesTaken = 0;
    }

    public onTurnStart() {
        this.movesTaken = 0;
    }

    public onMoveTaken() {
        this.movesTaken++;
    }

    public canTakeMove(): boolean {
        return this.familyMembers > this.movesTaken;
    }
}