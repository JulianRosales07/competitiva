import React, { useEffect, useState } from "react";
import data from "../data/Equipaje.json";

function Tiquetes() {
    const [tiquetes, setTiquetes] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        setTiquetes(data);
    }, []);

    const filtrados = tiquetes.filter(item =>
        item.tiquete_id.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.origen.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.destino.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div>
            <h2>Información de Tiquetes</h2>
            <input
                type="text"
                placeholder="Buscar por ID, Origen o Destino..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
            />
            <table>
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
                    {filtrados.map((item) => (
                        <tr key={item.tiquete_id}>
                            <td>{item.tiquete_id}</td>
                            <td>{item.fecha_compra}</td>
                            <td>{item.origen}</td>
                            <td>{item.destino}</td>
                            <td>{item.hora_salida}</td>
                            <td>{item.hora_llegada}</td>
                            <td>{item.maletas.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tiquetes;
