const axios = require('axios');

const indicadores = [
  // VACINAÇÃO
  {
    nome_responsavel: 'Maria da Silva',
    local_vacinacao: 'UBS Central',
    regiao: 'Centro',
    data: '2025-01-15T00:00:00Z',
    tipo_indicador: 'vacinacao',
    faixa_etaria: 'Crianças',
    lote_vacina: 'Influenza',
    valor: 150,
    descricao: 'Campanha de vacinação contra Influenza para crianças.',
    onde_buscar_atendimento: 'UBS Central',
    telefone_contato: '(11) 99999-1111',
    observacoes_comunidade: 'Levar carteira de vacinação.',
    status_indicador: 'ativo',
    link_mais_info: 'https://www.gov.br/saude/campanhas'
  },
  {
    nome_responsavel: 'João Souza',
    local_vacinacao: 'UBS Norte',
    regiao: 'Norte',
    data: '2025-01-20T00:00:00Z',
    tipo_indicador: 'vacinacao',
    faixa_etaria: 'Idosos',
    lote_vacina: 'COVID-19',
    valor: 120,
    descricao: 'Vacinação de reforço contra COVID-19 para idosos.',
    onde_buscar_atendimento: 'UBS Norte',
    telefone_contato: '(11) 99999-2222',
    observacoes_comunidade: 'Vacinação para maiores de 60 anos.',
    status_indicador: 'ativo',
    link_mais_info: 'https://www.gov.br/saude/campanhas'
  },
  {
    nome_responsavel: 'Ana Paula',
    local_vacinacao: 'UBS Sul',
    regiao: 'Sul',
    data: '2025-02-01T00:00:00Z',
    tipo_indicador: 'vacinacao',
    faixa_etaria: 'Adultos',
    lote_vacina: 'Tríplice Viral',
    valor: 90,
    descricao: 'Vacinação contra Sarampo, Caxumba e Rubéola.',
    onde_buscar_atendimento: 'UBS Sul',
    telefone_contato: '(11) 99999-3333',
    observacoes_comunidade: 'Campanha para adultos até 40 anos.',
    status_indicador: 'ativo',
    link_mais_info: 'https://www.gov.br/saude/campanhas'
  },
  // GRIPE INFLUENZA (DOENÇA)
  {
    nome_responsavel: 'Carlos Lima',
    local_vacinacao: '',
    regiao: 'Centro',
    data: '2025-02-10T00:00:00Z',
    tipo_indicador: 'gripe_influenza',
    faixa_etaria: 'Crianças',
    lote_vacina: '',
    valor: 18,
    descricao: 'Casos de gripe influenza em crianças.',
    onde_buscar_atendimento: 'UBS Central',
    telefone_contato: '(11) 99999-4444',
    observacoes_comunidade: 'Sintomas leves predominantes.',
    status_indicador: 'ativo',
    link_mais_info: 'https://www.gov.br/saude/gripe'
  },
  {
    nome_responsavel: 'Fernanda Alves',
    local_vacinacao: '',
    regiao: 'Norte',
    data: '2025-03-15T00:00:00Z',
    tipo_indicador: 'gripe_influenza',
    faixa_etaria: 'Idosos',
    lote_vacina: '',
    valor: 12,
    descricao: 'Casos de gripe influenza em idosos.',
    onde_buscar_atendimento: 'UBS Norte',
    telefone_contato: '(11) 99999-5555',
    observacoes_comunidade: 'Atenção aos sintomas graves.',
    status_indicador: 'ativo',
    link_mais_info: 'https://www.gov.br/saude/gripe'
  },
  {
    nome_responsavel: 'Lucas Pereira',
    local_vacinacao: '',
    regiao: 'Leste',
    data: '2025-03-20T00:00:00Z',
    tipo_indicador: 'gripe_influenza',
    faixa_etaria: 'Adultos',
    lote_vacina: '',
    valor: 8,
    descricao: 'Casos de gripe influenza em adultos.',
    onde_buscar_atendimento: 'UBS Leste',
    telefone_contato: '(11) 99999-6666',
    observacoes_comunidade: 'Procure atendimento ao apresentar febre alta.',
    status_indicador: 'ativo',
    link_mais_info: 'https://www.gov.br/saude/gripe'
  },
  // Novos dados para gráfico de linhas
  {
    nome_responsavel: 'Carlos Lima',
    local_vacinacao: '',
    regiao: 'Centro',
    data: '2025-02-20T00:00:00Z',
    tipo_indicador: 'gripe_influenza',
    faixa_etaria: 'Crianças',
    lote_vacina: '',
    valor: 10,
    descricao: 'Casos de gripe influenza em crianças.',
    onde_buscar_atendimento: 'UBS Central',
    telefone_contato: '(11) 99999-4444',
    observacoes_comunidade: 'Sintomas leves predominantes.',
    status_indicador: 'ativo',
    link_mais_info: 'https://www.gov.br/saude/gripe'
  },
  {
    nome_responsavel: 'Fernanda Alves',
    local_vacinacao: '',
    regiao: 'Norte',
    data: '2025-03-25T00:00:00Z',
    tipo_indicador: 'gripe_influenza',
    faixa_etaria: 'Idosos',
    lote_vacina: '',
    valor: 15,
    descricao: 'Casos de gripe influenza em idosos.',
    onde_buscar_atendimento: 'UBS Norte',
    telefone_contato: '(11) 99999-5555',
    observacoes_comunidade: 'Atenção aos sintomas graves.',
    status_indicador: 'ativo',
    link_mais_info: 'https://www.gov.br/saude/gripe'
  },
  {
    nome_responsavel: 'Lucas Pereira',
    local_vacinacao: '',
    regiao: 'Leste',
    data: '2025-04-01T00:00:00Z',
    tipo_indicador: 'gripe_influenza',
    faixa_etaria: 'Adultos',
    lote_vacina: '',
    valor: 6,
    descricao: 'Casos de gripe influenza em adultos.',
    onde_buscar_atendimento: 'UBS Leste',
    telefone_contato: '(11) 99999-6666',
    observacoes_comunidade: 'Procure atendimento ao apresentar febre alta.',
    status_indicador: 'ativo',
    link_mais_info: 'https://www.gov.br/saude/gripe'
  },
  // CAMPANHAS
  {
    nome_responsavel: 'Equipe SaúdeVita',
    local_vacinacao: '',
    regiao: 'Sul',
    data: '2025-04-01T00:00:00Z',
    tipo_indicador: 'campanha',
    faixa_etaria: '',
    lote_vacina: '',
    valor: 1,
    descricao: 'Campanha de prevenção à Gripe em escolas.',
    onde_buscar_atendimento: 'Escolas Municipais',
    telefone_contato: '(11) 99999-7777',
    observacoes_comunidade: 'Aberta a toda comunidade escolar.',
    status_indicador: 'em campanha',
    link_mais_info: 'https://www.gov.br/saude/campanhas'
  },
  {
    nome_responsavel: 'Equipe SaúdeVita',
    local_vacinacao: '',
    regiao: 'Oeste',
    data: '2025-04-10T00:00:00Z',
    tipo_indicador: 'campanha',
    faixa_etaria: '',
    lote_vacina: '',
    valor: 1,
    descricao: 'Campanha de conscientização sobre Saúde Mental.',
    onde_buscar_atendimento: 'UBS Oeste',
    telefone_contato: '(11) 99999-8888',
    observacoes_comunidade: 'Palestras e rodas de conversa.',
    status_indicador: 'em campanha',
    link_mais_info: 'https://www.gov.br/saude/campanhas'
  },
  {
    nome_responsavel: 'Equipe SaúdeVita',
    local_vacinacao: '',
    regiao: 'Leste',
    data: '2025-04-15T00:00:00Z',
    tipo_indicador: 'campanha',
    faixa_etaria: '',
    lote_vacina: '',
    valor: 1,
    descricao: 'Campanha de vacinação contra Febre Amarela.',
    onde_buscar_atendimento: 'UBS Leste',
    telefone_contato: '(11) 99999-9999',
    observacoes_comunidade: 'Vacinação aberta para todas as idades.',
    status_indicador: 'ativo',
    link_mais_info: 'https://www.gov.br/saude/campanhas'
  },
];

async function seedData() {
  console.log('Iniciando o seeding de dados...');
  for (const indicador of indicadores) {
    try {
      const response = await axios.post('http://localhost:5000/api/indicadores', indicador);
      console.log(`Dados para ${indicador.regiao} (${indicador.tipo_indicador}) inseridos:`, response.data.message);
    } catch (error) {
      console.error(`Erro ao inserir dados para ${indicador.regiao} (${indicador.tipo_indicador}):`, error.response ? error.response.data : error.message);
    }
  }
  console.log('Seeding de dados concluído.');
}

seedData(); 