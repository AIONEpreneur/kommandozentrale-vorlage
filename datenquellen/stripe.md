# Stripe — Umsatz der letzten 30 Tage

**Was es zeigt:** Deinen Umsatz der letzten 30 Tage (erfolgreiche Zahlungen, als Summe und Anzahl) — als eine Kachel oben im Dashboard.

## Was du brauchst

Einen **eingeschränkten API-Schlüssel**, der nur lesen darf. Bitte keinen Standard-Geheimschlüssel verwenden — der kann alles, auch Geld bewegen. So legst du den sicheren an:

1. [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) öffnen
2. **„Eingeschränkten Schlüssel erstellen"** (Create restricted key)
3. Name: „Kommandozentrale". Alle Berechtigungen auf **Keine**, nur bei
   **Charges** (Zahlungen) → **Lesen** auswählen
4. Schlüssel erstellen und in `starter/.env` eintragen:

```
STRIPE_API_KEY=rk_live_xxxxxxxxxxxx
```

(`rk_` steht für restricted key — genau richtig. Ein `sk_live_…` wäre der Vollzugriff-Schlüssel, den wollen wir hier nicht.)

## Mehrere Stripe-Konten?

Wenn du mehrere Konten hast (z. B. für verschiedene Produkte), trage sie durch Komma getrennt ein — die Umsätze werden zusammengezählt:

```
STRIPE_API_KEY=rk_live_kontoA,rk_live_kontoB
```

## API oder MCP?

Fürs Dashboard: **API**. Stripe bietet zusätzlich einen offiziellen MCP-Server an — sinnvoll, wenn du mit Claude tiefer einsteigen willst („Wie entwickeln sich meine Abos?", „Welches Produkt trägt am meisten?"). Für die reine Umsatz-Kachel ist er nicht nötig.

**Kosten:** kostenlos, API ist im Stripe-Konto enthalten.

**Sicherheit:** Der Lese-Schlüssel kann keine Zahlungen auslösen oder erstatten. Trotzdem gilt: nur in `.env`, nie committen, nie in einen Chat kopieren.
