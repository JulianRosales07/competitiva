import Boleto from "../models/Boleto.js";

// GET: todos los boletos
export const getBoletos = async (req, res) => {
  try {
    const boletos = await Boleto.find();
    res.json(boletos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST: crear un boleto
export const createBoleto = async (req, res) => {
  try {
    const boleto = new Boleto(req.body);
    await boleto.save();
    res.status(201).json(boleto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET: boletos por cliente
export const getBoletosByCliente = async (req, res) => {
  try {
    const boletos = await Boleto.find({ cliente_id: req.params.cliente_id });
    res.json(boletos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
