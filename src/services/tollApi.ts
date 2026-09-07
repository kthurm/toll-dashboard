import type { TollRecord } from "../types/toll";
type ThruwayApiRecord = {
  start_time: string;
  plaza: string;
  direction: string;
  e_zpass_total_vehicle_count: string;
  cash_total_vehicle_count: string;
};

type ThruwayExitRecord = {
  exit: string;
  description: string;
  route_id: string;
};

function getPlazaName(
  plazaId: string,
  exitDescriptions: Record<string, string>,
) {
  const normalizedId = plazaId.replace(/^0+/, "");

  const exactDescription = exitDescriptions[normalizedId];

  if (exactDescription) {
    return exactDescription;
  }

  const baseExitId = normalizedId.replace(/[EWH]$/, "");

  return exitDescriptions[baseExitId] ?? `Exit ${plazaId}`;
}

function getDirectionLabel(direction: string) {
  const directionLabels: Record<string, string> = {
    E: "Entering the Thruway",
    X: "Exiting the Thruway",
    N: "Northbound",
    S: "Southbound",
  };

  return directionLabels[direction] ?? direction;
}

const TOLL_API_URL =
  "https://data.ny.gov/resource/2hz2-2s5g.json?$limit=100&$order=start_time DESC";

export async function fetchTollRecords(): Promise<TollRecord[]> {
  const response = await fetch(TOLL_API_URL);
  if (!response.ok) {
    throw new Error("Unable to load toll records.");
  }
  const rawRecords: ThruwayApiRecord[] = await response.json();

  const EXIT_API_URL = "https://data.ny.gov/resource/7jkf-259w.json?$limit=500";
  const exitResponse = await fetch(EXIT_API_URL);

  if (!exitResponse.ok) {
    throw new Error("Unable to load Thruway exit information.");
  }

  const exitRecords: ThruwayExitRecord[] = await exitResponse.json();

  const exitDescriptions = Object.fromEntries(
    exitRecords
      .filter((exitRecord) => exitRecord.route_id === "ML")
      .map((exitRecord) => [exitRecord.exit, exitRecord.description]),
  );

  return rawRecords.map((record) => ({
    id: `${record.plaza}-${record.start_time}-${record.direction}`,
    exitNumber: record.plaza,
    plaza: getPlazaName(record.plaza, exitDescriptions),
    direction: getDirectionLabel(record.direction),
    vehicles:
      Number(record.e_zpass_total_vehicle_count) +
      Number(record.cash_total_vehicle_count),
    recordedAt: record.start_time,
  }));
}
