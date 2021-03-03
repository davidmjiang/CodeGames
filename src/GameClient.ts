import { Game } from "./Game";
import { GamePlayer } from "./GamePlayer";
import { MoveResult } from "./MoveResult";

export class GameClient {
    private game: Game;
    
    constructor(game: Game) {
        this.game = game;
    }

    public addPlayer(player: GamePlayer): void {
        this.game.addPlayer(player);
    }

    public setStartPlayer(player: GamePlayer): void {
        this.game.setStartPlayer(player);
    }

    public start(): void {
        this.game.start();
    }

    public get moves(): string[] {
        return this.game.getMoves();
    }

    public makeMove(move: string, ...args: any[]): MoveResult {
        return this.game.makeMove(move, ...args);
    }
}