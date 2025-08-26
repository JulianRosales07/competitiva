import { Routes, Route, Navigate } from 'react-router-dom'
import TicketsPage from './pages/TicketsPage'
import TicketDetailPage from './pages/TicketDetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TicketsPage />} />
      <Route path="/tiquete/:id" element={<TicketDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
