// Umami — Besucher und Seitenaufrufe (Cloud oder selbst gehostet),
// inklusive Tagesverlauf der letzten 30 Tage für die Diagramme.
// → datenquellen/umami.md

const env = process.env;

export function konfiguriert(properties) {
  const zugang = env.UMAMI_API_KEY || (env.UMAMI_URL && env.UMAMI_BENUTZER && env.UMAMI_PASSWORT);
  return !!zugang && properties.some((p) => p.umamiId);
}

async function zugang() {
  if (env.UMAMI_API_KEY) {
    return { basis: "https://api.umami.is/v1", headers: { "x-umami-api-key": env.UMAMI_API_KEY } };
  }
  // Selbst gehostet: einloggen, Token holen
  const res = await fetch(`${env.UMAMI_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: env.UMAMI_BENUTZER, password: env.UMAMI_PASSWORT }),
  });
  if (!res.ok) throw new Error(`Umami-Anmeldung fehlgeschlagen (${res.status})`);
  const { token } = await res.json();
  return { basis: `${env.UMAMI_URL}/api`, headers: { Authorization: `Bearer ${token}` } };
}

export async function sammle(properties) {
  const { basis, headers } = await zugang();
  const jetzt = Date.now();
  const start30 = jetzt - 30 * 864e5;

  const hole = async (pfad) => {
    const res = await fetch(`${basis}${pfad}`, { headers });
    if (!res.ok) throw new Error(`Umami-Abfrage fehlgeschlagen (${res.status})`);
    return res.json();
  };

  const proId = {};
  await Promise.all(
    properties.filter((p) => p.umamiId).map(async (p) => {
      const [stats, verlauf] = await Promise.all([
        hole(`/websites/${p.umamiId}/stats?startAt=${start30}&endAt=${jetzt}`),
        hole(`/websites/${p.umamiId}/pageviews?startAt=${start30}&endAt=${jetzt}&unit=day&timezone=Europe/Berlin`),
      ]);
      const wert = (x) => (typeof x === "object" ? x?.value ?? 0 : x ?? 0);
      // Tagesverlauf: sessions ≈ Besucher je Tag
      const serie = (verlauf.sessions || []).map((e) => ({ datum: String(e.x).slice(0, 10), wert: e.y }));
      proId[p.id] = {
        besucher30t: wert(stats.visitors),
        aufrufe30t: wert(stats.pageviews),
        besucher7t: serie.slice(-7).reduce((s, e) => s + e.wert, 0),
        serie,
      };
    })
  );
  return proId;
}
