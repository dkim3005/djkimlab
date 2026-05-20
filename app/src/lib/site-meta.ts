import { execSync } from "node:child_process";

let cachedLastUpdated: string | null = null;

/**
 * ISO date of the most recent commit on the working tree. Computed once
 * per build. If git is unavailable, falls back to the build's wall-clock
 * date so the footer never breaks.
 */
export function getSiteLastUpdated(): string {
  if (cachedLastUpdated) return cachedLastUpdated;
  try {
    const iso = execSync("git log -1 --format=%cI", {
      cwd: process.cwd(),
      encoding: "utf-8",
    }).trim();
    cachedLastUpdated = iso.split("T")[0]; // YYYY-MM-DD
  } catch {
    cachedLastUpdated = new Date().toISOString().split("T")[0];
  }
  return cachedLastUpdated;
}
