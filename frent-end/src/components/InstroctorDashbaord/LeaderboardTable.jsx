import { useEffect, useState } from "react";

export function LeaderboardTable({ data, title }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100); // Delay for animation
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`p-4 bg-white shadow-lg rounded-lg transform transition-all duration-500`}
    >
      <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-purple-500 to-purple-700 text-white">
          <tr>
            <th className="p-3 border">Rank</th>
            <th className="p-3 border">Course Name</th>
            <th className="p-3 border">Sales</th>
            <th className="p-3 border">Revenue ($)</th>
            <th className="p-3 border">Rating ⭐</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`border ${
                index % 2 === 0 ? "bg-purple-100" : "bg-white"
              } hover:bg-blue-100 cursor-pointer transition-colors`}
            >
              <td className="p-3 text-center font-semibold text-gray-700">
                {item.rank}
              </td>
              <td className="p-3 text-gray-700">{item.courseName}</td>
              <td className="p-3 text-center text-gray-700">{item.sales}</td>
              <td className="p-3 text-center text-gray-700">{item.revenue}</td>
              <td className="p-3 text-center text-yellow-500 font-bold">
                {item.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
