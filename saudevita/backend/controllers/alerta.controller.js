const Alerta = require('../models/alerta.model');

// Cadastrar um novo alerta
exports.createAlerta = async (req, res) => {
  try {
    const { titulo, mensagem, tipo, ativo, data_inicio, data_fim } = req.body;

    // Validação básica
    if (!titulo || !mensagem || !tipo || !data_inicio || !data_fim) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios (titulo, mensagem, tipo, data_inicio, data_fim) devem ser fornecidos.' });
    }

    const novoAlerta = new Alerta({ titulo, mensagem, tipo, ativo, data_inicio, data_fim });
    await novoAlerta.save();
    res.status(201).json({ message: 'Alerta cadastrado com sucesso!', alerta: novoAlerta });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar alerta', error: error.message });
  }
};

// Consultar alertas
exports.getAlertas = async (req, res) => {
  try {
    const { ativo } = req.query;
    let query = {};

    if (ativo !== undefined) {
      query.ativo = ativo === 'true'; // Converte a string para booleano
    }

    const alertas = await Alerta.find(query);
    res.status(200).json(alertas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar alertas', error: error.message });
  }
}; 