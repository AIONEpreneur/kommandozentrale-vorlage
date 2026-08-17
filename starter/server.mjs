// Kommandozentrale — Starter-Server.
// Start: node starter/server.mjs  →  http://localhost:4400
// Ohne config.mjs läuft der Demo-Modus mit Beispieldaten.

import http from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HIER = path.dirname(fileURLToPath(import.meta.url));

// .env laden (bewusst ohne npm-Paket)
const envPfad = path.join(HIER, ".env");
if (existsSync(envPfad)) {
  for (const zeile of readFileSync(envPfad, "utf8").split("\n")) {
    const m = zeile.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && m[2] && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

// Konfiguration: config.mjs des Mitglieds, sonst Beispiel → Demo-Modus
const DEMO = !existsSync(path.join(HIER, "config.mjs"));
const { PROPERTIES, PORT = 4400 } = await import(DEMO ? "./config.beispiel.mjs" : "./config.mjs");

import * as uptime from "./quellen/uptime.mjs";
import * as git from "./quellen/git.mjs";
import * as umami from "./quellen/umami.mjs";
import * as ga4 from "./quellen/ga4.mjs";
import * as gsc from "./quellen/gsc.mjs";
import * as stripe from "./quellen/stripe.mjs";
import * as youtube from "./quellen/youtube.mjs";
import { demoDaten } from "./quellen/demo.mjs";

// Quellen-Register: propertyweise Quellen füllen je Projekt eine Zeile,
// globale Quellen füllen eine Kachel oben. Neue Quelle: hier eintragen.
// Besucherzahlen kommen aus ga4 ODER umami — je Projekt, je nachdem was konfiguriert ist.
const PRO_PROPERTY = { uptime, git, umami, ga4, gsc };
const GLOBAL = { stripe, youtube };

const CACHE_MS = 15 * 60 * 1000;
let cache = null;
let cacheZeit = 0;

async function sammleAlles() {
  if (DEMO) return demoDaten(PROPERTIES);

  const snapshot = {
    stand: new Date().toISOString(),
    demo: false,
    quellen: {},
    fehler: {},
    properties: PROPERTIES.map((p) => ({ id: p.id, name: p.name, domain: p.domain, accent: p.accent || "#7c5cff" })),
    global: {},
  };

  const aufgaben = [];
  for (const [name, modul] of Object.entries(PRO_PROPERTY)) {
    snapshot.quellen[name] = modul.konfiguriert(PROPERTIES);
    if (!snapshot.quellen[name]) continue;
    aufgaben.push(
      modul.sammle(PROPERTIES).then(
        (proId) => snapshot.properties.forEach((e) => (e[name] = proId[e.id] ?? null)),
        (err) => (snapshot.fehler[name] = err.message)
      )
    );
  }
  for (const [name, modul] of Object.entries(GLOBAL)) {
    snapshot.quellen[name] = modul.konfiguriert(PROPERTIES);
    if (!snapshot.quellen[name]) continue;
    aufgaben.push(
      modul.sammle().then(
        (daten) => (snapshot.global[name] = daten),
        (err) => (snapshot.fehler[name] = err.message)
      )
    );
  }
  await Promise.all(aufgaben);
  return snapshot;
}

const TYPEN = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon" };

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (url.pathname === "/api/daten") {
    if (!cache || Date.now() - cacheZeit > CACHE_MS || url.searchParams.has("frisch")) {
      cache = await sammleAlles();
      cacheZeit = Date.now();
    }
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    return res.end(JSON.stringify(cache));
  }

  // statische Dateien aus public/ (Pfad gegen Ausbruch abgesichert)
  const datei = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
  const voll = path.join(HIER, "public", path.normalize(datei));
  if (!voll.startsWith(path.join(HIER, "public"))) { res.writeHead(403); return res.end(); }
  try {
    const inhalt = await readFile(voll);
    res.writeHead(200, { "Content-Type": (TYPEN[path.extname(voll)] || "application/octet-stream") + "; charset=utf-8" });
    res.end(inhalt);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Nicht gefunden");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Kommandozentrale läuft: http://localhost:${PORT}${DEMO ? "  (Demo-Modus — lege starter/config.mjs an, um deine Projekte zu zeigen)" : ""}`);
});
