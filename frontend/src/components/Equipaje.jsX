import React, { useState } from 'react';
import { Luggage, Calculator, Info, Plus, Minus, AlertTriangle, Check } from 'lucide-react';

const Equipaje = () => {
    const [activeTab, setActiveTab] = useState('politicas');
    const [equipajeSeleccionado, setEquipajeSeleccionado] = useState({
        mano: 1,
        facturado: 0,
        especial: 0
    });
    const [destino, setDestino] = useState('nacional');
    const [reservaData, setReservaData] = useState({
        codigo: '',
        apellido: '',
        tipoEquipaje: 'facturado',
        descripcion: ''
    });

    // Datos de configuración - en proyecto real vendrían de API
    const precios = {
        nacional: {
            facturado: 25,
            especial: 150
        },
        internacional: {
            facturado: 45,
            especial: 200
        }
    };

    const politicas = {
        mano: {
            peso: "10 kg",
            dimensiones: "55 x 40 x 23 cm",
            cantidad: "1 pieza incluida",
            descripcion: "Permitido llevar en cabina"
        },
        facturado: {
            peso: "23 kg",
            dimensiones: "158 cm lineales",
            cantidad: "Primera pieza tiene costo adicional",
            descripcion: "Se transporta en bodega del avión"
        },
        especial: {
            peso: "Hasta 32 kg",
            dimensiones: "Varía según el artículo",
            ejemplos: "Instrumentos musicales, equipos deportivos, mascotas",
            descripcion: "Requiere autorización y manejo especial"
        }
    };

    const calcularCosto = () => {
        const preciosDestino = precios[destino];
        const costoFacturado = equipajeSeleccionado.facturado * preciosDestino.facturado;
        const costoEspecial = equipajeSeleccionado.especial * preciosDestino.especial;
        return costoFacturado + costoEspecial;
    };

    const handleAgregarEquipaje = () => {
        if (!reservaData.codigo || !reservaData.apellido) {
            alert('Por favor complete el código de reserva y apellido');
            return;
        }
        // Aquí iría la lógica para conectar con el backend
        alert(`Equipaje agregado exitosamente a la reserva ${reservaData.codigo}`);
        setReservaData({
            codigo: '',
            apellido: '',
            tipoEquipaje: 'facturado',
            descripcion: ''
        });
    };

    const TabButton = ({ id, label, icon: Icon, isActive }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${isActive
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                }`}
        >
            <Icon size={20} />
            {label}
        </button>
    );

    const Counter = ({ label, value, onChange, min = 0, max = 5 }) => (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <span className="font-medium text-gray-700">{label}</span>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onChange(Math.max(min, value - 1))}
                    disabled={value <= min}
                    className="w-10 h-10 rounded-full bg-blue-600 text-white disabled:bg-gray-300 hover:bg-blue-700 transition-all duration-200 flex items-center justify-center hover:scale-110 disabled:hover:scale-100"
                >
                    <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold text-xl text-blue-600">{value}</span>
                <button
                    onClick={() => onChange(Math.min(max, value + 1))}
                    disabled={value >= max}
                    className="w-10 h-10 rounded-full bg-blue-600 text-white disabled:bg-gray-300 hover:bg-blue-700 transition-all duration-200 flex items-center justify-center hover:scale-110 disabled:hover:scale-100"
                >
                    <Plus size={16} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center gap-4 mb-6 p-4 bg-white rounded-2xl shadow-lg">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                            <Luggage className="text-white" size={32} />
                        </div>
                        <div className="text-left">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                Gestión de Equipaje
                            </h1>
                            <p className="text-gray-600 text-lg">SkyLine Airways</p>
                        </div>
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Gestiona tu equipaje de manera inteligente. Consulta políticas, calcula costos y administra tus maletas con total transparencia.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    <TabButton id="politicas" label="Políticas" icon={Info} isActive={activeTab === 'politicas'} />
                    <TabButton id="calculadora" label="Calculadora" icon={Calculator} isActive={activeTab === 'calculadora'} />
                    <TabButton id="agregar" label="Gestionar" icon={Plus} isActive={activeTab === 'agregar'} />
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Políticas Tab */}
                    {activeTab === 'politicas' && (
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-3">Políticas de Equipaje</h2>
                                <p className="text-gray-600">Conoce todas las regulaciones y límites para tu equipaje</p>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Equipaje de Mano */}
                                <div className="group hover:scale-105 transition-all duration-300">
                                    <div className="border-2 border-green-200 rounded-2xl p-6 h-full bg-gradient-to-br from-green-50 to-white">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                                                <Luggage className="text-white" size={28} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">Equipaje de Mano</h3>
                                                <p className="text-green-600 font-medium">{politicas.mano.descripcion}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 text-gray-700">
                                            <div className="flex justify-between">
                                                <span className="font-medium">Peso máximo:</span>
                                                <span className="font-bold text-green-600">{politicas.mano.peso}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium">Dimensiones:</span>
                                                <span className="font-bold">{politicas.mano.dimensiones}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium">Cantidad:</span>
                                                <span className="font-bold">{politicas.mano.cantidad}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 p-4 bg-green-100 rounded-xl flex items-center gap-2">
                                            <Check className="text-green-600" size={20} />
                                            <p className="text-green-700 font-semibold">Incluido sin costo</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Equipaje Facturado */}
                                <div className="group hover:scale-105 transition-all duration-300">
                                    <div className="border-2 border-blue-200 rounded-2xl p-6 h-full bg-gradient-to-br from-blue-50 to-white">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                                                <Luggage className="text-white" size={28} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">Equipaje Facturado</h3>
                                                <p className="text-blue-600 font-medium">{politicas.facturado.descripcion}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 text-gray-700">
                                            <div className="flex justify-between">
                                                <span className="font-medium">Peso máximo:</span>
                                                <span className="font-bold text-blue-600">{politicas.facturado.peso}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium">Dimensiones:</span>
                                                <span className="font-bold">{politicas.facturado.dimensiones}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium">Cantidad:</span>
                                                <span className="font-bold">{politicas.facturado.cantidad}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 p-4 bg-blue-100 rounded-xl">
                                            <p className="text-blue-700 font-semibold">💰 Costo adicional aplicable</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Equipaje Especial */}
                                <div className="group hover:scale-105 transition-all duration-300">
                                    <div className="border-2 border-orange-200 rounded-2xl p-6 h-full bg-gradient-to-br from-orange-50 to-white">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                                                <AlertTriangle className="text-white" size={28} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800">Equipaje Especial</h3>
                                                <p className="text-orange-600 font-medium">{politicas.especial.descripcion}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 text-gray-700">
                                            <div className="flex justify-between">
                                                <span className="font-medium">Peso máximo:</span>
                                                <span className="font-bold text-orange-600">{politicas.especial.peso}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium">Dimensiones:</span>
                                                <span className="font-bold">{politicas.especial.dimensiones}</span>
                                            </div>
                                            <div className="text-sm">
                                                <span className="font-medium">Ejemplos:</span>
                                                <p className="mt-1 text-gray-600">{politicas.especial.ejemplos}</p>
                                            </div>
                                        </div>

                                        <div className="mt-6 p-4 bg-orange-100 rounded-xl flex items-center gap-2">
                                            <AlertTriangle className="text-orange-600" size={20} />
                                            <p className="text-orange-700 font-semibold">Requiere autorización previa</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Restricciones */}
                            <div className="mt-12 p-8 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border-2 border-red-200">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-red-800 mb-2">⚠️ Artículos Prohibidos</h3>
                                    <p className="text-red-600">Los siguientes artículos no están permitidos en ningún tipo de equipaje</p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-white p-4 rounded-xl shadow-sm">
                                        <h4 className="font-semibold text-red-700 mb-2">Sustancias Peligrosas</h4>
                                        <ul className="text-sm text-red-600 space-y-1">
                                            <li>• Líquidos inflamables</li>
                                            <li>• Materiales explosivos</li>
                                            <li>• Sustancias tóxicas</li>
                                            <li>• Gases comprimidos</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white p-4 rounded-xl shadow-sm">
                                        <h4 className="font-semibold text-red-700 mb-2">Armas y Objetos</h4>
                                        <ul className="text-sm text-red-600 space-y-1">
                                            <li>• Armas de fuego</li>
                                            <li>• Objetos punzocortantes</li>
                                            <li>• Herramientas pesadas</li>
                                            <li>• Objetos contundentes</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white p-4 rounded-xl shadow-sm">
                                        <h4 className="font-semibold text-red-700 mb-2">Electrónicos</h4>
                                        <ul className="text-sm text-red-600 space-y-1">
                                            <li>• Baterías dañadas</li>
                                            <li>• Dispositivos con litio</li>
                                            <li>• Equipos magnéticos</li>
                                            <li>• Radioactivos</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white p-4 rounded-xl shadow-sm">
                                        <h4 className="font-semibold text-red-700 mb-2">Otros</h4>
                                        <ul className="text-sm text-red-600 space-y-1">
                                            <li>• Mercancías perecederas</li>
                                            <li>• Dinero en efectivo</li>
                                            <li>• Documentos importantes</li>
                                            <li>• Medicamentos vitales</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Calculadora Tab */}
                    {activeTab === 'calculadora' && (
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-3">Calculadora de Costos</h2>
                                <p className="text-gray-600">Calcula el costo de tu equipaje adicional</p>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Configura tu equipaje</h3>

                                    {/* Selector de destino */}
                                    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
                                        <label className="block text-sm font-bold text-gray-700 mb-3">
                                            Tipo de vuelo
                                        </label>
                                        <select
                                            value={destino}
                                            onChange={(e) => setDestino(e.target.value)}
                                            className="w-full p-4 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 bg-white text-gray-800 font-medium"
                                        >
                                            <option value="nacional">🇨🇴 Vuelo Nacional</option>
                                            <option value="internacional">🌎 Vuelo Internacional</option>
                                        </select>
                                    </div>

                                    <div className="space-y-4">
                                        <Counter
                                            label="✈️ Equipaje de mano"
                                            value={equipajeSeleccionado.mano}
                                            onChange={(value) => setEquipajeSeleccionado(prev => ({ ...prev, mano: value }))}
                                            min={1}
                                            max={1}
                                        />

                                        <Counter
                                            label="🧳 Equipaje facturado"
                                            value={equipajeSeleccionado.facturado}
                                            onChange={(value) => setEquipajeSeleccionado(prev => ({ ...prev, facturado: value }))}
                                        />

                                        <Counter
                                            label="📦 Equipaje especial"
                                            value={equipajeSeleccionado.especial}
                                            onChange={(value) => setEquipajeSeleccionado(prev => ({ ...prev, especial: value }))}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Resumen de costos</h3>

                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 space-y-6">
                                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                            <div>
                                                <span className="text-gray-600">Equipaje de mano</span>
                                                <span className="text-sm text-gray-500 block">({equipajeSeleccionado.mano} pieza)</span>
                                            </div>
                                            <span className="font-bold text-2xl text-green-600">GRATIS</span>
                                        </div>

                                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                            <div>
                                                <span className="text-gray-600">Equipaje facturado</span>
                                                <span className="text-sm text-gray-500 block">({equipajeSeleccionado.facturado} piezas)</span>
                                            </div>
                                            <span className="font-bold text-xl">
                                                ${equipajeSeleccionado.facturado * precios[destino].facturado} USD
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                            <div>
                                                <span className="text-gray-600">Equipaje especial</span>
                                                <span className="text-sm text-gray-500 block">({equipajeSeleccionado.especial} piezas)</span>
                                            </div>
                                            <span className="font-bold text-xl">
                                                ${equipajeSeleccionado.especial * precios[destino].especial} USD
                                            </span>
                                        </div>

                                        <div className="bg-white rounded-xl p-6 shadow-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="text-2xl font-bold text-gray-800">Total a pagar:</span>
                                                <span className="text-3xl font-bold text-blue-600">
                                                    ${calcularCosto()} USD
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                        <div className="flex items-start gap-3">
                                            <Info className="text-blue-600 mt-1" size={20} />
                                            <div>
                                                <p className="text-blue-800 font-semibold mb-1">Información importante</p>
                                                <p className="text-blue-700 text-sm leading-relaxed">
                                                    Los precios mostrados son referenciales y pueden variar según la temporada,
                                                    disponibilidad y condiciones especiales. Los costos finales se confirman durante
                                                    el proceso de reserva o check-in.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Gestionar Equipaje Tab */}
                    {activeTab === 'agregar' && (
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-3">Gestionar Equipaje</h2>
                                <p className="text-gray-600">Agrega o modifica equipaje en tu reserva existente</p>
                            </div>

                            <div className="max-w-3xl mx-auto">
                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                                    Código de reserva *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={reservaData.codigo}
                                                    onChange={(e) => setReservaData(prev => ({ ...prev, codigo: e.target.value.toUpperCase() }))}
                                                    placeholder="Ej: ABC123"
                                                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 font-medium"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                                    Apellido del pasajero *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={reservaData.apellido}
                                                    onChange={(e) => setReservaData(prev => ({ ...prev, apellido: e.target.value }))}
                                                    placeholder="Apellido principal"
                                                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                                Tipo de equipaje a agregar
                                            </label>
                                            <select
                                                value={reservaData.tipoEquipaje}
                                                onChange={(e) => setReservaData(prev => ({ ...prev, tipoEquipaje: e.target.value }))}
                                                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 font-medium"
                                            >
                                                <option value="facturado">🧳 Equipaje facturado adicional</option>
                                                <option value="instrumento">🎸 Equipaje especial - Instrumentos musicales</option>
                                                <option value="deportivo">⚽ Equipaje especial - Equipos deportivos</option>
                                                <option value="mascota">🐕 Equipaje especial - Mascotas</option>
                                                <option value="otro">📦 Equipaje especial - Otro</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                                Descripción del equipaje (opcional)
                                            </label>
                                            <textarea
                                                rows="4"
                                                value={reservaData.descripcion}
                                                onChange={(e) => setReservaData(prev => ({ ...prev, descripcion: e.target.value }))}
                                                placeholder="Describe tu equipaje especial: dimensiones, características especiales, etc..."
                                                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 resize-none"
                                            />
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                            <button
                                                onClick={handleAgregarEquipaje}
                                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                            >
                                                ✅ Agregar a Reserva
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setActiveTab('politicas');
                                                    setReservaData({
                                                        codigo: '',
                                                        apellido: '',
                                                        tipoEquipaje: 'facturado',
                                                        descripcion: ''
                                                    });
                                                }}
                                                className="flex-1 bg-gray-200 text-gray-700 py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all duration-200"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Información adicional */}
                                <div className="mt-8 grid md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                                        <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                                            <AlertTriangle size={20} />
                                            Tiempos importantes
                                        </h4>
                                        <ul className="text-yellow-700 space-y-2 text-sm">
                                            <li>• Equipaje adicional: mínimo 24h antes del vuelo</li>
                                            <li>• Equipaje especial: mínimo 48h antes del vuelo</li>
                                            <li>• Mascotas: mínimo 72h antes del vuelo</li>
                                        </ul>
                                    </div>

                                    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                                        <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                                            <Check size={20} />
                                            Confirmación
                                        </h4>
                                        <ul className="text-green-700 space-y-2 text-sm">
                                            <li>• Recibirás confirmación por email</li>
                                            <li>• Pago procesado automáticamente</li>
                                            <li>• Cambios permitidos hasta 12h antes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Equipaje;