import { GameContext } from "../../../src/GameContext";
import { MoveResult, MoveResults } from "../../../src/MoveResult";
import { AgricolaPlayer } from "../AgricolaPlayer";
import { Room } from "../FarmyardSpace";
import { AgricolaMove } from "./AgricolaMove";

export class BuildRoomOrStable extends AgricolaMove {
    constructor() {
        super("Build Room Or Stable");
        this.customArgs = 3;
    }

    // args
    // stables: number[] - spaces to build stables
    // rooms: number[] - spaces to build rooms
    // roomType?: Room - type of room
    onMoveTaken(ctx: GameContext, ...args: any[]): MoveResult {
        if (this.moveTaken) {
            return MoveResults.INVALID;
        }
        let currentPlayer = ctx.getCurrentPlayer() as AgricolaPlayer;
        let stables: number[] = args[0];
        let rooms: number[] = args[1];
        let roomType: Room = args[2];
        
        // add stables
        if (stables && stables.length > 0) {
            for (let i = 0; i < stables.length; i++) {
                if (!currentPlayer.farmyard.addStable(stables[i])) {
                    return MoveResults.INVALID;
                }
            }
        }

        // add rooms
        if (rooms && rooms.length > 0 && roomType) {
            for (let i = 0; i < rooms.length; i++) {
                if (!currentPlayer.farmyard.addRoom(rooms[i], roomType)) {
                    return MoveResults.INVALID;
                }
                if (!this.payForRoom(currentPlayer, roomType)) {
                    return MoveResults.INVALID;
                }
            }
        }

        return super.onMoveTaken(ctx);
    }

    private payForRoom(player: AgricolaPlayer, roomType: Room) {
        let result: boolean = false;
        switch (roomType) {
            case Room.Wood:
                result = this.payForWoodRoom(player);
                break;
            case Room.Clay:
                result = this.payForClayRoom(player);
                break;
            case Room.Stone:
                result = this.payForStoneRoom(player);
                break;
        }
        return result;
    }

    private payForWoodRoom(player: AgricolaPlayer): boolean {
        if (player.wood < 5 || player.reed < 2) {
            return false;
        }
        player.wood -= 5;
        player.reed -= 2;
        return true;
    }

    private payForClayRoom(player: AgricolaPlayer): boolean {
        if (player.clay < 5 || player.reed < 2) {
            return false;
        }
        player.clay -= 5;
        player.reed -= 2;
        return true;
    }

    private payForStoneRoom(player: AgricolaPlayer): boolean {
        if (player.stone < 5 || player.reed < 2) {
            return false;
        }
        player.stone -= 5;
        player.reed -= 2;
        return true;
    }
}