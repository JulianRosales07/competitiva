import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { formatearPrecio } from '../utilidades/ayudantesRutas';

const EliminarRuta = ({ ruta = null, alEliminarRuta = () => {}, alCancelar = () => {} }) => {
  const [confirmando, setConfirmando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [rutaEliminada, setRutaEliminada] = useState(false);

  const manejarConfirmacion = () => {
    setConfirmando(true);
  };

  const manejarEliminacion = () => {
    setEliminando(true);

    setTimeout(() => {
      alEliminarRuta(ruta.id);
      setRutaEliminada(true);
      setEliminando(false);

      setTimeout(() => {
        setRutaEliminada(false);
        setConfirmando(false);
        alCancelar();
      }, 2000);
    }, 1000);
  };

  const cancelarEliminacion = () => {
    setConfirmando(false);
  };

  if (!ruta) {
    return (
      <motion.div 
        className="bg-gray-50 rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Trash2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-600 mb-2">
          Selecciona una ruta para eliminar
        </h3>
        <p className="text-gray-500">
          Elige una ruta de la lista para poder eliminarla del sistema
        </p>
      </motion.div>
    );
  }

  if (rutaEliminada) {
    return (
      <motion.div 
        className="bg-green-50 rounded-2xl p-8 text-center border border-green-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-700 mb-2">
          ¡Ruta eliminada exitosamente!
        </h3>
        <p className="text-green-600">
          La ruta {ruta.codigo} ha sido eliminada del sistema
        </p>
      </motion.div>
    );
  }

  if (confirmando) {
    return (
      <div className="space-y-6">
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-bold text-red-600 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8" />
            Confirmar Eliminación
          </h2>
          <motion.button
            onClick={cancelarEliminacion}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
            Cancelar
          </motion.button>
        </motion.div>

        <motion.div 
          className="bg-red-50 border border-red-200 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-800 mb-2">
                ¿Estás seguro de que quieres eliminar esta ruta?
              </h3>
              <p className="text-red-700 mb-4">
                Esta acción no se puede deshacer. La ruta será eliminada permanentemente del sistema.
              </p>

              <div className="bg-white rounded-xl p-4 border border-red-200 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Código de Ruta</p>
                    <p className="font-bold text-gray-800">{ruta.codigo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Ruta</p>
                    <p className="font-semibold text-gray-800">
                      {ruta.origen} → {ruta.destino}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Precio</p>
                    <p className="font-bold text-green-600">
                      {formatearPrecio(ruta.precio)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Estado</p>
                    <p className={`font-semibold ${
                      ruta.estado === 'activa' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {ruta.estado === 'activa' ? 'Activa' : 'Inactiva'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  onClick={manejarEliminacion}
                  disabled={eliminando}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {eliminando ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Eliminando...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      Sí, Eliminar Ruta
                    </>
                  )}
                </motion.button>

                <motion.button
                  onClick={cancelarEliminacion}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancelar
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Trash2 className="w-8 h-8 text-red-600" />
          Eliminar Ruta: {ruta.codigo}
        </h2>
        <motion.button
          onClick={alCancelar}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-300 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5" />
          Cancelar
        </motion.button>
      </motion.div>

      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Información de la Ruta a Eliminar
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Código de Ruta</p>
                <p className="font-bold text-gray-800 text-lg">{ruta.codigo}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Origen</p>
                <p className="font-semibold text-gray-800">
                  {ruta.origen} ({ruta.codigoOrigen})
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Destino</p>
                <p className="font-semibold text-gray-800">
                  {ruta.destino} ({ruta.codigoDestino})
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Duración</p>
                <p className="font-semibold text-gray-800">{ruta.duracion}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Distancia</p>
                <p className="font-semibold text-gray-800">{ruta.distancia}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Precio</p>
                <p className="font-bold text-green-600 text-lg">
                  {formatearPrecio(ruta.precio)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Estado Actual</p>
                <p className={`font-semibold ${
                  ruta.estado === 'activa' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {ruta.estado === 'activa' ? 'Activa' : 'Inactiva'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Fecha de Creación</p>
                <p className="font-semibold text-gray-800">
                  {ruta.fechaCreacion ? new Date(ruta.fechaCreacion).toLocaleDateString('es-ES') : 'No disponible'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">
                Advertencia
              </h4>
              <p className="text-yellow-700 text-sm">
                Una vez eliminada, esta ruta no podrá ser recuperada. Asegúrate de que realmente deseas eliminar esta información.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            onClick={manejarConfirmacion}
            className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trash2 className="w-5 h-5" />
            Eliminar Ruta
          </motion.button>

          <motion.button
            onClick={alCancelar}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancelar
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default EliminarRuta;