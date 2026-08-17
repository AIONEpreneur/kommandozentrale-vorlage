# Uptime — Ist deine Seite erreichbar?

**Was es zeigt:** Pro Projekt einen grünen oder roten Punkt (Seite antwortet / antwortet nicht) plus die Antwortzeit in Millisekunden.

## Was du brauchst

**Nichts.** Kein Konto, kein Schlüssel. Das Modul ruft einfach `https://deine-domain.de` auf und misst, ob und wie schnell eine Antwort kommt. Es funktioniert automatisch für jedes Projekt in `starter/config.mjs`, das eine `domain` eingetragen hat:

```js
{ id: "meinprojekt", name: "Mein Projekt", domain: "meinprojekt.de" },
```

## Gut zu wissen

- Der Check läuft von **deinem Rechner** aus. Wenn dein WLAN hakt, zeigt er rot, obwohl die Seite für den Rest der Welt läuft. Für ernsthafte Überwachung mit Benachrichtigung (SMS/Mail, wenn die Seite ausfällt) nimm zusätzlich einen Dienst wie [UptimeRobot](https://uptimerobot.com) — der kostenlose Tarif reicht.
- Antwortzeiten unter ~500 ms sind gut, unter ~200 ms sehr gut. Dauerhaft mehrere Sekunden? Dann lohnt ein Gespräch mit Claude über dein Hosting.

## API oder MCP?

Weder noch — das ist ein simpler Aufruf deiner eigenen Webseite, so wie ihn jeder Browser macht. Nicht jede Datenquelle braucht einen Schlüssel.
