import React from "react";
import { motion } from "framer-motion";
import StatCard from "../../components/MyLearning/StatCard";
import PieChart from "../../components/InstroctorDashbaord/PieChart";
import LineChart from "../../components/InstroctorDashbaord/LineChart";
import BarChart from "../../components/InstroctorDashbaord/BarChart";
import DoughnutChart from "../../components/InstroctorDashbaord/DoughnutChart";
import { LeaderboardTable } from "../../components/InstroctorDashbaord/LeaderboardTable";
import { useTheme } from "../../context/ThemeContext";

const Analytics = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const analyticsData = [
    { title: "Total Revenue", number: 50000 },
    { title: "Total Students", number: 1200 },
    { title: "Total Sales", number: 300 },
    { title: "Number of Courses", number: 25 },
  ];
  const courses = [
    {
      rank: 1,
      courseName: "Full-Stack Web Dev",
      sales: 150,
      revenue: "$4500",
      rating: 4.8,
    },
    {
      rank: 2,
      courseName: "React Basics",
      sales: 120,
      revenue: "$3600",
      rating: 4.6,
    },
    {
      rank: 3,
      courseName: "Node.js API",
      sales: 95,
      revenue: "$2850",
      rating: 4.5,
    },
    {
      rank: 4,
      courseName: "Python for AI",
      sales: 85,
      revenue: "$2550",
      rating: 4.4,
    },
    {
      rank: 5,
      courseName: "UI/UX Design",
      sales: 75,
      revenue: "$2250",
      rating: 4.3,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="container mx-auto py-5 max-h-screen overflow-y-scroll"
      style={{ 
        scrollbarWidth: "none", 
        msOverflowStyle: "none",
        backgroundColor: theme.background,
        color: theme.text
      }}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="grid grid-cols-4 gap-4"
        variants={containerVariants}
      >
        {analyticsData.map((item, index) => {
          return (
            <motion.div
              key={index}
              variants={containerVariants}
              custom={index}
              initial="hidden"
              animate="visible"
            >
              <StatCard item={item} theme={theme} />
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        className="grid grid-cols-3 mt-10 gap-6"
        variants={containerVariants}
      >
        <motion.div
          className="shadow-lg rounded-2xl p-6"
          style={{ backgroundColor: theme.cardBg }}
          variants={containerVariants}
        >
          <h2 className="text-center mb-5 font-semibold text-2xl" style={{ color: theme.text }}>
            Course Revenue
          </h2>
          <PieChart theme={theme} />
        </motion.div>
        <motion.div
          className="shadow-lg rounded-2xl p-6 col-span-2"
          style={{ backgroundColor: theme.cardBg }}
          variants={containerVariants}
        >
          <h2 className="text-center mb-5 font-semibold text-2xl" style={{ color: theme.text }}>
            Student Enrollment
          </h2>
          <LineChart theme={theme} />
        </motion.div>
        <motion.div
          className="shadow-lg rounded-2xl p-6 col-span-2"
          style={{ backgroundColor: theme.cardBg }}
          variants={containerVariants}
        >
          <h2 className="text-center mb-5 font-semibold text-2xl" style={{ color: theme.text }}>
            Course Completion Rate
          </h2>
          <BarChart theme={theme} />
        </motion.div>
        <motion.div
          className="shadow-lg rounded-2xl p-6"
          style={{ backgroundColor: theme.cardBg }}
          variants={containerVariants}
        >
          <h2 className="text-center mb-5 font-semibold text-2xl" style={{ color: theme.text }}>
            Monthly Revenue Growth
          </h2>
          <DoughnutChart theme={theme} />
        </motion.div>
        <motion.div
          className="shadow-lg rounded-2xl p-6 col-span-3"
          style={{ backgroundColor: theme.cardBg }}
          variants={containerVariants}
        >
          <h2 className="text-center mb-5 font-semibold text-2xl" style={{ color: theme.text }}>
            Best-Selling Courses
          </h2>
          <LeaderboardTable data={courses} theme={theme} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
