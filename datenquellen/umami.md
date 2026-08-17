# Umami — Besucher & Seitenaufrufe

**Was es zeigt:** Besucher und Seitenaufrufe der letzten 7 und 30 Tage, pro Projekt.

**Was Umami ist:** Ein datenschutzfreundliches Web-Analytics-Werkzeug (Alternative zu Google Analytics, ohne Cookies). Falls du noch kein Analytics hast: [Umami Cloud](https://umami.is) hat einen kostenlosen Tarif und ist in 10 Minuten eingerichtet — Website anlegen, Tracking-Schnipsel in deine Seite einbauen, fertig.

## Was du brauchst

**Variante A — Umami Cloud** (umami.is, empfohlen für Einsteiger:innen):

1. Einloggen auf [cloud.umami.is](https://cloud.umami.is)
2. Oben rechts auf dein Profil → **Account** → **API keys** → **Create key**
3. Den Schlüssel in `starter/.env` eintragen:

```
UMAMI_API_KEY=api_xxxxxxxxxxxx
```

**Variante B — selbst gehostetes Umami** (auf deinem eigenen Server):

```
UMAMI_URL=https://stats.deine-domain.de
UMAMI_BENUTZER=admin
UMAMI_PASSWORT=dein-passwort
```

Das Modul meldet sich damit an und holt sich selbst ein Zugriffs-Token.

## Website-IDs eintragen

Jedes deiner Projekte hat in Umami eine **Website-ID**. Du findest sie in Umami unter **Settings → Websites → Edit → Details** (eine lange Zeichenkette wie `1c3a-…`). Trage sie pro Projekt in `starter/config.mjs` ein:

```js
{ id: "meinprojekt", name: "Mein Projekt", domain: "meinprojekt.de",
  umamiId: "1c3a5b7d-...." },
```

Projekte ohne `umamiId` werden einfach ohne Besucherzahlen angezeigt.

## API oder MCP?

Fürs Dashboard: **API** (siehe oben). Einen offiziellen Umami-MCP-Server gibt es derzeit nicht — wenn du mit Claude über deine Zahlen reden willst, kann Claude die gleiche API direkt befragen; die Zugangsdaten hat es ja über `.env` (frag Claude einfach: „Schau in mein Umami und sag mir, welche Seite diese Woche am stärksten gewachsen ist").

**Kosten:** Umami Cloud Free reicht für die meisten Solopreneur-Portfolios (bis 100k Events/Monat). Die API selbst kostet nichts extra.
