// Einmalige Google-Anmeldung für die Search Console.
// Voraussetzung: GOOGLE_CLIENT_ID und GOOGLE_CLIENT_SECRET stehen in starter/.env
// (Anleitung: datenquellen/google-search-console.md).
// Aufruf: node starter/werkzeuge/google-login.mjs
// Ergebnis: dein GOOGLE_REFRESH_TOKEN zum Eintragen in starter/.env

import http from "node:http";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";

const HIER = path.dirname(fileURLToPath(import.meta.url));
const envPfad = path.join(HIER, "..", ".env");
if (existsSync(envPfad)) {
  for (const zeile of readFileSync(envPfad, "utf8").split("\n")) {
    const m = zeile.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && m[2] && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const { GOOGLE_CLIENT_ID: ID, GOOGLE_CLIENT_SECRET: SECRET } = process.env;
if (!ID || !SECRET) {
  console.error("Bitte zuerst GOOGLE_CLIENT_ID und GOOGLE_CLIENT_SECRET in starter/.env eintragen — siehe datenquellen/google-search-console.md");
  process.exit(1);
}

const REDIRECT = "http://localhost:8765";
const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: ID,
    redirect_uri: REDIRECT,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    access_type: "offline",
    prompt: "consent",
  });

const server = http.createServer(async (req, res) => {
  const code = new URL(req.url, REDIRECT).searchParams.get("code");
  if (!code) { res.writeHead(404); return res.end(); }

  const antwort = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({ code, client_id: ID, client_secret: SECRET, redirect_uri: REDIRECT, grant_type: "authorization_code" }),
  }).then((r) => r.json());

  if (antwort.refresh_token) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h2>Geschafft ✓</h2><p>Zurück ins Terminal — dort steht dein Refresh-Token.</p>");
    console.log("\nDeine Anmeldung war erfolgreich. Trage diese Zeile in starter/.env ein:\n");
    console.log(`GOOGLE_REFRESH_TOKEN=${antwort.refresh_token}\n`);
  } else {
    res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h2>Das hat nicht geklappt</h2><p>Details im Terminal.</p>");
    console.error("\nGoogle hat kein Refresh-Token geliefert:", antwort.error_description || antwort.error || antwort);
  }
  server.close();
  process.exit(antwort.refresh_token ? 0 : 1);
});

server.listen(8765, () => {
  console.log("Dein Browser öffnet sich gleich für die Google-Anmeldung.");
  console.log("Falls nicht, öffne diese Adresse von Hand:\n\n" + authUrl + "\n");
  if (process.platform === "darwin") execFile("open", [authUrl]);
  else if (process.platform === "win32") execFile("cmd", ["/c", "start", "", authUrl]);
  else execFile("xdg-open", [authUrl]);
});
