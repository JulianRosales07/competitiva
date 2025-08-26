import React, { useState, useEffect } from "react";
import data from "../data/Equipaje.json";
import "../styles/Table.css";

function Maletas() {
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState(data.maletas);

    useEffect(() => {
        setFiltered(
            data.maletas.filter((m) =>
                Object.values(m).some((val) =>
                    val.toString().toLowerCase().includes(search.toLowerCase())
                )
            )
        );
    }, [search]);

    return (
        <div className="table-container">
            <h2 className="title">📦 Información de Maletas</h2>

            {/* Resumen */}
            <p className="summary">
                Número total de maletas: <strong>{filtered.length}</strong>
            </p>

            {/* Buscador */}
            <input
                type="text"
                placeholder="🔍 Buscar maleta por ID o destino..."
                className="search-box"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Tabla */}
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID de Maleta</th>
                        <th>Peso</th>
                        <th>Destino</th>
                        <th>Hora de Despacho</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length > 0 ? (
                        filtered.map((m) => (
                            <tr key={m.id}>
                                <td>{m.id}</td>
                                <td>{m.peso}</td>
                                <td>{m.destino}</td>
                                <td>{m.horaDespacho}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">⚠️ No se encontraron maletas</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Maletas;
