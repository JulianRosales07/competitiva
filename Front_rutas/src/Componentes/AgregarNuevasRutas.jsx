import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Plane, MapPin, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { validarCodigoRuta } from '../utilidades/ayudantesRutas';

const AgregarNuevasRutas = ({ alAgregarRuta = () => {} }) => {
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
  const [rutaGuardada, setRutaGuardada] = useState(false);

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
      const nuevaRuta = {
        ...datosRuta,
        precio: parseFloat(datosRuta.precio),
        fechaCreacion: new Date()
      };

      alAgregarRuta(nuevaRuta);
      setRutaGuardada(true);
      setGuardando(false);

      setTimeout(() => {
        limpiarFormulario();
        setRutaGuardada(false);
      }, 2000);
    }, 1000);
  };

  const limpiarFormulario = () => {
    setDatosRuta({
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
    setErrores({});
  };

  if (rutaGuardada) {
    return (
      <motion.div 
        className="bg-green-50 rounded-2xl p-8 text-center border border-green-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-700 mb-2">
          ¡Ruta agregada exitosamente!
        </h3>
        <p className="text-green-600">
          La ruta {datosRuta.codigo} ha sido creada correctamente
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.h2 
        className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Plus className="w-8 h-8 text-blue-600" />
        Agregar Nueva Ruta
      </motion.h2>

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

          {datosRuta.codigo && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-blue-700 font-medium">
                Código de ruta generado: <span className="font-bold">{datosRuta.codigo}</span>
              </p>
            </div>
          )}

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
                  Guardando...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Agregar Ruta
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              onClick={limpiarFormulario}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Limpiar
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AgregarNuevasRutas;