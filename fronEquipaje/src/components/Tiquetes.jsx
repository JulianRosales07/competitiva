import React, { useState, useEffect } from "react";
import data from "../data/Equipaje.json";
import "../styles/Table.css"; // importamos los estilos

function Tiquetes() {
    const [tiquetes, setTiquetes] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setTiquetes(data.tiquetes);
    }, []);

    // filtro dinámico por id, origen o destino
    const filtered = tiquetes.filter(
        (t) =>
            t.id.toLowerCase().includes(search.toLowerCase()) ||
            t.origen.toLowerCase().includes(search.toLowerCase()) ||
            t.destino.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="card">
            <h2>📑 Información de Tiquetes</h2>

            <input
                type="text"
                placeholder="🔍 Buscar por ID, Origen o Destino..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Número de Tiquete</th>
                        <th>Fecha de Compra</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Hora de Salida</th>
                        <th>Hora de Llegada</th>
                        <th>Cantidad de Maletas</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((t) => (
                        <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.fechaCompra}</td>
                            <td>{t.origen}</td>
                            <td>{t.destino}</td>
                            <td>{t.horaSalida}</td>
                            <td>{t.horaLlegada}</td>
                            <td>{t.maletas}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tiquetes;
