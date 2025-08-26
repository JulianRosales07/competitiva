import type { Tiquete } from "../types/tiquete";
export function ticketId(t: Tiquete) {
  return t._id ?? `${t.numero}--${t.asiento}`;
}
