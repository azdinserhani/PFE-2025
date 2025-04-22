import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const LineChart = ({ theme }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Students Enrolled',
        data: [65, 75, 86, 98, 110, 125, 140, 152, 168, 180, 195, 210],
        borderColor: theme.primary,
        backgroundColor: `${theme.primary}20`,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: theme.primary,
        pointBorderColor: theme.cardBg,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme.text,
          font: {
            size: 12,
            weight: 'bold',
          },
          padding: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: `${theme.border}40`,
        },
        ticks: {
          color: theme.text,
        },
      },
      x: {
        grid: {
          color: `${theme.border}40`,
        },
        ticks: {
          color: theme.text,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
