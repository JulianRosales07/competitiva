import { useEffect, useState } from 'react';
import { getAllTiquetes } from '../services/tiquetes';
import type { Tiquete } from '../types/tiquete';
import TicketCard from './TicketCard';

export default function TicketsList() {
  const [data, setData] = useState<Tiquete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await getAllTiquetes();
        if (alive) setData(res);
      } catch (e: any) {
        if (alive) setError(e?.message || 'Error al cargar tiquetes');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (loading) return <p className="text-sm text-gray-600">Cargando tiquetes…</p>;
  if (error)   return <p className="text-sm text-red-600">Error: {error}</p>;
  if (!data.length) return <p className="text-sm">No hay tiquetes</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((t, i) => (
        <TicketCard key={t._id ?? `${t.numero}-${t.asiento}-${i}`} t={t} />
      ))}
    </div>
  );
}
