import React from "react";
import StatCard from "../../components/MyLearning/StatCard";
import PieChart from "../../components/InstroctorDashbaord/PieChart";

const Analytics = () => {
  const analyticsData = [
    { title: "Total Revenue", number: 50000 },
    { title: "Total Students", number: 1200 },
    { title: "Total Sales", number: 300 },
    { title: "Number of Courses", number: 25 },
  ];
  return (
    <div className="container mx-auto py-5 max-h-screen  overflow-y-scroll">
      <div className="grid grid-cols-4 gap-4">
        {analyticsData.map((item) => {
          return <StatCard item={item} />;
        })}
      </div>
      <div className="grid grid-cols-2">
        <div className="w-[70%]">
          <h2 className="text-center mb-5">Course Revenue</h2>
          <PieChart />
        </div>{" "}
      </div>
    </div>
  );
};

export default Analytics;
