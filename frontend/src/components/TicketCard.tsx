import type { Tiquete } from "../types/tiquete";

const money = (n:number) =>
  new Intl.NumberFormat("es-CO",{style:"currency",currency:"USD"}).format(n);

const fDate = (iso:string) =>
  new Date(iso).toLocaleString("es-CO",{ dateStyle:"medium", timeStyle:"short" });

export default function TicketCard({ t }: { t: Tiquete }) {
  const badge =
    t.estado === "confirmado" ? "bg-green-50 text-green-700 border-green-200" :
    t.estado === "pendiente"  ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <div className="rounded-2xl bg-white shadow p-4 grid gap-1">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t.numero}</h3>
        <span className={`text-xs px-2 py-1 rounded-full border ${badge}`}>{t.estado}</span>
      </div>

      <p className="text-sm text-gray-600">
        {t.clase} • Asiento {t.asiento} • Puerta {t.puerta_embarque}
      </p>

      <p className="text-sm">Vuelo: <span className="font-medium">{fDate(t.fecha_vuelo)}</span></p>

      <p className="text-sm">
        Precio: <span className="font-medium">{money(t.precio)}</span>
        {t.reembolsable ? " • Reembolsable" : " • No reembolsable"}
        {t.equipaje_incluido ? " • Con equipaje" : ""}
      </p>

      <p className="text-[11px] text-gray-500">Creado: {fDate(t.creado_en)}</p>
    </div>
  );
}
