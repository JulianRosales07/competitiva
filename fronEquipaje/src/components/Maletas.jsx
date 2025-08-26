import React, { useEffect, useState } from "react";
import data from "../data/Equipaje.json";

function Maletas() {
    const [maletas, setMaletas] = useState([]);

    useEffect(() => {
        const todas = data.flatMap(item =>
            item.maletas.map(m => ({ ...m, tiquete_id: item.tiquete_id }))
        );
        setMaletas(todas);
    }, []);

    return (
        <div>
            <h2>Información de Maletas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tiquete ID</th>
                        <th>Maleta ID</th>
                        <th>Peso</th>
                        <th>Destino</th>
                        <th>Hora de Despacho</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {maletas.map((m, index) => (
                        <tr key={index}>
                            <td>{m.tiquete_id}</td>
                            <td>{m.maleta_id}</td>
                            <td>{m.peso} {m.unidad}</td>
                            <td>{m.destino}</td>
                            <td>{m.hora_despacho}</td>
                            <td>{m.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Maletas;
