// Git — Stand der lokalen Projekt-Ordner (letzter Commit, offene Änderungen).
// Braucht keine Schlüssel, liest nur lokal. → datenquellen/git-projekte.md

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync } from "node:fs";

const lauf = promisify(execFile);

export function konfiguriert(properties) {
  return properties.some((p) => p.repo && existsSync(p.repo));
}

export async function sammle(properties) {
  const proId = {};
  await Promise.all(
    properties.filter((p) => p.repo && existsSync(p.repo)).map(async (p) => {
      const g = async (...args) => (await lauf("git", ["-C", p.repo, ...args])).stdout.trim();
      try {
        proId[p.id] = {
          branch: await g("rev-parse", "--abbrev-ref", "HEAD"),
          commit: await g("log", "-1", "--format=%s"),
          vor: await g("log", "-1", "--format=%cr"),
          offen: (await g("status", "--porcelain")).split("\n").filter(Boolean).length,
        };
      } catch {
        proId[p.id] = null; // Ordner ohne Git — einfach nichts anzeigen
      }
    })
  );
  return proId;
}
