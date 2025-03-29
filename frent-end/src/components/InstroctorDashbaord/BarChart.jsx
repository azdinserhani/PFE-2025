import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarChart = () => {
  const courseCompletionRate = [
    { month: "January", completionRate: 70 },
    { month: "February", completionRate: 75 },
    { month: "March", completionRate: 80 },
    { month: "April", completionRate: 85 },
    { month: "May", completionRate: 90 },
    { month: "June", completionRate: 88 },
    { month: "July", completionRate: 92 },
    { month: "August", completionRate: 95 },
    { month: "September", completionRate: 93 },
    { month: "October", completionRate: 97 },
    { month: "November", completionRate: 98 },
    { month: "December", completionRate: 99 },
  ];
  const data = {
    labels: courseCompletionRate.map((item) => item.month),
    datasets: [
      {
        label: "Completion Rate",
        data: courseCompletionRate.map((item) => item.completionRate),
        backgroundColor: "rgba(128, 0, 128, 0.2)",
        borderColor: "rgba(128, 0, 128, 1)",
        borderWidth: 1,
      },
    ],
  };
  return <Bar data={data} options={{ responsive: true }} />;
};

export default BarChart;
