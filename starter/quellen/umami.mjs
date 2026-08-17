// Umami — Besucher und Seitenaufrufe (Cloud oder selbst gehostet).
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
  const tage = (n) => jetzt - n * 24 * 60 * 60 * 1000;

  const stats = async (websiteId, startAt) => {
    const res = await fetch(`${basis}/websites/${websiteId}/stats?startAt=${startAt}&endAt=${jetzt}`, { headers });
    if (!res.ok) throw new Error(`Umami-Abfrage fehlgeschlagen (${res.status})`);
    return res.json();
  };

  const proId = {};
  await Promise.all(
    properties.filter((p) => p.umamiId).map(async (p) => {
      const [s7, s30] = await Promise.all([stats(p.umamiId, tage(7)), stats(p.umamiId, tage(30))]);
      const wert = (x) => (typeof x === "object" ? x?.value ?? 0 : x ?? 0);
      proId[p.id] = {
        besucher7t: wert(s7.visitors),
        aufrufe7t: wert(s7.pageviews),
        besucher30t: wert(s30.visitors),
      };
    })
  );
  return proId;
}
