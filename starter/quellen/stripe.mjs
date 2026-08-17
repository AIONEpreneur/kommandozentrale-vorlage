// Stripe — Umsatz der letzten 30 Tage (alle erfolgreichen Zahlungen).
// Mehrere Konten möglich: Schlüssel in .env durch Komma trennen.
// → datenquellen/stripe.md

const env = process.env;

export function konfiguriert() {
  return !!env.STRIPE_API_KEY;
}

export async function sammle() {
  const schluessel = env.STRIPE_API_KEY.split(",").map((s) => s.trim()).filter(Boolean);
  const seit = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;

  let summe = 0, anzahl = 0, waehrung = "eur";
  for (const key of schluessel) {
    let url = `https://api.stripe.com/v1/charges?limit=100&created[gte]=${seit}`;
    for (let seite = 0; seite < 10; seite++) { // Sicherheitsgrenze: max. 1.000 Zahlungen/Konto
      const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
      if (!res.ok) throw new Error(`Stripe-Abfrage fehlgeschlagen (${res.status}) — Schlüssel korrekt und mit Charges:Lesen berechtigt?`);
      const daten = await res.json();
      for (const zahlung of daten.data) {
        if (zahlung.status !== "succeeded" || zahlung.refunded) continue;
        summe += zahlung.amount / 100;
        anzahl++;
        waehrung = zahlung.currency || waehrung;
      }
      if (!daten.has_more) break;
      url = `https://api.stripe.com/v1/charges?limit=100&created[gte]=${seit}&starting_after=${daten.data.at(-1).id}`;
    }
  }
  return { umsatz30t: Math.round(summe * 100) / 100, waehrung, zahlungen: anzahl };
}
