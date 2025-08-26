import { useEffect, useMemo, useState } from "react";
import type { Tiquete } from "../types/tiquete";
import { TIQUETES_MOCK } from "../mock/tiquetes";
import TicketCard from "./TicketCard";
import TicketDetail from "./TicketDetail";
import TicketForm from "./TicketForm";
import TicketsFilters from "./TicketsFilters";

export default function TicketsList() {
  const [data, setData] = useState<Tiquete[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Tiquete | null>(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Tiquete | null>(null);

  // filtros
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState("");
  const [clase, setClase] = useState("");

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

  function updateTicket(updated: Tiquete) {
    setData((prev) =>
      prev.map((t) =>
        t._id === updated._id
          ? updated
          : t.numero === updated.numero && t.asiento === updated.asiento
          ? updated
          : t
      )
    );
    setEditing(null);
  }

  function deleteTicket(target: Tiquete) {
    if (!confirm(`¿Eliminar el tiquete ${target.numero}?`)) return;
    setData((prev) =>
      prev.filter((t) =>
        t._id ? t._id !== target._id : !(t.numero === target.numero && t.asiento === target.asiento)
      )
    );
    if (
      selected &&
      (selected._id === target._id ||
        (selected.numero === target.numero && selected.asiento === target.asiento))
    ) {
      setSelected(null);
    }
  }

  const filtered = useMemo(() => {
    return data.filter((t) => {
      if (query && !t.numero.toLowerCase().includes(query.toLowerCase())) return false;
      if (estado && t.estado !== estado) return false;
      if (clase && t.clase !== clase) return false;
      return true;
    });
  }, [data, query, estado, clase]);

  if (loading) return <p className="text-sm text-gray-600">Cargando tiquetes…</p>;

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-between mb-2">
        <p className="text-sm text-gray-600">
          {filtered.length} tiquetes {filtered.length !== data.length ? `(de ${data.length})` : ""}
        </p>
        <div className="flex gap-2">
          <button
            className="rounded-md bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700"
            onClick={() => setCreating(true)}
          >
            Nuevo tiquete
          </button>
        </div>
      </div>

      <TicketsFilters
        query={query} setQuery={setQuery}
        estado={estado} setEstado={setEstado}
        clase={clase} setClase={setClase}
      />

      {filtered.length === 0 ? (
        <p className="text-sm">No hay tiquetes que coincidan</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <div key={t._id ?? `${t.numero}-${t.asiento}-${i}`} className="grid gap-2">
              <button className="text-left" onClick={() => setSelected(t)}>
                <TicketCard t={t} />
              </button>
              <div className="flex gap-2">
                <button
                  className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                  onClick={() => setEditing(t)}
                >
                  Editar
                </button>
                <button
                  className="rounded-md border px-3 py-1 text-sm hover:bg-red-50 text-red-700 border-red-200"
                  onClick={() => deleteTicket(t)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && <TicketDetail tiquete={selected} onClose={() => setSelected(null)} />}
      {creating && (
        <TicketForm onCancel={() => setCreating(false)} onSubmit={addTicket} title="Nuevo tiquete" />
      )}
      {editing && (
        <TicketForm
          onCancel={() => setEditing(null)}
          onSubmit={(t) => updateTicket({ ...t, _id: editing._id })}
          initial={editing}
          title="Editar tiquete"
        />
      )}
    </>
  );
}
