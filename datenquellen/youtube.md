# YouTube — Abonnenten & Aufrufe

**Was es zeigt:** Abonnenten, Gesamtaufrufe und Video-Anzahl deines Kanals — als Kachel oben im Dashboard.

## Was du brauchst

Einen **kostenlosen YouTube-API-Schlüssel**. Der ist deutlich einfacher zu bekommen als der Search-Console-Zugang, weil öffentliche Kanal-Statistiken keinen OAuth brauchen:

1. [console.cloud.google.com](https://console.cloud.google.com) öffnen (dasselbe Projekt wie bei der Search Console ist okay)
2. **APIs & Dienste → Bibliothek** → **„YouTube Data API v3"** suchen → **Aktivieren**
3. **APIs & Dienste → Anmeldedaten → Anmeldedaten erstellen → API-Schlüssel**
4. Empfohlen: Schlüssel bearbeiten → **API-Einschränkungen** → nur „YouTube Data API v3" zulassen
5. In `starter/.env` eintragen — zusammen mit deinem Kanal-Handle (das `@dein-name` aus deiner Kanal-URL):

```
YT_API_KEY=AIzaxxxxxxxxxxxx
YT_KANAL=@dein-kanalname
```

## API oder MCP?

Fürs Dashboard: **API**. Für tiefere Fragen („Welches meiner Videos hält die Zuschauer am längsten?") brauchst du YouTube **Analytics** (nicht nur die öffentlichen Zahlen) — das ist wieder OAuth-Gebiet und ein gutes späteres Ausbauprojekt mit Claude.

**Kosten:** kostenlos. Das Tageskontingent der API ist für eine Abfrage alle 15 Minuten mehr als reichlich.
