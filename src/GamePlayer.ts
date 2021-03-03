export abstract class GamePlayer {
    name: string;
    canTakeMove: boolean;

    constructor(name: string) {
        this.name = name;
    }
}