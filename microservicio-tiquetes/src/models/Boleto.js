import mongoose from "mongoose";

const tiqueteSchema = new mongoose.Schema({
  cliente_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Cliente" },
  ruta_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Ruta" },
  numero: { type: String, required: true },
  fecha_vuelo: { type: Date, required: true },
  clase: { type: String, enum: ["Económica", "Ejecutiva", "Primera"], required: true },
  reembolsable: { type: Boolean, default: false }
});

export default mongoose.model("Tiquete", tiqueteSchema);
