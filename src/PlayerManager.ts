import { GamePlayer } from "./GamePlayer";

type PlayerMapEntry = {player: GamePlayer, next: GamePlayer};
type PlayerMap = {[name: string]: PlayerMapEntry}

export class PlayerManager {
    private startPlayer: GamePlayer;
    private currentPlayer: GamePlayer;
    private minPlayers: number;
    private maxPlayers: number;
    private lastPlayer: GamePlayer;
    private numPlayers: number;
    private playerMap: PlayerMap;

    // track how many times a player has passed in a round
    private passes: number = 0;

    constructor() {
        this.playerMap = {};
    }

    public hasPlayers(min: number, max: number) {
        this.minPlayers = min;
        this.maxPlayers = max;
    }

    public addPlayer(p: GamePlayer): boolean {
        if (this.numPlayers > this.maxPlayers) {
            return false;
        }

        return this.addToPlayerMap(p);
    }

    public getNumPlayers(): number {
        return this.numPlayers;
    }

    public getCurrentPlayer(): GamePlayer {
        return this.currentPlayer;
    }

    public getPlayers(): GamePlayer[] {
        let players: GamePlayer[] = [];
        for (let entry in this.playerMap) {
            players.push(this.playerMap[entry].player);
        }
        return players;
    }

    // call every turn
    public advanceCurrentPlayer(): boolean {
        this.currentPlayer = this.playerMap[this.currentPlayer.name].next;
        if (this.currentPlayer.canTakeMove()) {
            return true;
        }
        while (this.passes < this.numPlayers && this.currentPlayer.canTakeMove()) {
            this.currentPlayer = this.playerMap[this.currentPlayer.name].next;
            this.passes++;
        }
        if (this.currentPlayer.canTakeMove()) {
            this.passes = 0;
            return true;
        }
        else {
            // everyone passed
            return false;
        }
    }

    public setStartPlayer(p: GamePlayer): void {
        this.startPlayer = p;
    }

    // call every round
    public onNewRound(): void {
        this.currentPlayer = this.startPlayer;
        this.passes = 0;
        let players = this.getPlayers();
        players.forEach(p => {
            p.onTurnStart();
        });
    }

    private addToPlayerMap(p: GamePlayer): boolean {
        if (this.playerMap[p.name]) {
            // player with this name already exists
            return false;
        }

        if (!this.currentPlayer) {
            // this is the first player we're adding
            this.currentPlayer = p;
            this.lastPlayer = p;
            // make them the default start player
            this.startPlayer = p;
        }
        else {
            this.playerMap[this.lastPlayer.name].next = p;
            this.lastPlayer = p;
        }

        let entry: PlayerMapEntry = {
            player: p,
            next: this.currentPlayer
        };

        this.playerMap[p.name] = entry;
        this.numPlayers++;
        return true;
    }
}