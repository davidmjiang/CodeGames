import { ContextFunction } from "./ContextFunction";
import { GameMove } from "./GameMove";
import { GamePhase } from "./GamePhase";
import { GamePlayer } from "./GamePlayer";
import { MoveResult, Result } from "./MoveResult";
import { PhaseManager } from "./PhaseManager";
import { PlayerManager } from "./PlayerManager";

export class Game {
    private name: string;
    private setupFunc: ContextFunction;
    private onGameEndFunc: ContextFunction;
    private endIfFn: ContextFunction;

    private subscribeFuncs = [];

    // users can put their custom fields here
    public custom: any;

    private roundsComplete: number = 0;

    private playerManager: PlayerManager;
    private phaseManager: PhaseManager;
    
    constructor(name: string) {
        this.name = name;
        this.playerManager = new PlayerManager();
        this.phaseManager = new PhaseManager();
        this.custom = {};
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
                result: Result.GAME_OVER,
                data: metadata
            };
        }
        return {
            result: Result.GAME_OVER,
            data: null
        };
    }
    //

    // FOR CLIENT
    public start(): void {
        // need to check that we have min # of players
        this.setupFunc(this);
        this.playerManager.onNewRound();
        this.phaseManager.onNewRound(this);
        this.updateClient();
    }

    public getMoves(): string[] {
        let currentPhase: GamePhase = this.phaseManager.getCurrentPhase();
        let moves: GameMove[] = currentPhase.getMoves();
        return moves.map(m => m.name);
    }

    public makeMove(move: string, ...args: any[]): MoveResult {
        let result: MoveResult = this.phaseManager.makeMove(this, move, ...args);
        this.updateClient();
        if (result.result === Result.GAME_OVER) {
            return result;
        }
        if (this.endIfFn(this)) {
            // game over. get some final information to show
            let metadata = this.endIfFn(this);
            return {
                result: Result.GAME_OVER,
                data: metadata
            };
        }
        if (result.result === Result.SUCCESS) {
            if (!this.playerManager.advanceCurrentPlayer()) {
                // no one else can play this round, move on to the next
                this.roundsComplete++;
                this.phaseManager.onRoundEnd(this);
                if (!this.endIfFn(this)) {
                    // start the next round
                    this.playerManager.onNewRound();
                    this.phaseManager.onNewRound(this);
                    this.updateClient();
                }
            }
            this.updateClient();
        }
        return result;
    };

    // you need to provide the current player in custom args for this to work
    public makeOneTimeMove(move: string, ...args: any[]): MoveResult {
        let result: MoveResult = this.phaseManager.makeMove(this, move, ...args);
        this.updateClient();
        return result;
    }

    public subscribe(cb: ContextFunction) {
        this.subscribeFuncs.push(cb);
    }

    private updateClient() {
        let currentPlayer: string = this.getCurrentPlayer().name;
        let currentPhase: string = this.getCurrentPhase().name;
        let custom = this.custom;
        let newState = {currentPhase, currentPlayer, custom};
        this.subscribeFuncs.forEach((cb) => {
            cb(newState);
        });
    }
}