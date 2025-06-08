import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function IndicadorChart({ data, title, type = 'bar', lineColor }) {
  if (type === 'line') {
    const chartData = {
      labels: data.map(item => item.data),
      datasets: [
        {
          label: title || 'Evolução',
          data: data.map(item => item.valor),
          fill: false,
          borderColor: lineColor || '#43a047',
          backgroundColor: lineColor || '#43a047',
          tension: 0.2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    };
    const options = {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: title || 'Evolução' },
      },
      scales: {
        y: { beginAtZero: true },
      },
    };
    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">{title || 'Gráfico de Linha'}</h6>
        </div>
        <div className="card-body">
          <Line data={chartData} options={options} />
        </div>
      </div>
    );
  }

  // Gráfico de barras
  const chartData = {
    labels: data.map(item => item.regiao),
    datasets: [
      {
        label: title || 'Valor do Indicador',
        data: data.map(item => item.valor),
        backgroundColor: 'rgba(79, 195, 247, 0.6)',
        borderColor: 'rgba(79, 195, 247, 1)',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: title || 'Gráfico de Indicadores de Saúde' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">{title || 'Gráfico de Indicadores'}</h6>
      </div>
      <div className="card-body">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default IndicadorChart; 