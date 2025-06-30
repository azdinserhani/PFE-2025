import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';
import { useTheme } from '../../context/ThemeContext';

const CartItem = ({ item, onRemove }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  return (
    <div 
      className="flex items-center justify-between p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      style={{ 
        backgroundColor: theme.cardBg,
        borderLeft: `4px solid ${theme.primary}`,
        borderColor: theme.border
      }}
    >
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 overflow-hidden rounded-md shadow-sm">
          <img 
            src={item?.thumbnail || "/Info1.jpg"} 
            alt={item?.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <div>
          <Link 
            to={`/course/${item?.id}`} 
            className="text-lg font-semibold hover:underline transition-colors"
            style={{ color: theme.text }}
          >
            {item?.title}
          </Link>
          <p className="text-sm mt-1" style={{ color: theme.secondary }}>{item?.instructor?.userName || item?.instructor}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm" style={{ color: theme.secondary }}>{item?.lessons} lessons</span>
            <span className="text-sm" style={{ color: theme.secondary }}>•</span>
            <span className="text-sm" style={{ color: theme.secondary }}>{item?.students} students</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-lg font-bold" style={{ color: theme.primary }}>${item.price}</p>
        </div>
        <button 
          onClick={() => onRemove(item.id)} 
          className="p-2 rounded-full hover:bg-opacity-10 transition-colors"
          style={{ 
            color: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.05)'
          }}
          aria-label="Remove item from cart"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem; 