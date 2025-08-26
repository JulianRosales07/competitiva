import { useMemo } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import Breadcrumbs from '../components/Breadcrumbs'
import { TIQUETES_MOCK } from '../mock/tiquetes'
import type { Tiquete } from '../types/tiquete'
import { ticketId } from '../lib/id'

const money = (n:number) => new Intl.NumberFormat('es-CO',{style:'currency',currency:'USD'}).format(n)
const fDate = (iso:string) => new Date(iso).toLocaleString('es-CO',{ dateStyle:'medium', timeStyle:'short'})

export default function TicketDetailPage() {
  const { id = '' } = useParams()
  const nav = useNavigate()

  const t: Tiquete | undefined = useMemo(
    () => TIQUETES_MOCK.find(x => ticketId(x) === id),
    [id]
  )

  return (
    <>
      <Navbar />
      <main className="min-h-screen p-6 max-w-7xl mx-auto">
        <div className="mb-4">
          <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Detalle' }]} />
        </div>

        {!t ? (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Tiquete no encontrado</h2>
            </div>
            <div className="card-body">
              <div className="mb-4 flex items-center gap-2">
                <button className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50" onClick={() => nav(-1)}>Volver</button>
                <Link to="/" className="text-sm text-blue-600 underline">Ir al listado</Link>
              </div>
              <p className="text-sm text-gray-600">Revisa el enlace o regresa al listado.</p>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">{t.numero}</h2>
              <span className="text-xs text-gray-500">{t.estado}</span>
            </div>
            <div className="card-body grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <Info label="Número" value={t.numero} />
              <Info label="Clase" value={t.clase} />
              <Info label="Asiento" value={t.asiento} />
              <Info label="Puerta" value={t.puerta_embarque} />
              <Info label="Fecha vuelo" value={fDate(t.fecha_vuelo)} />
              <Info label="Estado" value={t.estado} />
              <Info label="Precio" value={money(t.precio)} />
              <Info label="Reembolsable" value={t.reembolsable ? 'Sí' : 'No'} />
              <Info label="Equipaje incluido" value={t.equipaje_incluido ? 'Sí' : 'No'} />
              <Info label="Cliente ID" value={t.cliente_id} />
              <Info label="Ruta ID" value={t.ruta_id} />
              <Info label="Creado" value={fDate(t.creado_en)} />
            </div>
          </div>
        )}
      </main>
    </>
  )
}

function Info({label, value}:{label:string; value:string}) {
  return (
    <div>
      <div className="text-gray-500">{label}</div>
      <div className="font-medium break-all">{value}</div>
    </div>
  )
}
