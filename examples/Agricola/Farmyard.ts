import { FarmyardSpace, Field, FieldType, Room } from "./FarmyardSpace";

/*
    Think of farmyard as a 15 length array of spaces
    [0 , 1, 2, 3, 4,
    5*, 6, 7, 8, 9,
    10*, 11, 12, 13, 14]
    *starting with wood room here
*/

export class Farmyard {
    NUM_BORDERS = 34;
    spaces: FarmyardSpace[];
    borders: boolean[];
    
    private stables: number;
    private MAX_STABLES = 4;
    private fences: number;
    private MAX_FENCES = 15;

    constructor() {
        this.initializeSpaces();
        this.initializeBorders();
        this.stables = 0;
        this.fences = 0;
    }

    public plow(space: number): boolean {
        let spaceToPlow = this.spaces[space];
        if (spaceToPlow.filled) {
            return false;
        }
        spaceToPlow.field = new Field(FieldType.Empty, 0);
        spaceToPlow.filled = true;
        return true;
    }

    public addStable(space: number): boolean {
        let spaceToStable = this.spaces[space];
        if (spaceToStable.room || spaceToStable.field) {
            return false;
        }
        spaceToStable.stables += 1;
        spaceToStable.filled = true;
        return true;
    }

    public addRoom(space: number, roomType: Room): boolean {
        let spaceToRoom = this.spaces[space];
        if (spaceToRoom.filled) {
            return false;
        }
        spaceToRoom.room = roomType;
        spaceToRoom.filled = true;
        return true;
    }

    // there are 34 unique possible borders. presence of a fence is represented by true, empty border by false
    private initializeBorders() {
        for (let i = 0; i < this.NUM_BORDERS; i++) {
            this.borders.push(false);
        }
    }

    private initializeSpaces() {
        for (let i = 0; i < 15; i++) {
            if (this.isStartingHouseSpace(i)) {
                this.spaces[i] = new FarmyardSpace(Room.Wood);
            }
            else {
                this.spaces[i] = new FarmyardSpace();
            }
        }
    }

    private isStartingHouseSpace(index: number) {
        return index === 5 || index === 10;
    }
}