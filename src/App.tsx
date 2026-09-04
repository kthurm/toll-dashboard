import "./App.css";
import { useEffect, useState } from "react";
import { fetchTollRecords } from "./services/tollApi";
import type { TollRecord } from "./types/toll";
import MetricCard from "./components/MetricCard";

function App() {
  const [tollRecords, setTollRecords] = useState<TollRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
  const totalVehicles = tollRecords.reduce(
    (total, record) => total + record.vehicles,
    0,
  );
  return (
    <>
      <main className="p-8">
        <h1 className="text-2xl font-bold">Toll Operations Dashboard</h1>
        {isLoading ? (
          <p className="mt-2">Loading toll records...</p>
        ) : error ? (
          <p className="mt-2 text-red-600" role="alert">
            {error}
          </p>
        ) : (
          <div>
            <p className="mt-2">Records loaded: {tollRecords.length}</p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tollRecords.map((record) => (
                <MetricCard
                  key={record.plaza}
                  label={`Vehicles at ${record.plaza}`}
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
