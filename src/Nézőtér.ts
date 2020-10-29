export default class Nézőtér {
    private _foglaltság: string = "";
    private _kategória: number = 0;
    constructor(foglaltsag: string, kategoria: string) {
        this._foglaltság = foglaltsag;
        this._kategória = parseInt(kategoria);
    }
    public get szabadE(): boolean {
        return this._foglaltság == "o";
    }

    public get kategória(): number {
        return this._kategória;
    }
}
