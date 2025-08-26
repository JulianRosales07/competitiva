import React from 'react';
import { motion } from 'framer-motion';
import { Plane, MapPin, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { formatearPrecio } from '../utilidades/ayudantesRutas';

const TodasLasRutas = ({ rutas = [], alSeleccionarRuta = () => {} }) => {
  if (rutas.length === 0) {
    return (
      <motion.div 
        className="bg-white rounded-2xl p-8 text-center shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-600 mb-2">
          No hay rutas disponibles
        </h3>
        <p className="text-gray-500">
          Agrega nuevas rutas para comenzar a gestionar los vuelos
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <motion.h2 
        className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Plane className="w-8 h-8 text-blue-600" />
        Todas las Rutas ({rutas.length})
      </motion.h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rutas.map((ruta, indice) => (
          <motion.div
            key={ruta.id}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: indice * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => alSeleccionarRuta(ruta)}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {ruta.codigo}
              </span>
              <div className="flex items-center gap-1">
                {ruta.estado === 'activa' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  ruta.estado === 'activa' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {ruta.estado === 'activa' ? 'Activa' : 'Inactiva'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">{ruta.origen}</span>
                    <Plane className="w-4 h-4 text-blue-500 rotate-90" />
                    <span className="font-semibold text-gray-800">{ruta.destino}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{ruta.codigoOrigen}</span>
                    <span>{ruta.codigoDestino}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{ruta.duracion}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-700">{ruta.distancia}</span>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="font-bold text-green-600 text-lg">
                  {formatearPrecio(ruta.precio)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TodasLasRutas;