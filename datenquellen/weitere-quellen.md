# Weitere Quellen — Ausbau-Ideen

Der Starter deckt die sechs Kern-Quellen ab. Alles hier ist **Ausbau**: mit Claude in jeweils einer Sitzung machbar, nach dem Modul-Muster aus [CLAUDE.md](../CLAUDE.md) („Das Dashboard erweitern"). Reihenfolge-Empfehlung: erst das Grundgerüst stabil laufen lassen, dann eine Quelle pro Woche.

## Newsletter (ActiveCampaign, Brevo, Mailchimp …)

Kontaktzahl, Zuwachs, Öffnungsraten der letzten Kampagnen. Alle großen Anbieter haben eine API mit einfachem Schlüssel (bei ActiveCampaign z. B. unter Einstellungen → Entwickler). Eine der dankbarsten Erweiterungen: Die Listengröße ist für Solopreneure oft DIE Kennzahl. → **API**

## Notion

Wenn du Kunden, Mitglieder oder Inhalte in Notion-Datenbanken pflegst: Zähler und Status daraus im Dashboard anzeigen (z. B. „zahlende Mitglieder"). Interne Integration unter [notion.so/my-integrations](https://www.notion.so/my-integrations) anlegen, Datenbank für sie freigeben. → **API** fürs Dashboard; für Gespräche („Fass meine Projektnotizen zusammen") ist der offizielle Notion-MCP-Server die bessere Wahl.

## Calendly / Terminbuchungen

Gebuchte Termine der letzten 30 Tage — wichtig, wenn Erstgespräche dein Verkaufsweg sind. Persönlichen Zugriffstoken in den Calendly-Integrationseinstellungen erzeugen. → **API**

## Bing Webmaster Tools

Wie Search Console, nur für Bing — und mit deutlich einfacherem Zugang (ein API-Schlüssel in den Einstellungen, kein OAuth). Lohnt sich, weil Bing-Daten auch etwas über deine Sichtbarkeit in KI-Suchen aussagen. → **API**

## Social Media (Instagram, LinkedIn, TikTok)

Die ehrliche Antwort: Offizielle APIs für die eigenen Profilzahlen sind hier entweder stark eingeschränkt oder genehmigungspflichtig. Gangbare Wege: Dienste wie Apify (kostenpflichtig, je Abruf) oder die Zahlen bewusst wöchentlich von Hand in eine kleine Datei eintragen, die das Dashboard anzeigt. Unperfekt, aber ehrlich — nicht jede Quelle hat einen sauberen API-Weg.

## Podcast-Statistiken

Die meisten Hoster (Podigee, Buzzsprout, Transistor) bieten APIs mit Abrufzahlen pro Episode. → **API**

---

**Grundsatz für alle Erweiterungen:** Erst prüfen, ob es einen offiziellen API-Schlüssel mit Nur-Lesen-Rechten gibt. Dann das Modul-Muster kopieren, `.env.beispiel` ergänzen, Kachel einbauen. Wenn ein Dienst nur MCP anbietet oder die API Genehmigungen braucht — lieber die Kennzahl weglassen oder von Hand pflegen, statt wackelige Umwege zu bauen.
