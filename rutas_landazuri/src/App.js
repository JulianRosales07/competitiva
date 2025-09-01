import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, List, Search, Plus, Edit, Trash2 } from 'lucide-react';
import TodasLasRutas from './componentes/TodasLasRutas';
import BuscarRutaPorCodigo from './componentes/BuscarRutaPorCodigo';
import AgregarNuevasRutas from './componentes/AgregarNuevasRutas';
import EditarRuta from './componentes/EditarRuta';
import EliminarRuta from './componentes/EliminarRuta';
import { rutasIniciales } from './datos/rutasIniciales';
import { generarIdUnico, filtrarRutasPorEstado } from './utilidades/ayudantesRutas';

const App = () => {
  const [rutas, setRutas] = useState(rutasIniciales);
  const [vistaActual, setVistaActual] = useState('todas');
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('todas');

  const manejarAgregarRuta = (nuevaRuta) => {
    const rutaConId = {
      ...nuevaRuta,
      id: generarIdUnico()
    };
    setRutas(rutasAnteriores => [rutaConId, ...rutasAnteriores]);
  };

  const manejarEditarRuta = (rutaEditada) => {
    setRutas(rutasAnteriores =>
      rutasAnteriores.map(ruta =>
        ruta.id === rutaEditada.id ? rutaEditada : ruta
      )
    );
    setRutaSeleccionada(null);
  };

  const manejarEliminarRuta = (idRuta) => {
    setRutas(rutasAnteriores => rutasAnteriores.filter(ruta => ruta.id !== idRuta));
    setRutaSeleccionada(null);
  };

  const manejarSeleccionarRuta = (ruta) => {
    setRutaSeleccionada(ruta);
    if (vistaActual === 'todas') {
      setVistaActual('editar');
    }
  };

  const manejarCambioVista = (nuevaVista) => {
    setVistaActual(nuevaVista);
    if (nuevaVista !== 'editar' && nuevaVista !== 'eliminar') {
      setRutaSeleccionada(null);
    }
  };

  const rutasFiltradas = filtrarRutasPorEstado(rutas, filtroEstado);

  const opcionesMenu = [
    { id: 'todas', nombre: 'Todas las Rutas', icono: List },
    { id: 'buscar', nombre: 'Buscar por Código', icono: Search },
    { id: 'agregar', nombre: 'Agregar Nueva Ruta', icono: Plus },
    { id: 'editar', nombre: 'Editar Ruta', icono: Edit },
    { id: 'eliminar', nombre: 'Eliminar Ruta', icono: Trash2 }
  ];

  const renderizarContenido = () => {
    switch (vistaActual) {
      case 'todas':
        return (
          <TodasLasRutas 
            rutas={rutasFiltradas} 
            alSeleccionarRuta={manejarSeleccionarRuta}
          />
        );
      case 'buscar':
        return <BuscarRutaPorCodigo rutas={rutas} />;
      case 'agregar':
        return <AgregarNuevasRutas alAgregarRuta={manejarAgregarRuta} />;
      case 'editar':
        return (
          <EditarRuta 
            ruta={rutaSeleccionada}
            alEditarRuta={manejarEditarRuta}
            alCancelar={() => {
              setVistaActual('todas');
              setRutaSeleccionada(null);
            }}
          />
        );
      case 'eliminar':
        return (
          <EliminarRuta 
            ruta={rutaSeleccionada}
            alEliminarRuta={manejarEliminarRuta}
            alCancelar={() => {
              setVistaActual('todas');
              setRutaSeleccionada(null);
            }}
          />
        );
      default:
        return <TodasLasRutas rutas={rutasFiltradas} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Encabezado */}
          <motion.div 
            className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 mb-8 shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <Plane className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Gestión de Rutas Aerolínea
                  </h1>
                  <p className="text-gray-500 font-medium">
                    Sistema de administración de rutas de vuelo
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                  <span className="text-blue-700 font-semibold">
                    Total: {rutas.length} rutas
                  </span>
                </div>
                
                {vistaActual === 'todas' && (
                  <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="todas">Todas</option>
                    <option value="activa">Activas</option>
                    <option value="inactiva">Inactivas</option>
                  </select>
                )}
              </div>
            </div>
          </motion.div>

          {/* Menú de navegación */}
          <motion.div 
            className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 mb-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-2">
              {opcionesMenu.map((opcion, indice) => {
                const IconoOpcion = opcion.icono;
                const estaActiva = vistaActual === opcion.id;
                
                return (
                  <motion.button
                    key={opcion.id}
                    onClick={() => manejarCambioVista(opcion.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      estaActiva
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: indice * 0.1 + 0.3 }}
                  >
                    <IconoOpcion className="w-4 h-4" />
                    <span className="hidden sm:block">{opcion.nombre}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Contenido principal */}
          <motion.div
            key={vistaActual}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderizarContenido()}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;