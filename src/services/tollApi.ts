import type { TollRecord } from "../types/toll";

export async function fetchTollRecords(): Promise<TollRecord[]> {
  return [
    {
      plaza: "Exit 20 — Saugerties",
      vehicles: 842,
      recordedAt: "2026-09-01T08:00:00Z",
    },
  ];
}
