# Bauplan: So ist die Kommandozentrale aufgebaut

Dieses Dokument erklärt die Architektur — für dich zum Verständnis und für Claude als Grundlage, wenn es dein Dashboard einrichtet oder erweitert.

## Die Idee

Du hast als Solopreneur:in mehrere Projekte: Webseiten, vielleicht eine App, einen Shop, einen YouTube-Kanal. Die Zahlen dazu liegen in fünf verschiedenen Werkzeugen, und du loggst dich nirgends mehr ein. Die Kommandozentrale holt die wichtigsten Zahlen **automatisch** zusammen und zeigt sie auf **einer** Seite.

## Drei Bausteine

```
config.mjs            quellen/*.mjs              public/index.html
(deine Projekte)  →   (holen die Zahlen)     →   (zeigt alles an)
                      umami, gsc, stripe,
                      git, uptime, youtube
```

**1. Die Konfiguration (`starter/config.mjs`)** — eine Liste deiner Projekte („Properties"). Pro Projekt: Name, Domain, optional die Umami-Website-ID, die Search-Console-Adresse und der Pfad zum lokalen Projekt-Ordner. Das ist die einzige Datei, die deine Projektliste kennt.

**2. Die Quellen-Module (`starter/quellen/`)** — pro Datenquelle eine kleine Datei mit zwei Aufgaben:

- `konfiguriert()` — sind die nötigen Schlüssel in `.env` vorhanden? Wenn nein, wird die Quelle einfach übersprungen (kein Fehler, keine leere Kachel).
- `sammle(properties)` — holt die Zahlen per API und gibt sie als einfaches Objekt zurück.

Dieses Muster macht das System erweiterbar: neue Quelle = neue Datei nach demselben Muster.

**3. Der Server (`starter/server.mjs`)** — ruft alle konfigurierten Quellen auf, fasst die Ergebnisse zu einem Schnappschuss zusammen (mit 15 Minuten Zwischenspeicher, damit du keine API-Limits reißt) und liefert die Anzeige-Seite aus. Solange keine `config.mjs` existiert, läuft alles im **Demo-Modus** mit Beispieldaten.

## API oder MCP — was ist hier richtig?

Beides sind Wege, wie Software an deine Daten kommt. Der Unterschied entscheidet, was du wofür nimmst:

**API (hier im Dashboard):** Dein Dashboard fragt die Dienste **direkt und automatisch** ab — im Hintergrund, regelmäßig, ohne dass jemand dabei ist. Dafür sind APIs gemacht: Du hinterlegst einmal einen Schlüssel, danach läuft es von allein. Alles in diesem Repo nutzt deshalb APIs.

**MCP (für Gespräche mit Claude):** MCP-Server verbinden **Claude selbst** mit deinen Werkzeugen — damit du im Gespräch fragen kannst: „Warum ist mein Traffic diese Woche eingebrochen?" oder „Welche meiner Seiten hat die meisten Google-Klicks verloren?" Claude schaut dann live in die Daten und antwortet. Das ist der richtige Weg für **Analyse und Nachfragen**, nicht für ein Dashboard, das still im Hintergrund sammelt.

Faustregel: **Anzeigen ohne dich → API. Verstehen mit Claude → MCP.** Die Anleitungen in `datenquellen/` nennen bei jeder Quelle beide Wege, wo es sie gibt.

## Datenfluss und Sicherheit

```
.env (deine Schlüssel, nur lokal)
  ↓
quellen-Module → fragen APIs ab (nur lesend)
  ↓
Schnappschuss im Arbeitsspeicher (15 Min gültig)
  ↓
http://localhost:4400 (nur auf deinem Rechner erreichbar)
```

- Der Server bindet an `localhost` — niemand außer dir kommt an das Dashboard.
- Es wird nichts irgendwohin hochgeladen. Keine Cloud, keine Telemetrie.
- Alle Zugriffe sind lesend. Das Dashboard verändert nichts in deinen Konten.

## Was bewusst NICHT drin ist

Damit die Vorlage einfach bleibt, fehlt einiges absichtlich: kein Server im Internet (nur lokal), keine Benutzerverwaltung, keine Datenbank (der Schnappschuss lebt im Arbeitsspeicher), keine npm-Abhängigkeiten. Wer später mehr will — z. B. das Dashboard auf einem eigenen Server, Verlaufskurven über Monate — kann das mit Claude ausbauen. Erst laufen lernen, dann rennen.
