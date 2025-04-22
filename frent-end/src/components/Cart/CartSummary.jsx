import React from 'react';
import { Link } from 'react-router';

const CartSummary = ({ total, itemCount }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
          <span className="font-medium">{total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Taxes</span>
          <span className="font-medium">Calculated at checkout</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-lg font-bold text-purple-600">{total}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <button 
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-md font-medium hover:bg-purple-700 transition-colors"
          onClick={() => console.log('Proceed to checkout')}
        >
          Proceed to Checkout
        </button>
        
        <Link 
          to="/courses" 
          className="block w-full text-center text-purple-600 py-3 px-4 rounded-md font-medium border border-purple-600 hover:bg-purple-50 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>By completing your purchase, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default CartSummary; 