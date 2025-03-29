import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DoughnutChart = () => {
  const generateRandomRevenue = (base, variance) => {
    return Math.floor(base + Math.random() * variance - variance / 2);
  };

  const monthlyRevenueGrowth = [
    { month: "January", revenue: generateRandomRevenue(5000, 2000) },
    { month: "February", revenue: generateRandomRevenue(7500, 2000) },
    { month: "March", revenue: generateRandomRevenue(10000, 2000) },
    { month: "April", revenue: generateRandomRevenue(12500, 2000) },
    { month: "May", revenue: generateRandomRevenue(15000, 2000) },
    { month: "June", revenue: generateRandomRevenue(17500, 2000) },
    { month: "July", revenue: generateRandomRevenue(20000, 2000) },
    { month: "August", revenue: generateRandomRevenue(22500, 2000) },
    { month: "September", revenue: generateRandomRevenue(25000, 2000) },
    { month: "October", revenue: generateRandomRevenue(27500, 2000) },
    { month: "November", revenue: generateRandomRevenue(30000, 2000) },
    { month: "December", revenue: generateRandomRevenue(32500, 2000) },
  ];

  const data = {
    labels: monthlyRevenueGrowth.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Revenue",
        data: monthlyRevenueGrowth.map((item) => item.revenue),
        backgroundColor: [
          "#D1C4E9",
          "#B39DDB",
          "#9575CD",
          "#7E57C2",
          "#673AB7",
          "#5E35B1",
          "#512DA8",
          "#4527A0",
          "#311B92",
          "#B39DDB",
          "#9575CD",
          "#7E57C2",
        ],
        hoverBackgroundColor: [
          "#D1C4E9",
          "#B39DDB",
          "#9575CD",
          "#7E57C2",
          "#673AB7",
          "#5E35B1",
          "#512DA8",
          "#4527A0",
          "#311B92",
          "#B39DDB",
          "#9575CD",
          "#7E57C2",
        ],
      },
    ],
  };

  return <Doughnut data={data} options={{ responsive: true }} />;
};

export default DoughnutChart;
