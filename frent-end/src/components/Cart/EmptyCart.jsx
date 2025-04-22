import React from 'react';
import { Link } from 'react-router';
import { IoCartOutline } from 'react-icons/io5';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <IoCartOutline className="text-6xl text-gray-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        Looks like you haven't added any courses to your cart yet. Browse our courses and find something you'd like to learn!
      </p>
      
      <Link 
        to="/courses" 
        className="bg-purple-600 text-white py-3 px-6 rounded-md font-medium hover:bg-purple-700 transition-colors"
      >
        Browse Courses
      </Link>
    </div>
  );
};

export default EmptyCart; 