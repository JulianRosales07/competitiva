import React, { useState, useEffect } from "react";
import data from "../data/Equipaje.json";
import "../styles/Table.css";

function Tiquetes() {
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState(data.tiquetes);

    useEffect(() => {
        setFiltered(
            data.tiquetes.filter((t) =>
                Object.values(t).some((val) =>
                    val.toString().toLowerCase().includes(search.toLowerCase())
                )
            )
        );
    }, [search]);

    return (
        <div className="table-container">
            <h2 className="title">Información de Tiquetes</h2>
            <input
                type="text"
                placeholder="Buscar por ID, Origen o Destino..."
                className="search-box"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
