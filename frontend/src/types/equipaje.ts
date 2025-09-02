export interface Equipaje {
    id: string;
    codigo: string;
    pasajero: string;
    vuelo: string;
    destino: string;
    peso: number;
    categoria: CategoriaEquipaje;
    descripcion?: string;
    estado: EstadoEquipaje;
    ubicacion: string;
    fechaRegistro: Date;
    fechaActualizacion: Date;
    notas?: string;
}

export type EstadoEquipaje = 'registrado' | 'en-transito' | 'entregado' | 'perdido';

export type CategoriaEquipaje = 'equipaje-mano' | 'equipaje-bodega' | 'equipaje-especial';

export interface FiltrosEquipaje {
    estado?: EstadoEquipaje;
    vuelo?: string;
    pasajero?: string;
    fechaDesde?: Date;
    fechaHasta?: Date;
}

export interface EstadisticasEquipaje {
    total: number;
    registrados: number;
    enTransito: number;
    entregados: number;
    perdidos: number;
}

export interface FormularioEquipaje {
    codigo: string;
    pasajero: string;
    vuelo: string;
    destino: string;
    peso: string;
    categoria: CategoriaEquipaje | '';
    descripcion: string;
}

export interface ActualizarEquipaje {
    estado: EstadoEquipaje;
    ubicacion: string;
    notas: string;
}
