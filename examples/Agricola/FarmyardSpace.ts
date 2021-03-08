export enum Room {
    Wood,
    Clay,
    Stone
};

export enum FieldType {
    Empty,
    Grain,
    Vegetable
};

export class Field {
    constructor(type: FieldType, number: number) {
        this.type = type;
        this.number = number;
    }

    type: FieldType;
    number: number;
}

export class FarmyardSpace {
    constructor(room?: Room) {
        this.filled = false;
        this.stables = 0;
        this.room = room ? room : null;
        this.field = null;
        this.sheep = 0;
        this.boar = 0;
        this.cattle = 0;
    }

    filled: boolean;
    stables: number;
    room: Room;
    field: Field;
    sheep: number; 
    boar: number;
    cattle: number;
}