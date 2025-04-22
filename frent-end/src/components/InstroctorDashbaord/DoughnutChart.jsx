import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const DoughnutChart = ({ theme }) => {
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        data: [12000, 19000, 15000, 25000],
        backgroundColor: [
          `${theme.primary}`,
          `${theme.primary}80`,
          `${theme.primary}60`,
          `${theme.primary}40`,
        ],
        borderColor: theme.cardBg,
        borderWidth: 2,
        cutout: '70%',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
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
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
