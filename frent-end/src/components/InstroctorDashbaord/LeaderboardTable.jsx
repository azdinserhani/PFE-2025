import React from 'react';
import { FaStar, FaTrophy } from 'react-icons/fa';

export const LeaderboardTable = ({ data, theme }) => {
  const getTrophyColor = (rank) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return theme.secondary;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full" style={{ color: theme.text }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${theme.border}` }}>
            <th className="py-3 text-left">Rank</th>
            <th className="py-3 text-left">Course Name</th>
            <th className="py-3 text-center">Sales</th>
            <th className="py-3 text-center">Revenue</th>
            <th className="py-3 text-center">Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((course) => (
            <tr 
              key={course.rank}
              style={{ borderBottom: `1px solid ${theme.border}40` }}
              className="hover:bg-opacity-5"
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = `${theme.primary}10`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <td className="py-4 flex items-center gap-2">
                {course.rank <= 3 ? (
                  <FaTrophy style={{ color: getTrophyColor(course.rank) }} />
                ) : (
                  <span className="ml-1">{course.rank}</span>
                )}
              </td>
              <td className="py-4">{course.courseName}</td>
              <td className="py-4 text-center">{course.sales}</td>
              <td className="py-4 text-center" style={{ color: theme.primary }}>{course.revenue}</td>
              <td className="py-4 text-center flex items-center justify-center gap-1">
                <span>{course.rating}</span>
                <FaStar style={{ color: '#FFD700' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
