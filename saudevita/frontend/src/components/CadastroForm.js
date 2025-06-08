import React, { useState } from 'react';
import axios from 'axios';

function CadastroForm() {
  const [formData, setFormData] = useState({
    nome_responsavel: '',
    local_vacinacao: '',
    regiao: '',
    data: '',
    tipo_indicador: '',
    faixa_etaria: '',
    lote_vacina: '',
    valor: '',
    descricao: '',
    onde_buscar_atendimento: '',
    telefone_contato: '',
    observacoes_comunidade: '',
    status_indicador: 'ativo',
    link_mais_info: '',
    doenca_nome: '',
    vacina_nome: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'danger'

  const DOENCAS = [
    'Gripe Influenza',
    'COVID-19',
    'Sarampo',
    'Dengue',
    'Febre Amarela',
    'Outra'
  ];
  const VACINAS = [
    'Influenza',
    'COVID-19',
    'Tríplice Viral',
    'Dengue',
    'Febre Amarela',
    'Outra'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/indicadores', formData);
      setMessage(response.data.message);
      setMessageType('success');
      setFormData({
        nome_responsavel: '',
        local_vacinacao: '',
        regiao: '',
        data: '',
        tipo_indicador: '',
        faixa_etaria: '',
        lote_vacina: '',
        valor: '',
        descricao: '',
        onde_buscar_atendimento: '',
        telefone_contato: '',
        observacoes_comunidade: '',
        status_indicador: 'ativo',
        link_mais_info: '',
        doenca_nome: '',
        vacina_nome: ''
      }); // Limpar o formulário após o sucesso
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao cadastrar indicador.');
      setMessageType('danger');
    }
  };

  return (
    <div className="card shadow mb-4 custom-form-bg">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Formulário de Cadastro de Indicadores</h6>
        <small className="text-info">
          Preencha com informações detalhadas para fortalecer a saúde da comunidade.<br/>
          <b>Dica:</b> Informe claramente <b>onde</b> a pessoa pode buscar atendimento ou exercer seu direito (ex: UBS Central, Escola, Posto Itinerante, etc).
        </small>
      </div>
      <div className="card-body">
        {message && (
          <div className={`alert alert-${messageType}`} role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome_responsavel" className="form-label">Nome do Responsável:</label>
            <input type="text" className="form-control" id="nome_responsavel" name="nome_responsavel" value={formData.nome_responsavel} onChange={handleChange} required placeholder="Ex: Maria da Silva" />
          </div>
          <div className="mb-3">
            <label htmlFor="local_vacinacao" className="form-label">Local/Posto de Vacinação:</label>
            <input type="text" className="form-control" id="local_vacinacao" name="local_vacinacao" value={formData.local_vacinacao} onChange={handleChange} placeholder="Ex: UBS Central, Escola Municipal..." />
          </div>
          <div className="mb-3">
            <label htmlFor="regiao" className="form-label">Região:</label>
            <input type="text" className="form-control" id="regiao" name="regiao" value={formData.regiao} onChange={handleChange} required placeholder="Ex: Norte, Sul, Centro..." />
          </div>
          <div className="mb-3">
            <label htmlFor="data" className="form-label">Data:</label>
            <input type="date" className="form-control" id="data" name="data" value={formData.data} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tipo_indicador" className="form-label">Tipo de Indicador:</label>
            <select className="form-select" id="tipo_indicador" name="tipo_indicador" value={formData.tipo_indicador} onChange={handleChange} required>
              <option value="">Selecione...</option>
              <option value="vacinacao">Vacinação</option>
              <option value="gripe_influenza">Gripe Influenza</option>
              <option value="campanha">Campanha Preventiva</option>
            </select>
          </div>
          {formData.tipo_indicador === 'vacinacao' && (
            <div className="mb-3">
              <label htmlFor="vacina_nome" className="form-label">Vacina:</label>
              <select className="form-select" id="vacina_nome" name="vacina_nome" value={formData.vacina_nome} onChange={handleChange} required>
                <option value="">Selecione a vacina</option>
                {VACINAS.map(vacina => (
                  <option key={vacina} value={vacina}>{vacina}</option>
                ))}
              </select>
            </div>
          )}
          {formData.tipo_indicador === 'gripe_influenza' || formData.tipo_indicador === 'campanha' ? (
            <div className="mb-3">
              <label htmlFor="doenca_nome" className="form-label">Doença:</label>
              <select className="form-select" id="doenca_nome" name="doenca_nome" value={formData.doenca_nome} onChange={handleChange} required>
                <option value="">Selecione a doença</option>
                {DOENCAS.map(doenca => (
                  <option key={doenca} value={doenca}>{doenca}</option>
                ))}
              </select>
            </div>
          ) : null}
          <div className="mb-3">
            <label htmlFor="faixa_etaria" className="form-label">Faixa Etária:</label>
            <input type="text" className="form-control" id="faixa_etaria" name="faixa_etaria" value={formData.faixa_etaria} onChange={handleChange} placeholder="Ex: Crianças, Idosos, Adultos..." />
          </div>
          <div className="mb-3">
            <label htmlFor="lote_vacina" className="form-label">Lote da Vacina (se aplicável):</label>
            <input type="text" className="form-control" id="lote_vacina" name="lote_vacina" value={formData.lote_vacina} onChange={handleChange} placeholder="Ex: L12345" />
          </div>
          <div className="mb-3">
            <label htmlFor="valor" className="form-label">Quantidade/Valor:</label>
            <input type="number" className="form-control" id="valor" name="valor" value={formData.valor} onChange={handleChange} required placeholder="Ex: 100" />
          </div>
          <div className="mb-3">
            <label htmlFor="descricao" className="form-label">Descrição (Opcional):</label>
            <textarea className="form-control" id="descricao" name="descricao" rows="3" value={formData.descricao} onChange={handleChange} placeholder="Ex: Observações, sintomas, detalhes da campanha..."></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="onde_buscar_atendimento" className="form-label">Onde buscar atendimento ou informação?</label>
            <input type="text" className="form-control" id="onde_buscar_atendimento" name="onde_buscar_atendimento" value={formData.onde_buscar_atendimento} onChange={handleChange} required placeholder="Ex: UBS Central, Escola Municipal, Posto Itinerante..." />
            <small className="text-info">Informe claramente onde a pessoa pode exercer seu direito à saúde.</small>
          </div>
          <div className="mb-3">
            <label htmlFor="telefone_contato" className="form-label">Telefone/WhatsApp para contato (opcional):</label>
            <input type="text" className="form-control" id="telefone_contato" name="telefone_contato" value={formData.telefone_contato} onChange={handleChange} placeholder="Ex: (99) 99999-9999" />
          </div>
          <div className="mb-3">
            <label htmlFor="observacoes_comunidade" className="form-label">Observações para a comunidade (opcional):</label>
            <input type="text" className="form-control" id="observacoes_comunidade" name="observacoes_comunidade" value={formData.observacoes_comunidade} onChange={handleChange} placeholder="Ex: Levar documento, vacinação para todas as idades..." />
          </div>
          <div className="mb-3">
            <label htmlFor="status_indicador" className="form-label">Status do indicador:</label>
            <select className="form-select" id="status_indicador" name="status_indicador" value={formData.status_indicador} onChange={handleChange} required>
              <option value="ativo">Ativo</option>
              <option value="em campanha">Em campanha</option>
              <option value="encerrado">Encerrado</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="link_mais_info" className="form-label">Link para mais informações (opcional):</label>
            <input type="text" className="form-control" id="link_mais_info" name="link_mais_info" value={formData.link_mais_info} onChange={handleChange} placeholder="Ex: https://www.gov.br/saude/campanhas" />
          </div>
          <button type="submit" className="btn btn-primary">Cadastrar Indicador</button>
        </form>
      </div>
    </div>
  );
}

export default CadastroForm; 