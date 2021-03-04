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
        this.subscribe(this.renderDebugPanel);
        this.game.start();
    }

    public get moves(): string[] {
        return this.game.getMoves();
    }

    public makeMove(move: string, ...args: any[]): MoveResult {
        return this.game.makeMove(move, ...args);
    }

    public getState() {
        let customData = this.game.custom;
        let currentPlayer = this.game.getCurrentPlayer().name;
        let currentPhase = this.game.getCurrentPhase().name;

        return {
            customData, currentPlayer, currentPhase
        };
    }

    public subscribe(cb) {
        this.game.subscribe(cb);
    }

    private renderDebugPanel(state) {
        // to get a debug panel, provide an element with id "debug" and we'll fill it with game state
        let debugPanel = document.getElementById("debug");
        debugPanel.innerText= JSON.stringify(state);
    }
}