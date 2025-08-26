export type EstadoTiquete = 'confirmado' | 'pendiente' | 'abordado' | string;
export type ClaseTiquete  = 'Económica' | 'Ejecutiva' | string;

export interface Tiquete {
  _id?: string;
  cliente_id: string;
  ruta_id: string;
  numero: string;
  fecha_vuelo: string;    // ISO
  clase: ClaseTiquete;
  reembolsable: boolean;
  asiento: string;
  puerta_embarque: string;
  precio: number;
  equipaje_incluido: boolean;
  estado: EstadoTiquete;
  creado_en: string;      // ISO
}
