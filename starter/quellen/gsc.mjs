// Google Search Console — Klicks und Impressionen der letzten 28 Tage.
// → datenquellen/google-search-console.md

const env = process.env;

export function konfiguriert(properties) {
  return !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET && env.GOOGLE_REFRESH_TOKEN) && properties.some((p) => p.gsc);
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

  // Google liefert mit 2–3 Tagen Verzögerung → Fenster: vor 31 bis vor 3 Tagen
  const datum = (vorTagen) => new Date(Date.now() - vorTagen * 864e5).toISOString().slice(0, 10);
  const zeitraum = { startDate: datum(31), endDate: datum(3) };

  const proId = {};
  await Promise.all(
    properties.filter((p) => p.gsc).map(async (p) => {
      const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(p.gsc)}/searchAnalytics/query`;
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(zeitraum),
      });
      if (!res.ok) throw new Error(`Search Console: ${p.gsc} nicht abrufbar (${res.status}) — Adresse exakt wie in der Search Console?`);
      const zeile = (await res.json()).rows?.[0];
      proId[p.id] = { klicks28t: Math.round(zeile?.clicks ?? 0), impressionen28t: Math.round(zeile?.impressions ?? 0) };
    })
  );
  return proId;
}
