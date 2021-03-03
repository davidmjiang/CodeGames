import { ContextFunction } from "./ContextFunction";
import { GameMove } from "./GameMove";
import { GamePhase } from "./GamePhase";
import { GamePlayer } from "./GamePlayer";
import { MoveResult } from "./MoveResult";
import { PhaseManager } from "./PhaseManager";
import { PlayerManager } from "./PlayerManager";

export class Game {
    name: string;
    setupFunc: ContextFunction;
    onGameEndFunc: ContextFunction;
    endIfFn: ContextFunction;

    private roundsComplete: number = 0;

    private playerManager: PlayerManager;
    private phaseManager: PhaseManager;
    
    constructor(name: string) {
        this.name = name;
        this.playerManager = new PlayerManager();
        this.phaseManager = new PhaseManager();
    }

    // PLAYERS

    public hasPlayers(min: number, max: number): void
    {
        this.playerManager.hasPlayers(min, max);
    }

    public addPlayer(p: GamePlayer): void {
        this.playerManager.addPlayer(p);
    }

    public setStartPlayer(p: GamePlayer): void {
        this.playerManager.setStartPlayer(p);
    }

    public getCurrentPlayer(): GamePlayer {
        return this.playerManager.getCurrentPlayer();
    }

    public getPlayers(): GamePlayer[] {
        return this.playerManager.getPlayers();
    }
    //

    // PHASES

    public addPhase(phase: GamePhase): void {
        this.phaseManager.addPhase(phase);
    }

    public triggerPhase(phase: string): void {
        this.phaseManager.triggerPhase(phase);
    }

    public triggerNextPhase(): void {
        this.phaseManager.triggerNextPhase();
    }

    public getCurrentPhase(): GamePhase {
        return this.phaseManager.getCurrentPhase();
    }
    //

    // FOR DEFINITION

    public addSetup(setupFunc: ContextFunction): void {
        this.setupFunc = setupFunc;
    }

    public onGameEnd(cb: ContextFunction): void {
        this.onGameEndFunc = cb;
    }

    public endIf(cb: ContextFunction): void {
        this.endIfFn = cb;
    }

    public triggerGameEnd(): MoveResult {
        if (this.onGameEndFunc) {
            let metadata = this.onGameEndFunc(this);
            return {
                result: "GAME_OVER",
                data: metadata
            };
        }
        return {
            result: "GAME_OVER",
            data: null
        };
    }
    //

    // FOR CLIENT
    public start(): void {
        this.setupFunc(this);
        this.playerManager.onNewRound();
        this.phaseManager.onNewRound(this);
    }

    public getMoves(): string[] {
        let currentPhase: GamePhase = this.phaseManager.getCurrentPhase();
        let moves: GameMove[] = currentPhase.getMoves();
        return moves.map(m => m.name);
    }

    public makeMove(move: string, ...args: any[]): MoveResult {
        let result: MoveResult = this.phaseManager.makeMove(this, move, ...args);
        if (result.result === "GAME_OVER") {
            return result;
        }
        if (result.result === "SUCCESS") {
            if (!this.playerManager.advanceCurrentPlayer()) {
                // no one else can play this round, move on to the next
                this.roundsComplete++;
                this.phaseManager.onRoundEnd(this);
                if (this.endIfFn(this)) {
                    // game over. get some final information to show
                    let metadata = this.onGameEndFunc(this);
                    return {
                        result: "GAME_OVER",
                        data: metadata
                    };
                }
                // start the next round
                this.playerManager.onNewRound();
                this.phaseManager.onNewRound(this);
            }
        }
        return result;
    };
}