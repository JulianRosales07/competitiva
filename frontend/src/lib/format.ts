export const money = (n: number, currency = 'USD') =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency }).format(n);

export const fDate = (iso: string) =>
  new Date(iso).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
