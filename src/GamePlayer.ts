export class GamePlayer {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    public canTakeMove(): boolean {
        return true;
    }

    public onTurnStart() {}

    public onMoveTaken() {}
}