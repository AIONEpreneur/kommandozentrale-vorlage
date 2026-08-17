// Demo-Daten — werden angezeigt, solange keine starter/config.mjs existiert.
// So sieht das Dashboard sofort nach etwas aus, bevor die ersten Quellen stehen.

export function demoDaten(properties) {
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
        umami: { besucher7t: 412, aufrufe7t: 1289, besucher30t: 1743 },
        gsc: { klicks28t: 356, impressionen28t: 21480 },
        git: { branch: "main", commit: "Neue Produktseite für Herbst-Kollektion", vor: "vor 2 Tagen", offen: 3 },
      },
      {
        id: properties[1]?.id ?? "beispiel-blog",
        name: properties[1]?.name ?? "Beispiel-Blog",
        domain: properties[1]?.domain ?? "beispiel-blog.de",
        accent: "#2bb673",
        uptime: { ok: true, ms: 234 },
        umami: { besucher7t: 951, aufrufe7t: 2210, besucher30t: 3860 },
        gsc: { klicks28t: 1204, impressionen28t: 88700 },
        git: { branch: "main", commit: "Artikel: 10 Wege zu besseren Newslettern", vor: "vor 5 Stunden", offen: 0 },
      },
    ],
    global: {
      stripe: { umsatz30t: 2847.5, waehrung: "eur", zahlungen: 23 },
      youtube: { kanal: "@beispielkanal", abonnenten: 4360, aufrufe: 289413, videos: 87 },
    },
  };
}
