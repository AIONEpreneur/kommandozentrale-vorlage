# Google Analytics — Besucher & Seitenaufrufe

**Was es zeigt:** Besucher der letzten 7 und 30 Tage, Seitenaufrufe und den Tagesverlauf fürs Diagramm — pro Projekt.

**Für wen:** Für alle, die schon Google Analytics (GA4) auf ihrer Webseite haben — das ist bei den meisten Baukästen und WordPress-Setups der Fall. Du hast kein Analytics oder willst bewusst weg von Google? Dann schau in [umami.md](umami.md), die datenschutzfreundliche Alternative. **Eins von beiden reicht** — pro Projekt wird genau eine Besucherquelle angezeigt.

## Was du brauchst

Google Analytics nutzt **dieselbe Google-Anmeldung wie die Search Console** — wenn du die schon eingerichtet hast, fehlen nur zwei Handgriffe. Falls nicht: Claude geht mit dir zuerst Schritt 1 aus [google-search-console.md](google-search-console.md) durch (Google-Cloud-Projekt + OAuth-Zugang), das gilt für beide Quellen gemeinsam.

**1. Data API im Google-Cloud-Projekt aktivieren:**
[console.cloud.google.com](https://console.cloud.google.com) → **APIs & Dienste → Bibliothek** → **„Google Analytics Data API"** suchen → **Aktivieren**

**2. Einmal (neu) anmelden** — diesen Befehl führt Claude für dich aus:

```bash
node starter/werkzeuge/google-login.mjs
```

Dein Browser öffnet sich, du erlaubst den Nur-Lesen-Zugriff. Das angezeigte `GOOGLE_REFRESH_TOKEN` kommt in `starter/.env`. **Wichtig, falls du die Search Console schon vorher eingerichtet hattest:** Die Anmeldung einmal neu machen (alter Login kannte Analytics noch nicht) und das neue Token eintragen — es gilt dann für beide.

**3. Property-ID eintragen:**
In Google Analytics unter **Verwaltung (Zahnrad) → Property → Property-Einstellungen** steht die **Property-ID** (eine Zahl, z. B. `498123456`). Pro Projekt in `starter/config.mjs`:

```js
{ id: "meinprojekt", name: "Mein Projekt", domain: "meinprojekt.de",
  ga4: "498123456" },
```

## API oder MCP?

Fürs Dashboard: **API** (Google Analytics Data API, wie oben). Für Analyse-Gespräche mit Claude („Woher kommen meine Besucher? Welche Seite verliert?") gibt es den offiziellen Google-Analytics-MCP-Server — ein schönes Ausbauprojekt, sobald das Dashboard läuft.

**Kosten:** kostenlos.

**Hinweis zur Zahl:** „Besucher · 30 Tage" summiert die Tageswerte — wer an mehreren Tagen kommt, zählt mehrfach. Für ein Trend-Dashboard genau richtig, nur nicht 1:1 mit dem GA-Bericht „Aktive Nutzer (30 Tage)" vergleichen.
