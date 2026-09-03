import "./App.css";
import { useEffect, useState } from "react";
import { fetchTollRecords } from "./services/tollApi";
import type { TollRecord } from "./types/toll";

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
          <p className="mt-2">Records loaded: {tollRecords.length}</p>
        )}
      </main>
    </>
  );
}

export default App;
