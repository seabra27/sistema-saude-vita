const mongoose = require('mongoose');

const alertaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  mensagem: { type: String, required: true },
  tipo: { type: String, required: true, enum: ["urgente", "info", "campanha"] },
  ativo: { type: Boolean, default: true },
  data_inicio: { type: Date, required: true },
  data_fim: { type: Date, required: true }
});

const Alerta = mongoose.model('Alerta', alertaSchema);

module.exports = Alerta; 