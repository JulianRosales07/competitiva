import type { Tiquete } from "../types/tiquete";

export const TIQUETES_MOCK: Tiquete[] = [
  { cliente_id: "68aa7b1d693fbed42fa470d8", ruta_id: "68aa7c4a693fbed42fa470df", numero: "AV123", fecha_vuelo: "2025-09-01T09:00:00Z", clase: "Económica", reembolsable: false, asiento: "12A", puerta_embarque: "B23", precio: 350.75, equipaje_incluido: true, estado: "confirmado", creado_en: "2025-08-25T16:00:00Z" },
  { cliente_id: "68aa7b1d693fbed42fa470d9", ruta_id: "68aa7c4a693fbed42fa470e0", numero: "LA456", fecha_vuelo: "2025-09-05T15:30:00Z", clase: "Ejecutiva", reembolsable: true, asiento: "5C", puerta_embarque: "C12", precio: 750.00, equipaje_incluido: true, estado: "confirmado", creado_en: "2025-08-25T16:00:00Z" },
  { cliente_id: "68aa7b1d693fbed42fa470da", ruta_id: "68aa7c4a693fbed42fa470e2", numero: "IB789", fecha_vuelo: "2025-09-10T22:00:00Z", clase: "Económica", reembolsable: false, asiento: "18F", puerta_embarque: "D07", precio: 280.00, equipaje_incluido: false, estado: "pendiente", creado_en: "2025-08-25T16:00:00Z" },
  { cliente_id: "68aa7b1d693fbed42fa470db", ruta_id: "68aa7c4a693fbed42fa470e2", numero: "AF321", fecha_vuelo: "2025-09-12T06:15:00Z", clase: "Ejecutiva", reembolsable: true, asiento: "3B", puerta_embarque: "E20", precio: 920.50, equipaje_incluido: true, estado: "abordado", creado_en: "2025-08-25T16:00:00Z" },
  { cliente_id: "68aa7b1d693fbed42fa470dc", ruta_id: "68aa7c4a693fbed42fa470e3", numero: "CO654", fecha_vuelo: "2025-09-20T11:45:00Z", clase: "Económica", reembolsable: false, asiento: "20D", puerta_embarque: "A01", precio: 310.00, equipaje_incluido: false, estado: "pendiente", creado_en: "2025-08-25T16:00:00Z" }
];
