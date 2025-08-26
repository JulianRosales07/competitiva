import TicketsList from '../components/TicketsList'

export default function TicketsPage() {
  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Tiquetes ✈️</h1>
        <p className="text-sm text-gray-600">Vista con datos de prueba</p>
      </header>
      <TicketsList />
    </main>
  )
}
