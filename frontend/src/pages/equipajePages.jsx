// src/components/equipaje/EquipajeComponents.jsx
import React from 'react';
import { Plus, Minus, Info, AlertTriangle, Check, Luggage } from 'lucide-react';

// Componente para el botón de contador
export const CounterButton = ({ label, value, onChange, min = 0, max = 5, icon }) => (
  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 equipaje-card-hover">
    <div className="flex items-center gap-3">
      {icon && <span className="text-2xl">{icon}</span>}
      <span className="font-medium text-gray-700">{label}</span>
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="equipaje-counter-btn w-10 h-10 rounded-full bg-blue-600 text-white disabled:bg-gray-300 hover:bg-blue-700 flex items-center justify-center"
      >
        <Minus size={16} />
      </button>
      <span className="w-12 text-center font-bold text-xl text-blue-600">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="equipaje-counter-btn w-10 h-10 rounded-full bg-blue-600 text-white disabled:bg-gray-300 hover:bg-blue-700 flex items-center justify-center"
      >
        <Plus size={16} />
      </button>
    </div>
  </div>
);

// Componente para las tarjetas de políticas
export const PolicyCard = ({ type, data, color = "blue" }) => {
  const colorClasses = {
    green: {
      border: "border-green-200",
      bg: "from-green-50 to-white",
      iconBg: "from-green-400 to-green-600",
      textColor: "text-green-600",
      badgeBg: "bg-green-100",
      badgeText: "text-green-700"
    },
    blue: {
      border: "border-blue-200",
      bg: "from-blue-50 to-white",
      iconBg: "from-blue-400 to-blue-600",
      textColor: "text-blue-600",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-700"
    },
    orange: {
      border: "border-orange-200",
      bg: "from-orange-50 to-white",
      iconBg: "from-orange-400 to-orange-600",
      textColor: "text-orange-600",
      badgeBg: "bg-orange-100",
      badgeText: "text-orange-700"
    }
  };

  const classes = colorClasses[color];

  return (
    <div className="equipaje-policy-card equipaje-slide-in">
      <div className={`border-2 ${classes.border} rounded-2xl p-6 h-full bg-gradient-to-br ${classes.bg}`}>
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 bg-gradient-to-br ${classes.iconBg} rounded-xl flex items-center justify-center`}>
            {type === 'especial' ? (
              <AlertTriangle className="text-white" size={28} />
            ) : (
              <Luggage className="text-white" size={28} />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{data.titulo}</h3>
            <p className={`${classes.textColor} font-medium`}>{data.descripcion}</p>
          </div>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Peso máximo:</span>
            <span className={`font-bold ${classes.textColor}`}>{data.peso}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Dimensiones:</span>
            <span className="font-bold">{data.dimensiones}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Cantidad:</span>
            <span className="font-bold">{data.cantidad}</span>
          </div>
          {data.ejemplos && (
            <div className="text-sm">
              <span className="font-medium">Ejemplos:</span>
              <p className="mt-1 text-gray-600">{data.ejemplos}</p>
            </div>
          )}
        </div>
        
        <div className={`mt-6 p-4 ${classes.badgeBg} rounded-xl flex items-center gap-2`}>
          {type === 'mano' && <Check className={classes.textColor} size={20} />}
          {type === 'especial' && <AlertTriangle className={classes.textColor} size={20} />}
          <p className={`${classes.badgeText} font-semibold`}>{data.badge}</p>
        </div>
      </div>
    </div>
  );
};

// Componente para la calculadora de costos
export const CostCalculator = ({ equipaje, destino, precios, onEquipajeChange, onDestinoChange }) => {
  const calcularCosto = () => {
    const preciosDestino = precios[destino];
    const costoFacturado = equipaje.facturado * preciosDestino.facturado;
    const costoEspecial = equipaje.especial * preciosDestino.especial;
    return costoFacturado + costoEspecial;
  };

  return (
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
            onChange={(e) => onDestinoChange(e.target.value)}
            className="equipaje-input w-full p-4 rounded-xl bg-white text-gray-800 font-medium"
          >
            <option value="nacional">🇨🇴 Vuelo Nacional</option>
            <option value="internacional">🌎 Vuelo Internacional</option>
          </select>
        </div>

        <div className="space-y-4">
          <CounterButton
            label="Equipaje de mano"
            value={equipaje.mano}
            onChange={(value) => onEquipajeChange('mano', value)}
            min={1}
            max={1}
            icon="✈️"
          />
          
          <CounterButton
            label="Equipaje facturado"
            value={equipaje.facturado}
            onChange={(value) => onEquipajeChange('facturado', value)}
            icon="🧳"
          />
          
          <CounterButton
            label="Equipaje especial"
            value={equipaje.especial}
            onChange={(value) => onEquipajeChange('especial', value)}
            icon="📦"
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Resumen de costos</h3>
        
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 space-y-6">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <div>
              <span className="text-gray-600">Equipaje de mano</span>
              <span className="text-sm text-gray-500 block">({equipaje.mano} pieza)</span>
            </div>
            <span className="font-bold text-2xl text-green-600">GRATIS</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <div>
              <span className="text-gray-600">Equipaje facturado</span>
              <span className="text-sm text-gray-500 block">({equipaje.facturado} piezas)</span>
            </div>
            <span className="font-bold text-xl">
              ${equipaje.facturado * precios[destino].facturado} USD
            </span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <div>
              <span className="text-gray-600">Equipaje especial</span>
              <span className="text-sm text-gray-500 block">({equipaje.especial} piezas)</span>
            </div>
            <span className="font-bold text-xl">
              ${equipaje.especial * precios[destino].especial} USD
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

        <CostDisclaimer />
      </div>
    </div>
  );
};

// Componente para información adicional
export const CostDisclaimer = () => (
  <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
    <div className="flex items-start gap-3">
      <Info className="text-blue-600 mt-1 flex-shrink-0" size={20} />
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
);

// Componente para el formulario de gestión
export const BaggageForm = ({ reservaData, setReservaData, onSubmit, onCancel }) => (
  <div className="max-w-3xl mx-auto">
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 equipaje-fade-in">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Código de reserva *
            </label>
            <input 
              type="text" 
              value={reservaData.codigo}
              onChange={(e) => setReservaData(prev => ({...prev, codigo: e.target.value.toUpperCase()}))}
              placeholder="Ej: ABC123"
              className="equipaje-input w-full p-4 rounded-xl font-medium"
              maxLength="6"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Apellido del pasajero *
            </label>
            <input 
              type="text" 
              value={reservaData.apellido}
              onChange={(e) => setReservaData(prev => ({...prev, apellido: e.target.value}))}
              placeholder="Apellido principal"
              className="equipaje-input w-full p-4 rounded-xl font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Tipo de equipaje a agregar
          </label>
          <select 
            value={reservaData.tipoEquipaje}
            onChange={(e) => setReservaData(prev => ({...prev, tipoEquipaje: e.target.value}))}
            className="equipaje-input w-full p-4 rounded-xl font-medium"
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
            onChange={(e) => setReservaData(prev => ({...prev, descripcion: e.target.value}))}
            placeholder="Describe tu equipaje especial: dimensiones, características especiales, materiales, etc..."
            className="equipaje-input w-full p-4 rounded-xl resize-none"
            maxLength="500"
          />
          <p className="text-xs text-gray-500 mt-1">
            {reservaData.descripcion.length}/500 caracteres
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            onClick={onSubmit}
            className="equipaje-btn-primary flex-1 text-white py-4 px-8 rounded-xl font-bold text-lg"
          >
            ✅ Agregar a Reserva
          </button>
          
          <button 
            onClick={onCancel}
            className="equipaje-btn-secondary flex-1 text-gray-700 py-4 px-8 rounded-xl font-bold text-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Componente para información adicional
export const AdditionalInfo = () => (
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
        <li>• Instrumentos grandes: mínimo 1 semana antes</li>
      </ul>
    </div>
    
    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
        