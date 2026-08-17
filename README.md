# Kommandozentrale — Bauplan für dein eigenes Portfolio-Dashboard

Ein Dashboard, das dir **alle deine Projekte auf einen Blick** zeigt: Besucherzahlen, Google-Sichtbarkeit, Umsatz, Erreichbarkeit deiner Webseiten und den Stand deiner Projekt-Ordner. Es läuft lokal auf deinem Rechner — deine Daten und Schlüssel bleiben bei dir.

Dieses Repo ist **kein fertiges Produkt, sondern ein Bauplan für Claude**: Du gibst es Claude Code, Claude liest die Anleitung, fragt dich, welche Werkzeuge du nutzt (Umami? Stripe? YouTube?), und richtet dir Schritt für Schritt dein persönliches Dashboard ein.

![Beispiel](https://raw.githubusercontent.com/AIONEpreneur/kommandozentrale-vorlage/main/starter/public/vorschau.png)

## Schnellstart — direkt in Claude Code, kein Terminal nötig

**1. Claude Code öffnen** (die App auf deinem Rechner).

**2. Diesen Auftrag einfügen:**

> Hole dir das Repo https://github.com/AIONEpreneur/kommandozentrale-vorlage, lege es in meinem Projekte-Ordner ab, lies dort die CLAUDE.md und richte meine Kommandozentrale ein.

**3. Claude erledigt den Rest:** Es holt das Repo, startet das Dashboard sofort mit Beispieldaten (http://localhost:4400 — Claude öffnet es dir), fragt dich nach deinen Projekten und Werkzeugen und verbindet dann eine Datenquelle nach der anderen. Du tippst **keinen einzigen Befehl** selbst — du beantwortest nur Claudes Fragen und machst die Klicks in deinen eigenen Konten (Zugänge gibt man nicht aus der Hand, auch Claude nicht).

Du brauchst **keine Programmierkenntnisse**. Falls Node.js (kostenlos) noch fehlt, sagt Claude dir das und hilft bei der Installation.

<details>
<summary>Du arbeitest doch lieber selbst im Terminal? (optional)</summary>

```bash
git clone https://github.com/AIONEpreneur/kommandozentrale-vorlage.git
cd kommandozentrale-vorlage
node starter/server.mjs
```

Dann http://localhost:4400 öffnen. Benötigt Node.js ab Version 18.
</details>

## Was das Dashboard anzeigt

| Bereich | Quelle | Was du brauchst |
|---|---|---|
| Besucher & Seitenaufrufe | [Google Analytics](datenquellen/google-analytics.md) oder [Umami](datenquellen/umami.md) | GA4 auf deiner Seite (haben die meisten) — oder ein Umami-Konto |
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
