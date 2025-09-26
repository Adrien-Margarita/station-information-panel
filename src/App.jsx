import './index.css'
import { useMemo, useEffect, useState } from 'react'
import { toMinutes } from './utils/time.js'

function App() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/trains.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setData)
      .catch((e) => setErr(e.message));
  }, []);
  
  // Trier les arrivées par horaire croissant
  const arrivals = useMemo(() => {
    if (!data || !Array.isArray(data.arrivees)) return [];
    return [...data.arrivees].sort((a, b) => toMinutes(a.heure) - toMinutes(b.heure));
  }, [data]);

  // Trier les départs par horaire croissant
  const departures = useMemo(() => {
    if (!data || !Array.isArray(data.depart)) return [];
    return [...data.depart].sort((a, b) => toMinutes(a.heure) - toMinutes(b.heure));
  }, [data]);

  // Gestion des erreurs
  if (err) {
    return <p className="text-red-500">Erreur de chargement: {err}</p>;
  }

  // Gestion du chargement
  if (!data) {
    return (
      <div>
        <main>Chargement…</main>
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen bg-slate-950 text-slate-100 pt-5 px-5">
      {/* 1 colonne sur mobile, 2 colonnes sur desktop */}
      <main className="grid gap-5 md:grid-cols-2 max-w-6xl w-full">
        {/* Tableau des arrivées */}
        <section id="arrivees">
          <h2 className="text-lg font-semibold mb-2 text-slate-100">Arrivées</h2>
          <div className="overflow-x-auto border border-slate-700/80 rounded-xl shadow">
            <table className="w-full border-collapse bg-slate-900/40 rounded-xl">
              <thead className="bg-slate-800 text-slate-300 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="text-left font-semibold px-4 py-2">N°</th>
                  <th scope="col" className="text-left font-semibold px-4 py-2">Provenance</th>
                  <th scope="col" className="text-left font-semibold px-4 py-2">Heure</th>
                  <th scope="col" className="text-left font-semibold px-4 py-2">Retard</th>
                </tr>
              </thead>
              <tbody>
                {arrivals.map((train) => (
                  <tr
                    key={`arr-${train.numero}`}
                    className="odd:bg-slate-900/20 even:bg-slate-600/30 hover:bg-sky-400/10"
                  >
                    <td className="px-4 py-2 font-semibold">{train.numero}</td>
                    <td className="px-4 py-2">{train.provenance}</td>
                    <td className="px-4 py-2 tabular-nums">{train.heure}</td>
                    <td
                      className={`px-4 py-2 tabular-nums ${
                        train.retard > 0
                          ? "text-red-300 font-semibold"
                          : "text-emerald-400"
                      }`}
                    >
                      {train.retard > 0 ? `+${train.retard} min` : "à l'heure"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tableau des départs */}
        <section id="departs">
          <h2 className="text-lg font-semibold mb-2 text-slate-100">Départs</h2>
          <div className="overflow-x-auto border border-slate-700/80 rounded-xl shadow">
            <table className="w-full border-collapse bg-slate-900/40 rounded-xl">
              <thead className="bg-slate-800 text-slate-300 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="text-left font-semibold px-4 py-2">N°</th>
                  <th scope="col" className="text-left font-semibold px-4 py-2">Destination</th>
                  <th scope="col" className="text-left font-semibold px-4 py-2">Heure</th>
                  <th scope="col" className="text-left font-semibold px-4 py-2">Retard</th>
                </tr>
              </thead>
              <tbody>
                {departures.map((train) => (
                  <tr
                    key={`dep-${train.numero}`}
                    className="odd:bg-slate-900/20 even:bg-slate-600/30 hover:bg-sky-400/10"
                  >
                    <td className="px-4 py-2 font-semibold">{train.numero}</td>
                    <td className="px-4 py-2">{train.destination}</td>
                    <td className="px-4 py-2 tabular-nums">{train.heure}</td>
                    <td
                      className={`px-4 py-2 tabular-nums ${
                        train.retard > 0
                          ? "text-red-300 font-semibold"
                          : "text-emerald-400"
                      }`}
                    >
                      {train.retard > 0 ? `+${train.retard} min` : "à l'heure"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
