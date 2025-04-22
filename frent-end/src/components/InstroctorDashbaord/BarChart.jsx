import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const BarChart = ({ theme }) => {
  const data = {
    labels: ['React Course', 'Node.js Course', 'Python Course', 'JavaScript Course', 'UI/UX Course'],
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: [85, 78, 82, 75, 88],
        backgroundColor: `${theme.primary}80`,
        borderColor: theme.primary,
        borderWidth: 2,
        borderRadius: 5,
        hoverBackgroundColor: theme.primary,
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
        max: 100,
        grid: {
          color: `${theme.border}40`,
        },
        ticks: {
          color: theme.text,
          callback: (value) => `${value}%`,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme.text,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
