import { useEffect, useState } from "react";
import type { Tiquete } from "../types/tiquete";
import { TIQUETES_MOCK } from "../mock/tiquetes";
import TicketCard from "./TicketCard";
import TicketDetail from "./TicketDetail";
import TicketForm from "./TicketForm";

export default function TicketsList() {
  const [data, setData] = useState<Tiquete[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Tiquete | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setData(TIQUETES_MOCK);
      setLoading(false);
    }, 300);
    return () => clearTimeout(id);
  }, []);

  function addTicket(t: Tiquete) {
    setData((prev) => [{ ...t, _id: crypto.randomUUID?.() }, ...prev]);
    setCreating(false);
  }

  if (loading) return <p className="text-sm text-gray-600">Cargando tiquetes…</p>;
  if (!data.length) return (
    <>
      <div className="flex justify-end mb-4">
        <button className="rounded-md bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700" onClick={() => setCreating(true)}>
          Nuevo tiquete
        </button>
      </div>
      <p className="text-sm">No hay tiquetes</p>
      {creating && <TicketForm onCancel={() => setCreating(false)} onSubmit={addTicket} />}
    </>
  );

  return (
    <>
      <div className="flex justify-end mb-4">
        <button className="rounded-md bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700" onClick={() => setCreating(true)}>
          Nuevo tiquete
        </button>
      </div>

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

      {selected && <TicketDetail tiquete={selected} onClose={() => setSelected(null)} />}
      {creating && <TicketForm onCancel={() => setCreating(false)} onSubmit={addTicket} />}
    </>
  );
}
