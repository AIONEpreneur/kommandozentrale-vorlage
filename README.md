# Kommandozentrale — Bauplan für dein eigenes Portfolio-Dashboard

Ein Dashboard, das dir **alle deine Projekte auf einen Blick** zeigt: Besucherzahlen, Google-Sichtbarkeit, Umsatz, Erreichbarkeit deiner Webseiten und den Stand deiner Projekt-Ordner. Es läuft lokal auf deinem Rechner — deine Daten und Schlüssel bleiben bei dir.

Dieses Repo ist **kein fertiges Produkt, sondern ein Bauplan für Claude**: Du gibst es Claude Code, Claude liest die Anleitung, fragt dich, welche Werkzeuge du nutzt (Umami? Stripe? YouTube?), und richtet dir Schritt für Schritt dein persönliches Dashboard ein.

![Beispiel](https://raw.githubusercontent.com/AIONEpreneur/kommandozentrale-vorlage/main/starter/public/vorschau.png)

## Schnellstart in 3 Schritten

**1. Repo holen** — im Terminal:

```bash
git clone https://github.com/AIONEpreneur/kommandozentrale-vorlage.git
cd kommandozentrale-vorlage
```

**2. Sofort anschauen** (läuft ohne jede Einrichtung, mit Demo-Daten):

```bash
node starter/server.mjs
```

Dann im Browser öffnen: **http://localhost:4400**

**3. Claude übernehmen lassen** — Claude Code im Ordner starten und sagen:

> Lies CLAUDE.md und richte meine Kommandozentrale ein.

Claude fragt dich dann, welche Datenquellen du hast, und verbindet sie eine nach der anderen. Du brauchst dafür **keine Programmierkenntnisse** — nur die Zugänge zu deinen eigenen Werkzeugen.

## Voraussetzungen

- **Node.js** ab Version 18 — prüfen mit `node -v`, sonst von [nodejs.org](https://nodejs.org) installieren
- **Claude Code** ([Anleitung](https://claude.com/claude-code)) — für die Einrichtung und spätere Erweiterungen
- Keine weiteren Abhängigkeiten: kein `npm install`, keine Datenbank

## Was das Dashboard anzeigt

| Bereich | Quelle | Was du brauchst |
|---|---|---|
| Besucher & Seitenaufrufe | [Umami](datenquellen/umami.md) | Umami-Konto (Cloud oder selbst gehostet) |
| Google-Klicks & Impressionen | [Search Console](datenquellen/google-search-console.md) | Google-Konto mit bestätigter Domain |
| Umsatz der letzten 30 Tage | [Stripe](datenquellen/stripe.md) | Stripe-Konto, Lese-Schlüssel |
| Erreichbarkeit deiner Seiten | [Uptime-Check](datenquellen/uptime.md) | nichts — funktioniert sofort |
| Stand deiner Projekt-Ordner | [Git](datenquellen/git-projekte.md) | lokale Projekt-Ordner mit Git |
| Abonnenten & Aufrufe | [YouTube](datenquellen/youtube.md) | kostenloser API-Schlüssel |

Jede Quelle ist **optional**. Du richtest nur ein, was du wirklich nutzt — der Rest wird einfach nicht angezeigt. Weitere Ideen (Newsletter, Notion, Calendly …) findest du in [weitere-quellen.md](datenquellen/weitere-quellen.md).

## Wie es funktioniert

Kurz gesagt: Eine Konfigurationsdatei listet deine Projekte, kleine Module holen die Zahlen per API, eine Seite zeigt alles an. Die Architektur — und die wichtige Frage **„API oder MCP?"** — erklärt [BAUPLAN.md](BAUPLAN.md).

## Sicherheit

- Alle Schlüssel liegen **nur** in der Datei `starter/.env` auf deinem Rechner.
- `.env` und deine persönliche Konfiguration stehen in der `.gitignore` — sie landen **nie** auf GitHub, auch wenn du das Repo forkst und pushst.
- Verwende überall, wo möglich, **Nur-Lesen-Schlüssel** (die Anleitungen zeigen, wie).

## Herkunft

Diese Vorlage ist die Community-Version der Kommandozentrale von [Kirsten Biema](https://www.kirstenbiema.com) — dem Dashboard, mit dem sie ihr eigenes Projekt-Portfolio steuert. Fragen und Erfahrungen: gern in der Community teilen.
