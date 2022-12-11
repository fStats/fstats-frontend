export class PieData {
    private readonly _name: string;
    private readonly _y: number;

    get name(): string {
        return this._name;
    }

    get y(): number {
        return this._y;
    }

    constructor(name: string, y: number) {
        this._name = name;
        this._y = y;
    }
}