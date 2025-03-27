import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const courseRevenueData = [
  { course: "React Basics", revenue: 15000 },
  { course: "Advanced JavaScript", revenue: 20000 },
  { course: "CSS Mastery", revenue: 10000 },
  { course: "Node.js Essentials", revenue: 5000 },
];

const PieChart = () => {
  const data = {
    labels: courseRevenueData.map((item) => item.course),
    datasets: [
      {
        label: "Course Revenue",
        data: courseRevenueData.map((item) => item.revenue),
        backgroundColor: [
          "rgba(128, 0, 128, 0.8)", // Purple gradient start
          "rgba(147, 112, 219, 0.8)", // Medium Purple
          "rgba(186, 85, 211, 0.8)", // Orchid
          "rgba(221, 160, 221, 0.8)", // Plum
        ],
        hoverBackgroundColor: [
          "rgba(128, 0, 128, 1)", // Darker Purple
          "rgba(147, 112, 219, 1)",
          "rgba(186, 85, 211, 1)",
          "rgba(221, 160, 221, 1)",
        ],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
