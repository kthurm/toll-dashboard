import type { TollRecord } from "../types/toll";

export async function fetchTollRecords(): Promise<TollRecord[]> {
  // throw new Error("Test API failure");
  return [
    {
      plaza: "Exit 20 — Saugerties",
      vehicles: 842,
      recordedAt: "2026-09-01T08:00:00Z",
    },
    {
      plaza: "Exit 21 — Catskill",
      vehicles: 1215,
      recordedAt: "2026-09-01T08:00:00Z",
    },
    {
      plaza: "Exit 21-B — New Baltimore",
      vehicles: 1098,
      recordedAt: "2026-09-01T08:00:00Z",
    },
  ];
}
