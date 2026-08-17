# Anweisungen für Claude: Kommandozentrale einrichten

Du hilfst einem Community-Mitglied, aus dieser Vorlage sein persönliches Portfolio-Dashboard zu bauen. Die Person ist **Solopreneur:in ohne Programmierkenntnisse** — erkläre in einfachem Deutsch, ohne Fachjargon, und führe Schritt für Schritt.

## Dein Vorgehen bei der Ersteinrichtung

1. **Lies zuerst [BAUPLAN.md](BAUPLAN.md)** — dort steht, wie das System aufgebaut ist.
2. **Starte den Demo-Modus**, damit die Person sofort etwas sieht:
   `node starter/server.mjs` → http://localhost:4400
3. **Frage die Person, welche Projekte sie hat** (Webseiten, Apps, Shops — alles mit einer Domain). Lege dann `starter/config.mjs` an: Kopie von `starter/config.beispiel.mjs`, Demo-Einträge durch die echten Projekte ersetzen.
4. **Frage, welche Werkzeuge sie nutzt** — gehe die Tabelle im README durch: Umami? Google Search Console? Stripe? YouTube? Lokale Projekt-Ordner mit Git?
5. **Richte die Quellen einzeln ein**, eine nach der anderen, in dieser Reihenfolge (von leicht nach schwer):
   1. Uptime — funktioniert sofort, sobald `config.mjs` existiert
   2. Git — nur lokale Ordner-Pfade eintragen
   3. YouTube — ein kostenloser API-Schlüssel
   4. Umami — API-Schlüssel oder Login-Daten
   5. Stripe — eingeschränkter Lese-Schlüssel
   6. Google Search Console — OAuth, der aufwendigste Schritt, zum Schluss
   Für jede Quelle gibt es eine Anleitung in `datenquellen/` — folge ihr genau und begleite die Person durch die Klick-Schritte im jeweiligen Werkzeug.
6. **Nach jeder Quelle: Server neu starten und gemeinsam prüfen**, ob die Zahlen erscheinen. Erst dann zur nächsten Quelle.

## Regeln (nicht verhandelbar)

- **Schlüssel gehören ausschließlich in `starter/.env`** (Vorlage: `starter/.env.beispiel`). Niemals in Code, Konfiguration oder Chat-Zusammenfassungen schreiben.
- **`.env` und `config.mjs` niemals committen** — beide stehen in der `.gitignore`. Lass sie dort.
- **Empfiehl Nur-Lesen-Schlüssel**, wo der Dienst das anbietet (Stripe: eingeschränkter Schlüssel; Google: nur `webmasters.readonly`).
- **Keine zusätzlichen npm-Pakete installieren.** Der Starter läuft bewusst ohne Abhängigkeiten — das bleibt so.
- Bittet die Person dich, ihre Schlüssel für sie in einem Web-Interface anzulegen: Leite sie an, aber die Klicks in Konto-Einstellungen macht sie selbst.

## Das Dashboard erweitern

Neue Datenquelle anbinden (z. B. Newsletter-Tool, Podcast-Statistik):

1. Neues Modul in `starter/quellen/` anlegen — Muster: jedes Modul exportiert
   `konfiguriert()` (prüft, ob die nötigen .env-Variablen da sind) und
   `sammle(properties)` (holt die Daten und gibt ein einfaches Objekt zurück).
   Schau dir `starter/quellen/youtube.mjs` als kleinstes Beispiel an.
2. Modul in `starter/server.mjs` in die `QUELLEN`-Liste eintragen.
3. Anzeige in `starter/public/index.html` ergänzen — dort ist pro Bereich markiert, wo neue Kacheln oder Zeilen hingehören.
4. Neue .env-Variablen in `starter/.env.beispiel` dokumentieren (ohne echte Werte!).

Optische Anpassungen (Farben, Reihenfolge, eigene Kacheln) sind ausdrücklich erwünscht — alles liegt in `starter/public/index.html`, einer einzigen Datei.

## Automatisch aktualisieren (optional, später)

Wenn die Person das möchte, richte einen Zeitplan ein, der die Daten regelmäßig neu lädt — der Server cacht 15 Minuten, ein simpler `launchd`-Job (macOS) oder Task-Scheduler-Eintrag (Windows), der die Seite abruft, genügt. Biete das erst an, wenn die Grundeinrichtung läuft.
