type SortBy = 'fecha_vuelo' | 'precio' | 'numero';
type SortDir = 'asc' | 'desc';

type Props = {
  sortBy: SortBy;
  setSortBy: (v: SortBy) => void;
  sortDir: SortDir;
  setSortDir: (v: SortDir) => void;
};

export default function TicketsSort({ sortBy, setSortBy, sortDir, setSortDir }: Props) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      <label className="grid gap-1 text-sm">
        <span className="text-gray-600">Ordenar por</span>
        <select
          className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
        >
          <option value="fecha_vuelo">Fecha de vuelo</option>
          <option value="precio">Precio</option>
          <option value="numero">Número de vuelo</option>
        </select>
      </label>

      <label className="grid gap-1 text-sm">
        <span className="text-gray-600">Dirección</span>
        <select
          className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
          value={sortDir}
          onChange={(e) => setSortDir(e.target.value as SortDir)}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </label>
    </div>
  );
}
