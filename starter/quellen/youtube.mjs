// YouTube — öffentliche Kanalzahlen (Abonnenten, Aufrufe, Videos).
// Kleinstes Modul — gutes Muster zum Kopieren für eigene Quellen.
// → datenquellen/youtube.md

const env = process.env;

export function konfiguriert() {
  return !!(env.YT_API_KEY && env.YT_KANAL);
}

export async function sammle() {
  const handle = env.YT_KANAL.replace(/^@/, "");
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=${encodeURIComponent(handle)}&key=${env.YT_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube-Abfrage fehlgeschlagen (${res.status})`);
  const stats = (await res.json()).items?.[0]?.statistics;
  if (!stats) throw new Error(`YouTube-Kanal "@${handle}" nicht gefunden — Handle prüfen`);
  return {
    kanal: `@${handle}`,
    abonnenten: Number(stats.subscriberCount),
    aufrufe: Number(stats.viewCount),
    videos: Number(stats.videoCount),
  };
}
