export default function App() {
  const data = [
    { numero: "AV123", clase: "Económica", asiento: "12A", puerta_embarque: "B23", fecha_vuelo: "2025-09-01T09:00:00Z", precio: 350.75, reembolsable: false, equipaje_incluido: true, estado: "confirmado", creado_en: "2025-08-25T16:00:00Z" },
    { numero: "LA456", clase: "Ejecutiva", asiento: "5C",  puerta_embarque: "C12", fecha_vuelo: "2025-09-05T15:30:00Z", precio: 750.00, reembolsable: true,  equipaje_incluido: true, estado: "confirmado", creado_en: "2025-08-25T16:00:00Z" },
    { numero: "IB789", clase: "Económica", asiento: "18F", puerta_embarque: "D07", fecha_vuelo: "2025-09-10T22:00:00Z", precio: 280.00, reembolsable: false, equipaje_incluido: false,estado: "pendiente",  creado_en: "2025-08-25T16:00:00Z" }
  ];

  const money = (n:number) => new Intl.NumberFormat("es-CO",{style:"currency",currency:"USD"}).format(n);
  const fDate = (iso:string) => new Date(iso).toLocaleString("es-CO",{ dateStyle:"medium", timeStyle:"short" });

  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Tiquetes ✈️</h1>
        <p className="text-sm text-gray-600">Mock inline para verificar UI</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((t, i) => {
          const badge =
            t.estado === "confirmado" ? "bg-green-50 text-green-700 border-green-200" :
            t.estado === "pendiente"  ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                        "bg-blue-50 text-blue-700 border-blue-200";
          return (
            <div key={i} className="rounded-2xl bg-white shadow p-4 grid gap-1">
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
        })}
      </div>
    </main>
  );
}
