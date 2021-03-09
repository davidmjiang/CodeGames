import { Game } from "./Game";
import { GameMove } from "./GameMove";
import { GamePhase } from "./GamePhase";
import { MoveResult } from "./MoveResult";

type PhaseMapEntry = {phase: GamePhase, next: GamePhase};
type PhaseMap = {[name: string]: PhaseMapEntry};

export class PhaseManager {
    // when building the map
    private startPhase: GamePhase;
    private lastPhase: GamePhase;

    // when playing the game
    private currentPhase: GamePhase;
    private phases: PhaseMap;

    constructor() {
        this.phases = {};
    }

    public addPhase(p: GamePhase): boolean {
        return this.addToPhaseMap(p);
    }

    public getCurrentPhase(): GamePhase {
        return this.currentPhase;
    }

    public triggerPhase(p: string): void {
        if (this.phases[p]) {
            this.currentPhase = this.phases[p].phase;
        }
    }

    public triggerNextPhase(): void {
        this.currentPhase = this.phases[this.currentPhase.name].next;
    }

    public onNewRound(ctx: Game): void {
        this.currentPhase.onTurnStart(ctx);
        let moves: GameMove[] = this.currentPhase.getMoves();
        moves.forEach(m => m.onTurnStart(ctx));
    }

    public onRoundEnd(ctx: Game): void {
        let moves: GameMove[] = this.currentPhase.getMoves();
        moves.forEach(m => m.onTurnEnd(ctx));
        this.currentPhase.onTurnEnd(ctx);
    }

    public makeMove(ctx: Game, moveName: string, ...args: any[]): MoveResult {
        let moves: GameMove[] = this.currentPhase.getMoves();
        let move: GameMove = moves.find(m => m.name === moveName);
        let result = move.onMoveTaken(ctx, ...args);
        ctx.getCurrentPlayer().onMoveTaken();
        // to-do: broadcast the move
        return result;
    }

    private addToPhaseMap(p: GamePhase): boolean {
        if (this.phases[p.name]) {
            // there is already a phase with this name
            return false;
        }

        if (!this.startPhase) {
            // this is the first phase to be added
            this.startPhase = p;
            this.lastPhase = p;
            this.currentPhase = p;
        }
        else {
            this.phases[this.lastPhase.name].next = p;
        }

        let entry: PhaseMapEntry = {
            phase: p,
            next: null
        };

        this.phases[p.name] = entry;
        return true;
    }
}