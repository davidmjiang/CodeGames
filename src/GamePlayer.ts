export class GamePlayer {
    name: string;
    canTakeMove: boolean;

    constructor(name: string) {
        this.name = name;
        this.canTakeMove = true;
    }
}