# Google Search Console — Klicks & Impressionen

**Was es zeigt:** Google-Klicks und -Impressionen der letzten 28 Tage, pro Projekt. Die wichtigste Zahl für die Frage: „Findet Google mich?"

**Voraussetzung:** Deine Domains sind in der [Search Console](https://search.google.com/search-console) angemeldet und bestätigt. Falls noch nicht — das zuerst erledigen (Claude kann dich da durchführen), dann hierher zurückkommen.

⚠️ **Das ist die aufwendigste Einrichtung** in dieser Vorlage, weil Google statt eines einfachen API-Schlüssels ein OAuth-Verfahren verlangt. Einmal durchgebissen, läuft es dauerhaft. Nimm dir 20–30 Minuten und lass dich von Claude begleiten.

## Schritt 1: Google-Cloud-Projekt mit OAuth-Zugang

1. [console.cloud.google.com](https://console.cloud.google.com) öffnen → oben **Projekt erstellen** (Name egal, z. B. „Kommandozentrale")
2. Menü → **APIs & Dienste → Bibliothek** → nach **„Google Search Console API"** suchen → **Aktivieren**
3. **APIs & Dienste → OAuth-Zustimmungsbildschirm**: Extern wählen, App-Name und deine E-Mail eintragen, speichern. Unter **Zielgruppe/Testnutzer** deine eigene Google-Adresse als Testnutzerin hinzufügen.
4. **APIs & Dienste → Anmeldedaten → Anmeldedaten erstellen → OAuth-Client-ID**:
   - Anwendungstyp: **Webanwendung**
   - Autorisierte Weiterleitungs-URI: `http://localhost:8765`
5. Die angezeigte **Client-ID** und das **Client-Secret** in `starter/.env` eintragen:

```
GOOGLE_CLIENT_ID=1234-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxx
```

## Schritt 2: Einmalig anmelden

Im Terminal:

```bash
node starter/werkzeuge/google-login.mjs
```

Das öffnet deinen Browser, du meldest dich mit deinem Google-Konto an und erlaubst den **Nur-Lesen-Zugriff auf die Search Console**. Das Skript zeigt dir danach dein `GOOGLE_REFRESH_TOKEN` — auch das in `starter/.env` eintragen. Fertig: Dieses Token bleibt gültig, du musst dich nicht erneut anmelden.

## Schritt 3: Adressen in der Konfiguration

Pro Projekt in `starter/config.mjs` die Search-Console-Adresse eintragen — **genau so, wie sie in der Search Console steht** (Domain-Property: `sc-domain:meinprojekt.de`, URL-Property: `https://meinprojekt.de/`):

```js
{ id: "meinprojekt", name: "Mein Projekt", domain: "meinprojekt.de",
  gsc: "sc-domain:meinprojekt.de" },
```

## API oder MCP?

Fürs Dashboard: **API**, wie oben. Für Analyse-Gespräche mit Claude („Welche Suchbegriffe bringen mir Klicks?") gibt es Search-Console-MCP-Server von Drittanbietern — praktisch, aber prüfe vor der Installation, wem du da Zugriff gibst. Sicherer Einstieg: Claude kann mit denselben `.env`-Zugängen die API auch direkt im Gespräch befragen.

**Kosten:** komplett kostenlos.

**Hinweis:** Google liefert Search-Console-Daten mit 2–3 Tagen Verzögerung — das Dashboard rechnet das automatisch ein.
