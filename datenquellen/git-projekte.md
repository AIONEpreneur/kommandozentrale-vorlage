# Git — Stand deiner Projekt-Ordner

**Was es zeigt:** Pro Projekt den letzten Commit (was wurde zuletzt geändert, und wann?) und ob es unversionierte Änderungen gibt — praktisch, wenn du wie viele in der Community deine Projekte mit Claude Code baust und alles in Git liegt.

## Was du brauchst

Nur die **Pfade zu deinen lokalen Projekt-Ordnern**. Kein GitHub-Konto, kein Token — gelesen wird ausschließlich lokal auf deinem Rechner. In `starter/config.mjs` pro Projekt den Pfad eintragen:

```js
{ id: "meinprojekt", name: "Mein Projekt", domain: "meinprojekt.de",
  repo: "/Users/dein-name/Projekte/meinprojekt" },
```

Projekte ohne `repo` (oder ohne Git im Ordner) zeigen die Zeile einfach nicht an.

## Gut zu wissen

- „3 offene Änderungen" heißt: Es gibt Dateien, die noch nicht committet sind. Als Erinnerung gedacht — nicht als Vorwurf.
- Voraussetzung ist, dass `git` installiert ist. Auf dem Mac ist es das automatisch, sobald du je Claude Code oder Xcode-Tools benutzt hast (`git --version` prüft es).

## API oder MCP?

Weder noch — Git liegt als Werkzeug auf deinem Rechner, das Modul ruft es direkt auf. Wenn du zusätzlich Dinge von **GitHub** sehen willst (offene Issues, Pull Requests), ist das ein Fall für den offiziellen GitHub-MCP-Server im Gespräch mit Claude — fürs Dashboard reicht der lokale Stand.
