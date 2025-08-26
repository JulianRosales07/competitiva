import type { Tiquete } from '../types/tiquete';

const API  = (import.meta.env.VITE_API_URL as string).replace(/\/$/, '');
const BASE = import.meta.env.VITE_TICKETS_BASE as string;   // ej: /tiquetes
const URL  = `${API}${BASE}`;

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getAllTiquetes(): Promise<Tiquete[]> {
  return handle(await fetch(`${URL}/obtenerTodos`));
}

export async function getTiqueteById(id: string): Promise<Tiquete> {
  return handle(await fetch(`${URL}/obtenerPorId/${id}`));
}

export async function createTiquete(data: Tiquete): Promise<Tiquete> {
  return handle(await fetch(`${URL}/agregar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }));
}

export async function updateTiquete(id: string, data: Partial<Tiquete>): Promise<Tiquete> {
  return handle(await fetch(`${URL}/putTiquete/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }));
}

export async function deleteTiquete(id: string): Promise<{ ok: boolean } | Tiquete> {
  return handle(await fetch(`${URL}/eliminar/${id}`, { method: 'DELETE' }));
}
