// Google Analytics 4 — Besucher und Seitenaufrufe inkl. Tagesverlauf.
// Nutzt dieselbe Google-Anmeldung wie die Search Console (GOOGLE_* in .env).
// → datenquellen/google-analytics.md

const env = process.env;

export function konfiguriert(properties) {
  return !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET && env.GOOGLE_REFRESH_TOKEN) && properties.some((p) => p.ga4);
}

async function accessToken() {
  const body = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_CLIENT_SECRET,
    refresh_token: env.GOOGLE_REFRESH_TOKEN,
    grant_type: "refresh_token",
  });
  const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", body });
  if (!res.ok) throw new Error(`Google-Anmeldung fehlgeschlagen (${res.status}) — Refresh-Token noch gültig?`);
  return (await res.json()).access_token;
}

export async function sammle(properties) {
  const token = await accessToken();

  const proId = {};
  await Promise.all(
    properties.filter((p) => p.ga4).map(async (p) => {
      const id = String(p.ga4).replace(/^properties\//, "");
      const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${id}:runReport`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          dimensions: [{ name: "date" }],
          metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
        }),
      });
      if (!res.ok) throw new Error(`Google Analytics: Property ${id} nicht abrufbar (${res.status}) — Data API aktiviert, Property-ID korrekt, Login neu gemacht?`);
      const zeilen = (await res.json()).rows ?? [];
      const serie = zeilen
        .map((z) => {
          const d = z.dimensionValues[0].value; // "20260817"
          return { datum: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`, wert: +z.metricValues[0].value, aufrufe: +z.metricValues[1].value };
        })
        .sort((a, b) => (a.datum < b.datum ? -1 : 1));
      proId[p.id] = {
        besucher30t: serie.reduce((s, e) => s + e.wert, 0),
        aufrufe30t: serie.reduce((s, e) => s + e.aufrufe, 0),
        besucher7t: serie.slice(-7).reduce((s, e) => s + e.wert, 0),
        serie: serie.map((e) => ({ datum: e.datum, wert: e.wert })),
      };
    })
  );
  return proId;
}
