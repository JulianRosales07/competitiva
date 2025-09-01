export const generarIdUnico = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(precio);
};

export const validarCodigoRuta = (codigo) => {
  const patron = /^[A-Z]{3}-[A-Z]{3}$/;
  return patron.test(codigo);
};

export const buscarRutaPorCodigo = (rutas, codigo) => {
  return rutas.find(ruta => 
    ruta.codigo.toLowerCase().includes(codigo.toLowerCase())
  );
};

export const filtrarRutasPorEstado = (rutas, estado) => {
  if (estado === 'todas') return rutas;
  return rutas.filter(ruta => ruta.estado === estado);
};