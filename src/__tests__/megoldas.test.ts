import Megoldás from "../Megoldás";
import Nézőtér from "../Nézőtér";

describe("Megoldás osztály unit tesztek", () => {
    const megoldas: Megoldás = new Megoldás("foglaltsag.txt", "kategoria.txt");
    const nezoter: Nézőtér = new Nézőtér("o", "1");

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(megoldas).toBeInstanceOf(Megoldás);
    });

    it("Nézőtér osztálypéldány ellenőrzése", async () => {
        expect(nezoter).toBeInstanceOf(Nézőtér);
    });

    it("Eladott jegyek ellenőrzése", async () => {
        expect(megoldas.eladottJegyek).toBe(187);
    });

    it("Eladott jegyek százalékának ellenőrzése", async () => {
        expect(megoldas.eladottJegyekSzázalék).toBe(62);
    });

    it("Legtöbbet eladott árkategória ellenőrzése", async () => {
        expect(megoldas.legtöbbetEladottÁrkategória).toBe(2);
    });

    it("Pillanatnyi bevétel ellenőrzése", async () => {
        expect(megoldas.bevétel).toBe(593500);
    });

    it("Egyedülálló üres helyek ellenőrzése", async () => {
        expect(megoldas.egyedülállóÜresHelyek).toBe(35);
    });

    it("Adott hely ürességének ellenőrzése", async () => {
        expect(nezoter.szabadE).toBe(true);
    });

    it("Adott hely árkategóriájának ellenőrzése", async () => {
        expect(nezoter.kategória).toBe(1);
    });
});
