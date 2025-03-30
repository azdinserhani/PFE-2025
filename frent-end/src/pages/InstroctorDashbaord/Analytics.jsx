import React from "react";
import { motion } from "framer-motion";
import StatCard from "../../components/MyLearning/StatCard";
import PieChart from "../../components/InstroctorDashbaord/PieChart";
import LineChart from "../../components/InstroctorDashbaord/LineChart";
import BarChart from "../../components/InstroctorDashbaord/BarChart";
import DoughnutChart from "../../components/InstroctorDashbaord/DoughnutChart";
import { LeaderboardTable } from "../../components/InstroctorDashbaord/LeaderboardTable";

const Analytics = () => {
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
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
              <StatCard item={item} />
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        className="grid grid-cols-3 mt-10 gap-6"
        variants={containerVariants}
      >
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6"
          variants={containerVariants}
        >
          <h2 className="text-center mb-5 font-semibold text-2xl">
            Course Revenue
          </h2>
          <PieChart />
        </motion.div>
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6 col-span-2"
          variants={containerVariants}
        >
          <h2 className="text-center mb-5 font-semibold text-2xl">
            Student Enrollment
          </h2>
          <LineChart />
        </motion.div>
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6 col-span-2"
          variants={containerVariants}
        >
          <h2 className="text-center mb-5 font-semibold text-2xl">
            Course Completion Rate
          </h2>
          <BarChart />
        </motion.div>
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6"
          variants={containerVariants}
        >
          <h2 className="text-center mb-5 font-semibold text-2xl">
            Monthly Revenue Growth
          </h2>
          <DoughnutChart />
        </motion.div>
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6 col-span-3"
          variants={containerVariants}
        >
          <h2 className="text-center mb-5 font-semibold text-2xl">
            Best-Selling Courses
          </h2>
          <LeaderboardTable data={courses} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
