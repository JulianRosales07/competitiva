import type { Tiquete } from "../types/tiquete";
import { useState } from "react";

type Props = {
  onCancel: () => void;
  onSubmit: (t: Tiquete) => void;
};

export default function TicketForm({ onCancel, onSubmit }: Props) {
  const [form, setForm] = useState<Tiquete>({
    cliente_id: "",
    ruta_id: "",
    numero: "",
    fecha_vuelo: new Date().toISOString(),
    clase: "Económica",
    reembolsable: false,
    asiento: "",
    puerta_embarque: "",
    precio: 0,
    equipaje_incluido: true,
    estado: "pendiente",
    creado_en: new Date().toISOString(),
  });

  const [error, setError] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Validaciones básicas
    if (!form.numero.trim()) return setError("El número de vuelo es obligatorio");
    if (!form.asiento.trim()) return setError("El asiento es obligatorio");
    if (!form.puerta_embarque.trim()) return setError("La puerta de embarque es obligatoria");
    if (!form.fecha_vuelo) return setError("La fecha de vuelo es obligatoria");
    if (form.precio < 0) return setError("El precio no puede ser negativo");

    setError("");
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <form
        onSubmit={submit}
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl p-6 grid gap-4"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold">Nuevo tiquete</h2>
          <button type="button" className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50" onClick={onCancel}>
            Cancelar
          </button>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Número de vuelo" name="numero" value={form.numero} onChange={handleChange} />
          <Input label="Asiento" name="asiento" value={form.asiento} onChange={handleChange} />

          <Input label="Cliente ID" name="cliente_id" value={form.cliente_id} onChange={handleChange} />
          <Input label="Ruta ID" name="ruta_id" value={form.ruta_id} onChange={handleChange} />

          <Input label="Puerta de embarque" name="puerta_embarque" value={form.puerta_embarque} onChange={handleChange} />
          <Select
            label="Clase"
            name="clase"
            value={form.clase}
            onChange={handleChange}
            options={["Económica", "Ejecutiva"]}
          />

          <Input label="Fecha de vuelo (ISO)" name="fecha_vuelo" value={form.fecha_vuelo} onChange={handleChange} />
          <Input type="number" step="0.01" label="Precio" name="precio" value={form.precio} onChange={handleChange} />

          <Select
            label="Estado"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            options={["confirmado", "pendiente", "abordado"]}
          />

          <Checkbox label="Reembolsable" name="reembolsable" checked={form.reembolsable} onChange={handleChange} />
          <Checkbox label="Equipaje incluido" name="equipaje_incluido" checked={form.equipaje_incluido} onChange={handleChange} />
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" className="rounded-md border px-3 py-2 text-sm" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="rounded-md bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-gray-600">{label}</span>
      <input className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200" {...rest} />
    </label>
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] }) {
  const { label, options, ...rest } = props;
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-gray-600">{label}</span>
      <select className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200" {...rest}>
        {options.map(op => <option key={op} value={op}>{op}</option>)}
      </select>
    </label>
  );
}

function Checkbox(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" className="h-4 w-4" {...rest} />
      <span className="text-gray-700">{label}</span>
    </label>
  );
}
