import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IndicadorChart from '../components/IndicadorChart';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const noticias = [
  {
    titulo: 'Campanha Nacional de Vacinação contra a Gripe 2025',
    resumo: 'A vacinação contra a gripe está disponível gratuitamente em todos os postos de saúde do Brasil. Procure a UBS mais próxima e proteja-se!',
    link: 'https://www.gov.br/saude/pt-br/campanhas-de-vacinacao'
  },
  {
    titulo: 'Por que a vacinação é importante?',
    resumo: 'Vacinas salvam vidas e previnem surtos de doenças. Informe-se e mantenha sua carteira de vacinação em dia.',
    link: 'https://www.fiocruz.br/vacinas'
  },
  {
    titulo: 'Dicas de prevenção para doenças sazonais',
    resumo: 'Lave as mãos, evite aglomerações e mantenha ambientes ventilados. Saiba mais sobre prevenção de doenças sazonais.',
    link: 'https://www.saude.gov.br/saude-de-a-z/doencas-sazonais'
  },
  {
    titulo: 'Notícias de Saúde - Medical News Today',
    resumo: 'Acompanhe as últimas notícias internacionais sobre saúde, prevenção e bem-estar.',
    link: 'https://www.medicalnewstoday.com/'
  }
];

const alertas = [
  {
    tipo: 'campanha',
    mensagem: 'Campanha Nacional de Vacinação contra a Gripe: Vacine-se gratuitamente na UBS mais próxima até 30/06!',
    cor: 'info'
  },
  {
    tipo: 'urgente',
    mensagem: 'Atenção: Casos de gripe aumentaram na região Norte. Procure atendimento ao apresentar sintomas!',
    cor: 'danger'
  },
  {
    tipo: 'info',
    mensagem: 'Dica: Leve seu cartão de vacinação e documento com foto ao posto de saúde.',
    cor: 'success'
  }
];

function DashboardPage() {
  const [indicadores, setIndicadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [regiaoFilter, setRegiaoFilter] = useState('');
  const [dataInicioFilter, setDataInicioFilter] = useState('');
  const [dataFimFilter, setDataFimFilter] = useState('');
  const [regioesDisponiveis, setRegioesDisponiveis] = useState([]);
  const [alertaIndex, setAlertaIndex] = useState(0);
  const [kpis, setKpis] = useState({
    totalVacinados: 25,
    novosCasosDoenca: 0,
    campanhasAtivas: 0,
  });
  const [doencaFilter, setDoencaFilter] = useState('');
  const [vacinaFilter, setVacinaFilter] = useState('');
  const [faixaEtariaFilter, setFaixaEtariaFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [doencasDisponiveis, setDoencasDisponiveis] = useState([]);
  const [vacinasDisponiveis, setVacinasDisponiveis] = useState([]);
  const [faixasEtariasDisponiveis, setFaixasEtariasDisponiveis] = useState([]);
  const [statusDisponiveis, setStatusDisponiveis] = useState([]);

  const fetchIndicadores = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        regiao: regiaoFilter || undefined,
        data_inicio: dataInicioFilter || undefined,
        data_fim: dataFimFilter || undefined,
        tipo_indicador: doencaFilter || undefined,
        faixa_etaria: faixaEtariaFilter || undefined,
        status_indicador: statusFilter || undefined,
        lote_vacina: vacinaFilter || undefined,
      };
      const response = await axios.get('http://localhost:5000/api/indicadores', { params });
      setIndicadores(response.data);

      // Calcular KPIs
      const totalVacinados = response.data.filter(i => i.tipo_indicador === 'vacinacao').reduce((acc, curr) => acc + curr.valor, 0);
      const novosCasosGripe = response.data.filter(i => i.tipo_indicador === 'gripe_influenza').reduce((acc, curr) => acc + curr.valor, 0);
      const campanhasAtivas = response.data.filter(i => i.tipo_indicador === 'campanha').length;

      setKpis({
        totalVacinados,
        novosCasosGripe,
        campanhasAtivas,
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndicadores();

    // Fetch available filters
    const fetchFiltros = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/indicadores');
        setDoencasDisponiveis([...new Set(response.data.map(item => item.tipo_indicador))]);
        setVacinasDisponiveis([...new Set(response.data.map(item => item.lote_vacina).filter(Boolean))]);
        setFaixasEtariasDisponiveis([...new Set(response.data.map(item => item.faixa_etaria).filter(Boolean))]);
        setStatusDisponiveis([...new Set(response.data.map(item => item.status_indicador).filter(Boolean))]);
        setRegioesDisponiveis([...new Set(response.data.map(item => item.regiao))]);
      } catch (err) {
        console.error("Erro ao carregar filtros disponíveis:", err);
      }
    };
    fetchFiltros();
  }, []);

  // Alternar alertas animados
  useEffect(() => {
    const interval = setInterval(() => {
      setAlertaIndex((prev) => (prev + 1) % alertas.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleFilter = () => {
    fetchIndicadores();
  };

  // Calculando KPIs (exemplo simples, pode ser mais complexo dependendo dos dados)
  const totalVacinados = indicadores.filter(ind => ind.tipo_indicador === 'vacinacao').reduce((acc, curr) => acc + curr.valor, 0);
  const novosCasosGripe = indicadores.filter(ind => ind.tipo_indicador === 'gripe_influenza').reduce((acc, curr) => acc + curr.valor, 0);
  const campanhasAtivas = indicadores.filter(ind => ind.tipo_indicador === 'campanha').length;

  // Preparar dados para Gráfico de Barras (contagem por tipo_indicador)
  const countsByType = indicadores.reduce((acc, curr) => {
    acc[curr.tipo_indicador] = (acc[curr.tipo_indicador] || 0) + 1;
    return acc;
  }, {});
  const barChartData = Object.keys(countsByType).map(key => ({ regiao: key, valor: countsByType[key] }));

  // Preparar dados para Gráfico de Linhas (evolução de um indicador específico ao longo do tempo)
  const gripeData = indicadores.filter(ind => ind.tipo_indicador === 'gripe_influenza').sort((a, b) => new Date(a.data) - new Date(b.data));
  const lineChartData = gripeData.map(item => ({ data: new Date(item.data).toLocaleDateString(), valor: item.valor }));

  if (loading) {
    return <div className="container mt-4"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div> Carregando indicadores...</div>;
  }

  if (error) {
    return <div className="container mt-4 alert alert-danger">Erro ao carregar indicadores: {error}</div>;
  }

  return (
    <div className="container-fluid mt-4">
      {/* Painel de Boas-vindas */}
      <div className="dashboard-welcome">
        <h2>Bem-vindo ao SaúdeVita</h2>
        <p>
          Democratize o acesso à informação de saúde pública na sua comunidade.<br/>
          Aqui você encontra dados de vacinação, doenças sazonais e campanhas preventivas.<br/>
          <b>Compartilhe, previna-se e exerça seu direito à saúde!</b>
        </p>
      </div>

      {/* Alerta Animado */}
      <div className={`alert alert-${alertas[alertaIndex].cor} alert-animated mb-4`}>
        {alertas[alertaIndex].mensagem}
      </div>

      {/* Filtros Interativos */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Filtros de Consulta</h6>
        </div>
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label htmlFor="regiaoFilter" className="form-label">Região:</label>
              <select id="regiaoFilter" className="form-select" value={regiaoFilter} onChange={(e) => setRegiaoFilter(e.target.value)}>
                <option value="">Todas as Regiões</option>
                {regioesDisponiveis.map(regiao => (
                  <option key={regiao} value={regiao}>{regiao}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="doencaFilter" className="form-label">Doença/Indicador:</label>
              <select id="doencaFilter" className="form-select" value={doencaFilter} onChange={(e) => setDoencaFilter(e.target.value)}>
                <option value="">Todos</option>
                {doencasDisponiveis.map(doenca => (
                  <option key={doenca} value={doenca}>{doenca}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="vacinaFilter" className="form-label">Vacina/Lote:</label>
              <select id="vacinaFilter" className="form-select" value={vacinaFilter} onChange={(e) => setVacinaFilter(e.target.value)}>
                <option value="">Todas</option>
                {vacinasDisponiveis.map(vacina => (
                  <option key={vacina} value={vacina}>{vacina}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="faixaEtariaFilter" className="form-label">Faixa Etária:</label>
              <select id="faixaEtariaFilter" className="form-select" value={faixaEtariaFilter} onChange={(e) => setFaixaEtariaFilter(e.target.value)}>
                <option value="">Todas</option>
                {faixasEtariasDisponiveis.map(faixa => (
                  <option key={faixa} value={faixa}>{faixa}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="statusFilter" className="form-label">Status:</label>
              <select id="statusFilter" className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Todos</option>
                {statusDisponiveis.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="col-md-1 d-flex align-items-end">
              <button className="btn btn-primary w-100" onClick={handleFilter}>Filtrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de KPIs */}
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="kpi-card p-4 h-100">
            <div className="kpi-title">Total de Vacinados</div>
            <div className="kpi-value">{totalVacinados}</div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="kpi-card p-4 h-100">
            <div className="kpi-title" style={{ color: '#43a047' }}>Novos Casos de Gripe Influenza</div>
            <div className="kpi-value">{novosCasosGripe}</div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="kpi-card p-4 h-100">
            <div className="kpi-title" style={{ color: '#039be5' }}>Campanhas Ativas</div>
            <div className="kpi-value">{campanhasAtivas}</div>
          </div>
        </div>
      </div>

      {/* Visualização de Dados com Gráficos */}
      <div className="row">
        <div className="col-xl-6 col-lg-6 mb-4">
          {indicadores.length > 0 ? (
            <IndicadorChart data={barChartData} title="Contagem de Indicadores por Tipo" type="bar" />
          ) : (
            <div className="alert alert-info" role="alert">
              Nenhum dado de indicador disponível para os filtros aplicados.
            </div>
          )}
        </div>
        <div className="col-xl-6 col-lg-6 mb-4">
          {gripeData.length > 0 ? (
            <IndicadorChart data={lineChartData} title="Evolução da Gripe Influenza ao Longo do Tempo" type="line" lineColor="#43a047" />
          ) : (
            <div className="alert alert-info" role="alert">
              Nenhum dado de 'gripe influenza' disponível para o gráfico de linhas.
            </div>
          )}
        </div>
      </div>

      {/* Notícias de Saúde */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Notícias de Saúde e Prevenção</h6>
        </div>
        <div className="card-body">
          <div className="row">
            {noticias.map((noticia, idx) => (
              <div className="col-md-6 mb-3" key={idx}>
                <div className="p-3" style={{ background: '#f5f7fa', borderRadius: '12px', boxShadow: '0 1px 6px 0 rgba(34,51,108,0.04)' }}>
                  <a href={noticia.link} target="_blank" rel="noopener noreferrer" style={{ color: '#22336c', textDecoration: 'none', fontWeight: 600 }}>
                    {noticia.titulo}
                  </a>
                  <div style={{ color: '#4fc3f7', fontSize: '0.95rem', margin: '6px 0 0 0' }}>{noticia.resumo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage; 