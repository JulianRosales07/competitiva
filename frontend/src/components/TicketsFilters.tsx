import type { Tiquete } from "../types/tiquete";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  estado: string;
  setEstado: (v: string) => void;
  clase: string;
  setClase: (v: string) => void;
};

export default function TicketsFilters({
  query, setQuery, estado, setEstado, clase, setClase,
}: Props) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      <input
        className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Buscar por número..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select
        className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
      >
        <option value="">Todos los estados</option>
        <option value="confirmado">Confirmado</option>
        <option value="pendiente">Pendiente</option>
        <option value="abordado">Abordado</option>
      </select>

      <select
        className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
        value={clase}
        onChange={(e) => setClase(e.target.value)}
      >
        <option value="">Todas las clases</option>
        <option value="Económica">Económica</option>
        <option value="Ejecutiva">Ejecutiva</option>
      </select>

      <button
        className="rounded-md border px-3 py-2 text-sm"
        onClick={() => { setQuery(""); setEstado(""); setClase(""); }}
      >
        Limpiar filtros
      </button>
    </div>
  );
}
