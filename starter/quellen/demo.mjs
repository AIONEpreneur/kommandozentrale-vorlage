// Demo-Daten — werden angezeigt, solange keine starter/config.mjs existiert.
// So sieht das Dashboard sofort nach etwas aus, bevor die ersten Quellen stehen.

// Deterministische Beispiel-Verläufe (kein Zufall, damit es reproduzierbar bleibt)
function serie(tage, basis, welle, saat) {
  const heute = Date.now();
  return Array.from({ length: tage }, (_, i) => {
    const d = new Date(heute - (tage - 1 - i) * 864e5);
    const wert = Math.max(0, Math.round(basis + welle * Math.sin((i + saat) / 3.1) + (i % 7 === 5 || i % 7 === 6 ? -basis * 0.25 : 0) + ((i * saat * 7) % 13)));
    return { datum: d.toISOString().slice(0, 10), wert };
  });
}
const gscSerie = (tage, klicksBasis, saat) =>
  serie(tage, klicksBasis, klicksBasis * 0.3, saat).map((e) => ({ datum: e.datum, klicks: e.wert, impressionen: e.wert * 58 }));

export function demoDaten(properties) {
  const s1 = serie(30, 58, 16, 3);
  const s2 = serie(30, 132, 30, 8);
  const g1 = gscSerie(28, 13, 5);
  const g2 = gscSerie(28, 43, 2);
  const summe = (arr, k = "wert") => arr.reduce((s, e) => s + e[k], 0);

  return {
    stand: new Date().toISOString(),
    demo: true,
    quellen: { uptime: true, git: true, umami: true, gsc: true, stripe: true, youtube: true },
    fehler: {},
    properties: [
      {
        id: properties[0]?.id ?? "beispiel-shop",
        name: properties[0]?.name ?? "Beispiel-Shop",
        domain: properties[0]?.domain ?? "beispiel-shop.de",
        accent: "#7c5cff",
        uptime: { ok: true, ms: 187 },
        umami: { besucher7t: summe(s1.slice(-7)), besucher30t: summe(s1), aufrufe30t: summe(s1) * 3, serie: s1 },
        gsc: { klicks28t: summe(g1, "klicks"), impressionen28t: summe(g1, "impressionen"), serie: g1 },
        git: { branch: "main", commit: "Neue Produktseite für Herbst-Kollektion", vor: "vor 2 Tagen", offen: 3 },
      },
      {
        id: properties[1]?.id ?? "beispiel-blog",
        name: properties[1]?.name ?? "Beispiel-Blog",
        domain: properties[1]?.domain ?? "beispiel-blog.de",
        accent: "#2bb673",
        uptime: { ok: true, ms: 234 },
        umami: { besucher7t: summe(s2.slice(-7)), besucher30t: summe(s2), aufrufe30t: Math.round(summe(s2) * 2.3), serie: s2 },
        gsc: { klicks28t: summe(g2, "klicks"), impressionen28t: summe(g2, "impressionen"), serie: g2 },
        git: { branch: "main", commit: "Artikel: 10 Wege zu besseren Newslettern", vor: "vor 5 Stunden", offen: 0 },
      },
    ],
    global: {
      stripe: { umsatz30t: 2847.5, waehrung: "eur", zahlungen: 23 },
      youtube: { kanal: "@beispielkanal", abonnenten: 4360, aufrufe: 289413, videos: 87 },
    },
  };
}
