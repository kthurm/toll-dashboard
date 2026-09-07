export type TollRecord = {
  id: string;
  exitNumber: string;
  plaza: string;
  vehicles: number;
  recordedAt: string;
  direction: string;
  details?: string;
};
