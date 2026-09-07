import "./App.css";
import { useEffect, useState } from "react";
import { fetchTollRecords } from "./services/tollApi";
import type { TollRecord } from "./types/toll";
import MetricCard from "./components/MetricCard";

function App() {
  const [tollRecords, setTollRecords] = useState<TollRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlaza, setSelectedPlaza] = useState("All plazas");
  useEffect(() => {
    async function loadTollRecords() {
      try {
        const records = await fetchTollRecords();
        setTollRecords(records);
      } catch {
        setError("Failed to load toll records.");
      } finally {
        setIsLoading(false);
      }
    }
    loadTollRecords();
  }, []);
  const plazaOptions = Array.from(
    new Set(tollRecords.map((record) => record.plaza)),
  ).sort();
  const filteredTollRecords =
    selectedPlaza === "All plazas"
      ? tollRecords
      : tollRecords.filter((record) => record.plaza === selectedPlaza);
  const totalVehicles = filteredTollRecords.reduce(
    (total, record) => total + record.vehicles,
    0,
  );
  function formatRecordTime(timestamp: string) {
    return new Date(timestamp).toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <>
      <main className="p-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Toll Operations Dashboard</h1>
          <div>
            <p className="mt-2 font-semibold">
              Records shown: {filteredTollRecords.length}
            </p>
            <p className="text-xs">
              Date Recorded:{" "}
              {filteredTollRecords.length > 0
                ? formatRecordTime(filteredTollRecords[0].recordedAt)
                : "No records"}
            </p>
          </div>
        </div>
        <label className="mt-4 block text-sm font-medium text-slate-700">
          <span className="screen-reader-text hidden">Plaza</span>
          <select
            className="mt-1 block rounded border border-slate-300 bg-white px-3 py-2"
            value={selectedPlaza}
            onChange={(event) => setSelectedPlaza(event.target.value)}
          >
            <option value="All plazas">All plazas</option>
            {plazaOptions.map((plaza) => (
              <option key={plaza} value={plaza}>
                {plaza}
              </option>
            ))}
          </select>
        </label>
        {isLoading ? (
          <p className="mt-2">Loading toll records...</p>
        ) : error ? (
          <p className="mt-2 text-red-600" role="alert">
            {error}
          </p>
        ) : (
          <div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTollRecords.map((record) => (
                <MetricCard
                  key={record.id}
                  label={`Vehicles at Exit #${record.exitNumber} · ${record.direction}`}
                  title={record.plaza}
                  value={record.vehicles}
                />
              ))}
              <MetricCard
                className="bg-blue-100"
                label="Total Vehicles"
                value={totalVehicles}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
