import { useEffect, useState } from "react";
import data from "../data/Equipaje.json";
import "../styles/Table.css";

function Maletas() {
    const [maletas, setMaletas] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (data && data.maletas) {
            setMaletas(data.maletas);
        }
    }, []);

    const filteredMaletas = maletas.filter(
        (m) =>
            m.id.toLowerCase().includes(search.toLowerCase()) ||
            m.destino.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h2>Información de Maletas</h2>
            <input
                type="text"
                placeholder="Buscar por ID o Destino..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-box"
            />
            <table>
                <thead>
                    <tr>
                        <th>ID de Maleta</th>
                        <th>Peso</th>
                        <th>Destino</th>
                        <th>Hora de Despacho</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMaletas.length > 0 ? (
                        filteredMaletas.map((maleta) => (
                            <tr key={maleta.id}>
                                <td>{maleta.id}</td>
                                <td>{maleta.peso}</td>
                                <td>{maleta.destino}</td>
                                <td>{maleta.horaDespacho}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No se encontraron maletas</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Maletas;
