import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Save, X, MapPin, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { validarCodigoRuta, formatearPrecio } from '../utilidades/ayudantesRutas';

const EditarRuta = ({ ruta = null, alEditarRuta = () => {}, alCancelar = () => {} }) => {
  const [datosRuta, setDatosRuta] = useState({
    codigo: '',
    origen: '',
    destino: '',
    codigoOrigen: '',
    codigoDestino: '',
    duracion: '',
    distancia: '',
    precio: '',
    estado: 'activa'
  });

  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [rutaEditada, setRutaEditada] = useState(false);

  useEffect(() => {
    if (ruta) {
      setDatosRuta({
        codigo: ruta.codigo || '',
        origen: ruta.origen || '',
        destino: ruta.destino || '',
        codigoOrigen: ruta.codigoOrigen || '',
        codigoDestino: ruta.codigoDestino || '',
        duracion: ruta.duracion || '',
        distancia: ruta.distancia || '',
        precio: ruta.precio?.toString() || '',
        estado: ruta.estado || 'activa'
      });
    }
  }, [ruta]);

  const manejarCambio = (campo, valor) => {
    setDatosRuta(prev => ({
      ...prev,
      [campo]: valor
    }));

    if (errores[campo]) {
      setErrores(prev => ({
        ...prev,
        [campo]: ''
      }));
    }

    if (campo === 'codigoOrigen' || campo === 'codigoDestino') {
      const codigoCompleto = campo === 'codigoOrigen' 
        ? `${valor}-${datosRuta.codigoDestino}`
        : `${datosRuta.codigoOrigen}-${valor}`;
      
      if (valor.length === 3 && datosRuta[campo === 'codigoOrigen' ? 'codigoDestino' : 'codigoOrigen'].length === 3) {
        setDatosRuta(prev => ({
          ...prev,
          codigo: codigoCompleto
        }));
      }
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!datosRuta.origen.trim()) {
      nuevosErrores.origen = 'El origen es obligatorio';
    }

    if (!datosRuta.destino.trim()) {
      nuevosErrores.destino = 'El destino es obligatorio';
    }

    if (!datosRuta.codigoOrigen.trim() || datosRuta.codigoOrigen.length !== 3) {
      nuevosErrores.codigoOrigen = 'Código de origen debe tener 3 letras';
    }

    if (!datosRuta.codigoDestino.trim() || datosRuta.codigoDestino.length !== 3) {
      nuevosErrores.codigoDestino = 'Código de destino debe tener 3 letras';
    }

    if (!datosRuta.duracion.trim()) {
      nuevosErrores.duracion = 'La duración es obligatoria';
    }

    if (!datosRuta.distancia.trim()) {
      nuevosErrores.distancia = 'La distancia es obligatoria';
    }

    if (!datosRuta.precio || datosRuta.precio <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0';
    }

    if (!validarCodigoRuta(datosRuta.codigo)) {
      nuevosErrores.codigo = 'Formato de código inválido';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    setGuardando(true);

    setTimeout(() => {
      const rutaActualizada = {
        ...ruta,
        ...datosRuta,
        precio: parseFloat(datosRuta.precio),
        fechaActualizacion: new Date()
      };

      alEditarRuta(rutaActualizada);
      setRutaEditada(true);
      setGuardando(false);

      setTimeout(() => {
        setRutaEditada(false);
        alCancelar();
      }, 2000);
    }, 1000);
  };

  if (!ruta) {
    return (
      <motion.div 
        className="bg-gray-50 rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Edit className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-600 mb-2">
          Selecciona una ruta para editar
        </h3>
        <p className="text-gray-500">
          Elige una ruta de la lista para poder modificar sus datos
        </p>
      </motion.div>
    );
  }

  if (rutaEditada) {
    return (
      <motion.div 
        className="bg-green-50 rounded-2xl p-8 text-center border border-green-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-700 mb-2">
          ¡Ruta editada exitosamente!
        </h3>
        <p className="text-green-600">
          Los cambios en la ruta {datosRuta.codigo} han sido guardados
        </p>
      </motion.div>
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
          <Edit className="w-8 h-8 text-blue-600" />
          Editar Ruta: {ruta.codigo}
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
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <form onSubmit={manejarEnvio} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ciudad de Origen
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={datosRuta.origen}
                    onChange={(e) => manejarCambio('origen', e.target.value)}
                    placeholder="Ej: Bogotá"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errores.origen 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errores.origen && (
                  <p className="text-red-500 text-sm mt-1">{errores.origen}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Código de Origen
                </label>
                <input
                  type="text"
                  value={datosRuta.codigoOrigen}
                  onChange={(e) => manejarCambio('codigoOrigen', e.target.value.toUpperCase())}
                  placeholder="BOG"
                  maxLength="3"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errores.codigoOrigen 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
                {errores.codigoOrigen && (
                  <p className="text-red-500 text-sm mt-1">{errores.codigoOrigen}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duración del Vuelo
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={datosRuta.duracion}
                    onChange={(e) => manejarCambio('duracion', e.target.value)}
                    placeholder="Ej: 4h 30m"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errores.duracion 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errores.duracion && (
                  <p className="text-red-500 text-sm mt-1">{errores.duracion}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ciudad de Destino
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={datosRuta.destino}
                    onChange={(e) => manejarCambio('destino', e.target.value)}
                    placeholder="Ej: Miami"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errores.destino 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errores.destino && (
                  <p className="text-red-500 text-sm mt-1">{errores.destino}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Código de Destino
                </label>
                <input
                  type="text"
                  value={datosRuta.codigoDestino}
                  onChange={(e) => manejarCambio('codigoDestino', e.target.value.toUpperCase())}
                  placeholder="MIA"
                  maxLength="3"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errores.codigoDestino 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
                {errores.codigoDestino && (
                  <p className="text-red-500 text-sm mt-1">{errores.codigoDestino}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Precio (COP)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={datosRuta.precio}
                    onChange={(e) => manejarCambio('precio', e.target.value)}
                    placeholder="450000"
                    min="0"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errores.precio 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errores.precio && (
                  <p className="text-red-500 text-sm mt-1">{errores.precio}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Distancia
              </label>
              <input
                type="text"
                value={datosRuta.distancia}
                onChange={(e) => manejarCambio('distancia', e.target.value)}
                placeholder="Ej: 2847 km"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errores.distancia 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errores.distancia && (
                <p className="text-red-500 text-sm mt-1">{errores.distancia}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estado de la Ruta
              </label>
              <select
                value={datosRuta.estado}
                onChange={(e) => manejarCambio('estado', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="activa">Activa</option>
                <option value="inactiva">Inactiva</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <p className="text-blue-700 font-medium">
                Código de ruta: <span className="font-bold">{datosRuta.codigo}</span>
              </p>
              <p className="text-blue-600">
                Precio actual: <span className="font-bold">{formatearPrecio(parseFloat(datosRuta.precio) || 0)}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <motion.button
              type="submit"
              disabled={guardando}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {guardando ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Guardando cambios...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Guardar Cambios
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              onClick={alCancelar}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <X className="w-5 h-5" />
              Cancelar
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditarRuta;