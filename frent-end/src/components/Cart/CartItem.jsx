import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 overflow-hidden rounded-md">
          <img 
            src={item.image || "/Info1.jpg"} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <Link to={`/course/${item.id}`} className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors">
            {item.title}
          </Link>
          <p className="text-sm text-gray-500 mt-1">{item.instructor}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">{item.lessons} lessons</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{item.students} students</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-lg font-bold text-purple-600">${item.price}</p>
        </div>
        <button 
          onClick={() => onRemove(item.id)} 
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item from cart"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem; 