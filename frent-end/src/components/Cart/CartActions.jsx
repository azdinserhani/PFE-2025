import React from 'react';
import { FaTrash } from 'react-icons/fa';

const CartActions = ({ onClearCart, itemCount }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-6">
      <div>
        <h3 className="text-lg font-medium text-gray-800">Shopping Cart</h3>
        <p className="text-sm text-gray-500">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>
      
      {itemCount > 0 && (
        <button 
          onClick={onClearCart}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
        >
          <FaTrash />
          <span>Clear Cart</span>
        </button>
      )}
    </div>
  );
};

export default CartActions; 