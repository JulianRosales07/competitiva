import { Routes, Route, Navigate } from "react-router-dom";
import EquipajePage from "./pages/equipajePages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<EquipajePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
