import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plane, MapPin, Clock, DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { buscarRutaPorCodigo, formatearPrecio } from '../utilidades/ayudantesRutas';

const BuscarRutaPorCodigo = ({ rutas = [] }) => {
  const [codigoBusqueda, setCodigoBusqueda] = useState('');
  const [rutaEncontrada, setRutaEncontrada] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [noEncontrada, setNoEncontrada] = useState(false);

  const manejarBusqueda = (e) => {
    e.preventDefault();
    if (!codigoBusqueda.trim()) return;

    setBuscando(true);
    setNoEncontrada(false);
    setRutaEncontrada(null);

    setTimeout(() => {
      const ruta = buscarRutaPorCodigo(rutas, codigoBusqueda);
      if (ruta) {
        setRutaEncontrada(ruta);
      } else {
        setNoEncontrada(true);
      }
      setBuscando(false);
    }, 500);
  };

  const limpiarBusqueda = () => {
    setCodigoBusqueda('');
    setRutaEncontrada(null);
    setNoEncontrada(false);
  };

  return (
    <div className="space-y-6">
      <motion.h2 
        className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Search className="w-8 h-8 text-blue-600" />
        Buscar Ruta por Código
      </motion.h2>

      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <form onSubmit={manejarBusqueda} className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={codigoBusqueda}
                onChange={(e) => setCodigoBusqueda(e.target.value.toUpperCase())}
                placeholder="Ingresa el código de ruta (ej: BOG-MIA)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>
            <motion.button
              type="submit"
              disabled={!codigoBusqueda.trim() || buscando}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
              {buscando ? 'Buscando...' : 'Buscar'}
            </motion.button>
          </div>

          {(rutaEncontrada || noEncontrada) && (
            <motion.button
              type="button"
              onClick={limpiarBusqueda}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Limpiar búsqueda
            </motion.button>
          )}
        </form>
      </motion.div>

      {buscando && (
        <motion.div 
          className="bg-blue-50 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-blue-700 font-medium">Buscando ruta...</p>
        </motion.div>
      )}

      {noEncontrada && (
        <motion.div 
          className="bg-red-50 rounded-2xl p-8 text-center border border-red-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-red-700 mb-2">
            Ruta no encontrada
          </h3>
          <p className="text-red-600">
            No se encontró ninguna ruta con el código "{codigoBusqueda}"
          </p>
        </motion.div>
      )}

      {rutaEncontrada && (
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg border border-green-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Ruta Encontrada</h3>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              {rutaEncontrada.codigo}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Origen</p>
                  <p className="font-semibold text-gray-800">
                    {rutaEncontrada.origen} ({rutaEncontrada.codigoOrigen})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Destino</p>
                  <p className="font-semibold text-gray-800">
                    {rutaEncontrada.destino} ({rutaEncontrada.codigoDestino})
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Duración</p>
                  <p className="font-semibold text-gray-800">{rutaEncontrada.duracion}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Precio</p>
                  <p className="font-bold text-green-600 text-lg">
                    {formatearPrecio(rutaEncontrada.precio)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {rutaEncontrada.estado === 'activa' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className={`font-medium ${
                  rutaEncontrada.estado === 'activa' ? 'text-green-600' : 'text-red-600'
                }`}>
                  Estado: {rutaEncontrada.estado === 'activa' ? 'Activa' : 'Inactiva'}
                </span>
              </div>
              <span className="text-gray-500 text-sm">
                Distancia: {rutaEncontrada.distancia}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BuscarRutaPorCodigo;