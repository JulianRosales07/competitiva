import { useState } from "react";
import Tiquetes from "./components/Tiquetes";
import Maletas from "./components/Maletas";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("tiquetes");

  return (
    <div className="App">
      <h1>📦 Gestión de Equipaje</h1>

      <div className="tabs">
        <button
          className={activeTab === "tiquetes" ? "tablink active" : "tablink"}
          onClick={() => setActiveTab("tiquetes")}
        >
          Tiquetes
        </button>
        <button
          className={activeTab === "maletas" ? "tablink active" : "tablink"}
          onClick={() => setActiveTab("maletas")}
        >
          Maletas
        </button>
      </div>

      {activeTab === "tiquetes" && <Tiquetes />}
      {activeTab === "maletas" && <Maletas />}
    </div>
  );
}

export default App;
