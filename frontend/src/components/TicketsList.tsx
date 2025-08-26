import { useEffect, useState } from "react";
import type { Tiquete } from "../types/tiquete";
import { TIQUETES_MOCK } from "../mock/tiquetes";
import TicketCard from "./TicketCard";
import TicketDetail from "./TicketDetail";

export default function TicketsList() {
  const [data, setData] = useState<Tiquete[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Tiquete | null>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setData(TIQUETES_MOCK);
      setLoading(false);
    }, 300);
    return () => clearTimeout(id);
  }, []);

  if (loading) return <p className="text-sm text-gray-600">Cargando tiquetes…</p>;
  if (!data.length) return <p className="text-sm">No hay tiquetes</p>;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((t, i) => (
          <button
            key={t._id ?? `${t.numero}-${t.asiento}-${i}`}
            className="text-left"
            onClick={() => setSelected(t)}
          >
            <TicketCard t={t} />
          </button>
        ))}
      </div>

      {selected && (
        <TicketDetail
          tiquete={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
