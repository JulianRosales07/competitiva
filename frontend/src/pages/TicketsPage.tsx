import Navbar from '../layout/Navbar'
import Breadcrumbs from '../components/Breadcrumbs'
import TicketsList from '../components/TicketsList'

export default function TicketsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-6 max-w-7xl mx-auto">
        <div className="mb-4">
          <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Tiquetes' }]} />
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Listado de tiquetes</h2>
            <span className="text-xs text-gray-500">Mock</span>
          </div>
          <div className="card-body">
            <TicketsList />
          </div>
        </div>
      </main>
    </>
  )
}
