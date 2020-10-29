import { ENGINE_METHOD_RAND } from "constants";
import fs from "fs";
import http from "http";
import url from "url";
import Megoldás from "./Megoldás";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Nézőtér</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        // 1. feladat
        const megoldás: Megoldás = new Megoldás("foglaltsag.txt", "kategoria.txt");

        // 2. feladat
        res.write("2. feladat: Adjon meg egy sorszámot és egy székszámot (sor,szék):");
        res.write('<input type="text" placeholder="pl.:5,7" maxlength="5" name="sorSzék"/>\n');
        let megadott: string = params.sorSzék as string;
        if (megadott) {
            res.write(`A megadott szék ${megoldás.szabadE(megadott) ? "szabad (o)" : "foglalt (x)"}\n\n`);
        } else {
            res.write("Nincs kiválasztva szék.\n\n");
        }

        // 3. feladat
        res.write(`3. feladat: Az előadásra eddig ${megoldás.eladottJegyek} jegyet adtak el, ez a nézőtér ${megoldás.eladottJegyekSzázalék}%-a.\n\n`);

        // 4. feladat
        res.write(`4. feladat: A legtöbb jegyet a(z) ${megoldás.legtöbbetEladottÁrkategória}. árkategóriában értékesítették.\n\n`);

        // 5. feladat
        res.write(`5. feladat: A színház pillanatnyi bevétele: ${megoldás.bevétel}Ft.\n\n`);

        // 6. feladat
        res.write(`6. feladat: Az egyedülálló üres helyek száma: ${megoldás.egyedülállóÜresHelyek}\n\n`);

        // 7. feladat
        megoldás.fájlbaÍr("szabad.txt");
        res.write("7. feladat: szabad.txt\n\n");
        let ki = megoldás.ki("szabad.txt");
        ki.forEach(i => {
            res.write(`${i}`);
        });
        res.write("\n\n\n");

        res.write('GitHub repository: <a href="https://github.com/ThisIsJustAGuy/Nezoter">https://github.com/ThisIsJustAGuy/Nezoter</a>\n\n');
        res.write('Heroku link: <a href="https://nezoter-ts.herokuapp.com/">https://nezoter-ts.herokuapp.com/</a>\n\n');
        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
