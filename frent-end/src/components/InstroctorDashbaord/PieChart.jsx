import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ theme }) => {
  const data = {
    labels: ['React Course', 'Node.js Course', 'Python Course', 'JavaScript Course'],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: [
          `${theme.primary}`,
          `${theme.primary}80`,
          `${theme.primary}60`,
          `${theme.primary}40`,
        ],
        borderColor: theme.cardBg,
        borderWidth: 2,
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
            weight: 'bold'
          },
          padding: 20,
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
