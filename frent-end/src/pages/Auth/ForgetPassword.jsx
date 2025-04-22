import React, { useState } from "react";
import { Link } from "react-router";
import { FiMail, FiArrowRight } from "react-icons/fi";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Add password reset logic here
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex bg-[#262338]">
      {/* Left side - Purple background with image */}
      <div className="hidden md:flex md:flex-col md:w-1/2 bg-indigo-800 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white p-10 relative overflow-hidden">
        <div className="flex flex-col h-full justify-between z-10 relative">
          {/* Top section */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-widest">AMU</h1>
            <Link 
              to="/"
              className="flex items-center gap-2 bg-indigo-700 bg-opacity-50 px-4 py-2 rounded-full text-sm hover:bg-opacity-70 transition duration-300"
            >
              Back to website <FiArrowRight size={14} />
            </Link>
          </div>
          
          {/* Bottom section */}
          <div>
            <h2 className="text-3xl font-bold leading-tight mb-6">
              Capturing Moments,<br />
              Creating Memories
            </h2>
            
            {/* Pagination dots */}
            <div className="flex gap-2 mt-4">
              <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-6 h-1 bg-white rounded-full"></div>
              <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Background image overlay */}
        <div className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-40" 
          style={{ backgroundImage: "url('/auth-bg.jpg')" }}>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-10 md:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">Reset Password</h1>
            <p className="text-gray-400">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#36334b] border-transparent rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            
            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-md font-medium transition duration-300"
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>

            <div className="text-center mt-6 text-gray-400">
              Remember your password?{" "}
              <Link 
                to="/signin"
                className="text-indigo-400 font-medium hover:underline"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
