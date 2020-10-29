import Nézőtér from "./Nézőtér";
import fs from "fs";
import { resolve } from "path";

export default class Megoldás {
    private _kategóriaHelper: string[] = [];
    private _nézőtér: Nézőtér[] = [];

    constructor(foglaltsag: string, kategoria: string) {
        fs.readFileSync(kategoria)
            .toString()
            .split("\n")
            .forEach(i => {
                i.trim()
                    .split("")
                    .forEach(j => {
                        this._kategóriaHelper.push(j);
                    });
            });
        let counter: number = 0;
        fs.readFileSync(foglaltsag)
            .toString()
            .split("\n")
            .forEach(i => {
                i.trim()
                    .split("")
                    .forEach(j => {
                        this._nézőtér.push(new Nézőtér(j, this._kategóriaHelper[counter]));
                        counter++;
                    });
            });
    }

    public szabadE(megadott: string): boolean {
        let splitted: string[] = megadott.split(",");
        const sor: number = parseInt(splitted[0]);
        const szék: number = parseInt(splitted[1]);
        return this._nézőtér[(sor - 1) * 20 + szék - 1].szabadE;
    }

    public get eladottJegyek(): number {
        let counter: number = 0;
        this._nézőtér.forEach(i => {
            if (i.szabadE == false) {
                counter++;
            }
        });
        return counter;
    }

    public get eladottJegyekSzázalék(): number {
        let counter: number = 0;
        this._nézőtér.forEach(i => {
            if (i.szabadE == false) {
                counter++;
            }
        });
        return Math.round((counter / this._nézőtér.length) * 100);
    }

    public get legtöbbetEladottÁrkategória(): number {
        let counter: number[] = [0, 0, 0, 0, 0];
        for (let i = 0; i < this._nézőtér.length; i++) {
            if (this._nézőtér[i].szabadE == false) {
                counter[this._nézőtér[i].kategória - 1]++;
            }
        }
        return counter.indexOf(Math.max(...counter)) + 1;
    }

    public get bevétel(): number {
        let counter: number[] = [0, 0, 0, 0, 0];
        for (let i = 0; i < this._nézőtér.length; i++) {
            if (this._nézőtér[i].szabadE == false) {
                counter[this._nézőtér[i].kategória - 1]++;
            }
        }
        return counter[0] * 5000 + counter[1] * 4000 + counter[2] * 3000 + counter[3] * 2000 + counter[4] * 1500;
    }

    public get egyedülállóÜresHelyek(): number {
        let counter: number = 0;
        for (let i = 0; i < this._nézőtér.length; i++) {
            if (i % 20 == 0) {
                if (this._nézőtér[i].szabadE == true && this._nézőtér[i + 1].szabadE == false) {
                    counter++;
                }
            } else if (i.toString()[i.toString().length - 1] == "9") {
                if (this._nézőtér[i].szabadE == true && this._nézőtér[i - 1].szabadE == false) {
                    counter++;
                }
            } else {
                if (this._nézőtér[i].szabadE == true && this._nézőtér[i - 1].szabadE == false && this._nézőtér[i + 1].szabadE == false) {
                    counter++;
                }
            }
        }
        return counter;
    }

    public fájlbaÍr(fájlnév: string) {
        let szabad: string = "";
        let counter: number = 0;
        for (let i = 0; i < this._nézőtér.length; i++) {
            if (this._nézőtér[i].szabadE == false) {
                szabad += "x";
            } else {
                szabad += this._nézőtér[i].kategória.toString();
            }
            counter++;
            if (counter == 20) {
                szabad += "\n";
                counter = 0;
            }
        }
        fs.writeFileSync(fájlnév, szabad);
    }

    public ki(fájlnév: string): string[] {
        let counter: number = 0;
        let _ki: string[] = [];
        fs.readFileSync(fájlnév)
            .toString()
            .split("\n")
            .forEach(i => {
                i.trim()
                    .split("")
                    .forEach(j => {
                        _ki.push(j);
                        counter++;
                        if (counter == 20) {
                            _ki.push("\n");
                            counter = 0;
                        }
                    });
            });
        return _ki;
    }
}
