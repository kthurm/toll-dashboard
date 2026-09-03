import "./App.css";
import { useEffect, useState } from "react";
import { fetchTollRecords } from "./services/tollApi";
import type { TollRecord } from "./types/toll";

function App() {
  const [tollRecords, setTollRecords] = useState<TollRecord[]>([]);
  useEffect(() => {
    async function loadTollRecords() {
      const records = await fetchTollRecords();
      setTollRecords(records);
    }
    loadTollRecords();
  }, []);

  return (
    <>
      <main className="p-8">
        <h1 className="text-2xl font-bold">Toll Operations Dashboard</h1>
        <p className="mt-2">Records loaded: {tollRecords.length}</p>
      </main>
    </>
  );
}

export default App;
