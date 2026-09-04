import type { TollRecord } from "../types/toll";
type ThruwayApiRecord = {
  start_time: string;
  plaza: string;
  direction: string;
  e_zpass_total_vehicle_count: string;
  cash_total_vehicle_count: string;
};

const PLAZA_NAMES: Record<string, string> = {
  "06": "Yonkers",
  "07": "Tappan Zee",
  "08": "Newburgh",
  "09": "New Paltz",
  "10": "Kingston",
  "11": "Saugerties",
  "12": "Catskill",
  "13": "Coxsackie",
  "14": "Albany",
  "15": "Troy",
};

function getPlazaName(plazaId: string) {
  return PLAZA_NAMES[plazaId] ?? `Plaza ${plazaId}`;
}

const TOLL_API_URL =
  "https://data.ny.gov/resource/2hz2-2s5g.json?$limit=100&$order=start_time DESC";
export async function fetchTollRecords(): Promise<TollRecord[]> {
  const response = await fetch(TOLL_API_URL);
  if (!response.ok) {
    throw new Error("Unable to load toll records.");
  }
  const rawRecords: ThruwayApiRecord[] = await response.json();

  return rawRecords.map((record) => ({
    plaza: getPlazaName(record.plaza),
    vehicles:
      Number(record.e_zpass_total_vehicle_count) +
      Number(record.cash_total_vehicle_count),
    recordedAt: record.start_time,
  }));
}
