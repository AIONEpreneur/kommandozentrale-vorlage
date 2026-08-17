// Uptime — ruft jede Projekt-Domain auf und misst die Antwortzeit.
// Braucht keine Schlüssel. → datenquellen/uptime.md

export function konfiguriert(properties) {
  return properties.some((p) => p.domain);
}

export async function sammle(properties) {
  const proId = {};
  await Promise.all(
    properties.filter((p) => p.domain).map(async (p) => {
      const start = Date.now();
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 8000);
        const res = await fetch(`https://${p.domain}`, { redirect: "follow", signal: ctrl.signal });
        clearTimeout(timer);
        proId[p.id] = { ok: res.ok, ms: Date.now() - start };
      } catch {
        proId[p.id] = { ok: false, ms: null };
      }
    })
  );
  return proId;
}
