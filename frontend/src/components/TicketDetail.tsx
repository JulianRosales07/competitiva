import type { Tiquete } from "../types/tiquete";
import { useEffect } from "react";

export default function TicketDetail({
  tiquete,
  onClose,
}: {
  tiquete: Tiquete;
  onClose: () => void;
}) {
  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const money = (n:number) =>
    new Intl.NumberFormat("es-CO",{style:"currency",currency:"USD"}).format(n);
  const fDate = (iso:string) =>
    new Date(iso).toLocaleString("es-CO",{ dateStyle:"medium", timeStyle:"short" });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-xl p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold">Detalle del tiquete</h2>
          <button
            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
            onClick={onClose}
            aria-label="Cerrar"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <Info label="Número" value={tiquete.numero} />
          <Info label="Clase" value={tiquete.clase} />
          <Info label="Asiento" value={tiquete.asiento} />
          <Info label="Puerta" value={tiquete.puerta_embarque} />
          <Info label="Fecha vuelo" value={fDate(tiquete.fecha_vuelo)} />
          <Info label="Estado" value={tiquete.estado} />
          <Info label="Precio" value={money(tiquete.precio)} />
          <Info label="Reembolsable" value={tiquete.reembolsable ? "Sí" : "No"} />
          <Info label="Equipaje incluido" value={tiquete.equipaje_incluido ? "Sí" : "No"} />
          <Info label="Cliente ID" value={tiquete.cliente_id} />
          <Info label="Ruta ID" value={tiquete.ruta_id} />
          <Info label="Creado" value={fDate(tiquete.creado_en)} />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-gray-500">{label}</div>
      <div className="font-medium break-all">{value}</div>
    </div>
  );
}
