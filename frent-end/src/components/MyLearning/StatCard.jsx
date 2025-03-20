import React from "react";

const StatCard = ({ item }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-white h-fit p-6   border border-gray-200 shadow-md rounded-lg flex-1/2">
      <span className="text-gray-600 text-lg font-medium">{item.title}</span>
      <span className="text-3xl font-bold text-purple-600">{item.number}</span>
    </div>
  );
};

export default StatCard;
