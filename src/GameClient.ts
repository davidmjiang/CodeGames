import { Game } from "./Game";
import { GameMove } from "./GameMove";
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
        this.renderMoves();
        this.game.start();
    }

    public get moves(): GameMove[] {
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
        debugPanel.innerHTML = "";
        // game state
        let gameState = document.createElement("div");
        gameState.style.display = "inline-block";
        gameState.style.verticalAlign = "top";
        debugPanel.appendChild(gameState);
        gameState.innerText= JSON.stringify(state, ["currentPhase", "currentPlayer", "turn"], 2);
        // player 1
        let player1 = document.createElement("div");
        debugPanel.appendChild(player1);
        player1.innerText = JSON.stringify(state.players[0], null, 2);
        player1.style.display = "inline-block";
        player1.style.verticalAlign = "top";
        // player 2 
        let player2 = document.createElement("div");
        debugPanel.appendChild(player2);
        player2.innerText = JSON.stringify(state.players[1], null, 2);
        player2.style.display = "inline-block";
        player2.style.verticalAlign = "top";
    }

    private renderMoves() {
        let movesList = document.getElementById("moves");
        let ul = document.createElement("ul");
        movesList.appendChild(ul);

        this.moves.forEach((move: GameMove) => {
            let li = document.createElement("li");
            ul.appendChild(li);
            li.innerText = move.name;
            let noSpaceName = move.name.replace(/\s+/g,'');
            let span = document.createElement("span");
            span.setAttribute("contenteditable", "true");
            span.setAttribute("id", noSpaceName);
            span.style.width = "100px";
            span.style.margin = "0px 10px";
            span.style.display = "inline-block";
            span.style.border = "1px dotted black";
            li.appendChild(span);
            let button = document.createElement("button");
            button.innerText = "make move";
            button.onclick = () => {
                let spanVal = span.innerText;
                let args = spanVal ? spanVal.split(',') : null;
                let moveName = move.name;
                if (args) {
                    this.makeMove(moveName, ...args);
                } else {
                    this.makeMove(moveName);
                }
                span.innerText = "";
            };
            li.appendChild(button);
        });
    }
}