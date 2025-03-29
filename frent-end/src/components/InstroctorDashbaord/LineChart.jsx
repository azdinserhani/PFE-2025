import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const LineChart = () => {
  const studentEnrollmentTrend = [
    { month: "January", students: 50 },
    { month: "February", students: 75 },
    { month: "March", students: 100 },
    { month: "April", students: 125 },
    { month: "May", students: 150 },
    { month: "June", students: 175 },
    { month: "July", students: 200 },
    { month: "August", students: 225 },
    { month: "September", students: 250 },
    { month: "October", students: 275 },
    { month: "November", students: 300 },
    { month: "December", students: 325 },
  ];
  const data = {
    labels: studentEnrollmentTrend.map((item) => item.month),
    datasets: [
      {
        label: "Student Enrollment",
        data: studentEnrollmentTrend.map((item) => item.students),
        fill: false,
        borderColor: "#C27AFF",
        tension: 0.1,
        
      },
    ],
  };
  return <Line data={data} options={{ responsive: true }} />;
};

export default LineChart;
