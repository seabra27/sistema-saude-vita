const Indicador = require('../models/indicador.model');

// Cadastrar um novo indicador
exports.createIndicador = async (req, res) => {
  try {
    const { regiao, data, tipo_indicador, valor, descricao } = req.body;

    // Validação básica
    if (!regiao || !data || !tipo_indicador || valor === undefined) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios (regiao, data, tipo_indicador, valor) devem ser fornecidos.' });
    }

    const novoIndicador = new Indicador({ regiao, data, tipo_indicador, valor, descricao });
    await novoIndicador.save();
    res.status(201).json({ message: 'Indicador cadastrado com sucesso!', indicador: novoIndicador });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar indicador', error: error.message });
  }
};

// Consultar indicadores
exports.getIndicadores = async (req, res) => {
  try {
    const { regiao, data_inicio, data_fim } = req.query;
    let query = {};

    if (regiao) {
      query.regiao = regiao;
    }

    if (data_inicio || data_fim) {
      query.data = {};
      if (data_inicio) {
        query.data.$gte = new Date(data_inicio);
      }
      if (data_fim) {
        query.data.$lte = new Date(data_fim);
      }
    }

    const indicadores = await Indicador.find(query);
    res.status(200).json(indicadores);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar indicadores', error: error.message });
  }
}; 