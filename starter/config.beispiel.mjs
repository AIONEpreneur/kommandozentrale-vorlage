// Kommandozentrale — Beispiel-Konfiguration.
//
// SO WIRD SIE ZU DEINER: Datei kopieren nach config.mjs (gleicher Ordner)
// und die Demo-Einträge durch deine echten Projekte ersetzen.
// Solange keine config.mjs existiert, läuft das Dashboard im Demo-Modus.
//
// Pro Projekt („Property") gilt: Nur `id`, `name` und `domain` sind Pflicht.
// Alles andere ist optional — was fehlt, wird einfach nicht angezeigt.

export const PORT = 4400;

export const PROPERTIES = [
  {
    id: "beispiel-shop",                    // kurzer eindeutiger Name, klein, ohne Leerzeichen
    name: "Beispiel-Shop",                  // Anzeigename im Dashboard
    domain: "beispiel-shop.de",             // für Uptime-Check und Link
    accent: "#7c5cff",                      // Akzentfarbe der Kachel (beliebiger Hex-Wert)
    umamiId: "",                            // Umami-Website-ID → datenquellen/umami.md
    gsc: "sc-domain:beispiel-shop.de",      // Search-Console-Adresse → datenquellen/google-search-console.md
    repo: "",                               // lokaler Projekt-Ordner → datenquellen/git-projekte.md
    // continuePrompt: "…",                 // eigener Text für den „Weiter mit Claude"-Knopf (sonst automatisch)
  },
  {
    id: "beispiel-blog",
    name: "Beispiel-Blog",
    domain: "beispiel-blog.de",
    accent: "#2bb673",
    umamiId: "",
    gsc: "https://beispiel-blog.de/",
    repo: "",
  },
];
