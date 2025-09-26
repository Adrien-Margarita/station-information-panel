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
  if(err) {
    return <p className="text-red-500">Erreur de chargement: {err}</p>;
  };

  // Gestion du chargement
  if(!data) {
    return (
      <div>
        <main>Chargement…</main>
      </div>
    );
  }

  return (
    <div>
      <main>
        {/* Arrivées */}
        <section id="arrivees">
          <h2>Arrivées</h2>
          <div>
            <table>
              <caption>Trains à l'arrivée triés par heure croissante</caption>
              <thead>
                <tr>
                  <th scope="col">N°</th>
                  <th scope="col">Provenance</th>
                  <th scope="col">Heure</th>
                  <th scope="col">Retard</th>
                </tr>
              </thead>
              <tbody>
                {arrivals.map((t) => (
                  <tr key={`arr-${t.numero}`}>
                    <td>{t.numero}</td>
                    <td>{t.provenance}</td>
                    <td>{t.heure}</td>
                    <td className={`px-3 py-2 ${t.retard > 0 ? "text-red-300 font-semibold" : "text-emerald-400"}`}>
                      {t.retard > 0 ? `+${t.retard} min` : "à l'heure"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Départs */}
        <section id="departs">
          <h2>Départs</h2>
          <div>
            <table>
              <caption>Trains au départ triés par heure croissante</caption>
              <thead>
                <tr>
                  <th scope="col">N°</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Heure</th>
                  <th scope="col">Retard</th>
                </tr>
              </thead>
              <tbody>
                {departures.map((t) => (
                  <tr key={`dep-${t.numero}`}>
                    <td>{t.numero}</td>
                    <td>{t.destination}</td>
                    <td>{t.heure}</td>
                    <td className={`px-3 py-2 ${t.retard > 0 ? "text-red-300 font-semibold" : "text-emerald-400"}`}>
                      {t.retard > 0 ? `+${t.retard} min` : "à l'heure"}
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
