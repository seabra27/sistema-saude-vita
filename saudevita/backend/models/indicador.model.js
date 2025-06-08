const mongoose = require('mongoose');

const indicadorSchema = new mongoose.Schema({
  nome_responsavel: { type: String, required: true },
  local_vacinacao: { type: String },
  regiao: { type: String, required: true },
  data: { type: Date, required: true },
  tipo_indicador: { type: String, required: true, enum: ["vacinacao", "gripe_influenza", "campanha"] },
  faixa_etaria: { type: String },
  lote_vacina: { type: String },
  valor: { type: Number, required: true },
  descricao: { type: String },
  onde_buscar_atendimento: { type: String, required: true },
  telefone_contato: { type: String },
  observacoes_comunidade: { type: String },
  status_indicador: { type: String, enum: ["ativo", "encerrado", "em campanha"], default: "ativo" },
  link_mais_info: { type: String },
  criado_em: { type: Date, default: Date.now }
});

const Indicador = mongoose.model('Indicador', indicadorSchema);

module.exports = Indicador; 