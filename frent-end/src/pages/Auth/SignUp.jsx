import React, { useState } from "react";
import InputField from "../../components/Auth/InputField";
import ButtonAuth from "../../components/Auth/Button";
import { Link } from "react-router";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }
    setLoading(true);
    // Add signup logic here
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
              <div className="w-6 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-6 h-1 bg-white rounded-full"></div>
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
            <h1 className="text-4xl font-bold text-white mb-3">Create an account</h1>
            <p className="text-gray-400">
              Already have an account? 
              <Link to="/signin" className="text-indigo-400 hover:text-indigo-300 ml-1 font-medium">
                Log in
              </Link>
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name fields side by side */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full bg-[#36334b] border-transparent rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full bg-[#36334b] border-transparent rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            {/* Email field */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#36334b] border-transparent rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            
            {/* Password field with visibility toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-[#36334b] border-transparent rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            
            {/* Terms checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                className="w-4 h-4 rounded border-gray-300 bg-[#36334b] text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                I agree to the <a href="#" className="text-indigo-400 hover:underline">Terms & Conditions</a>
              </label>
            </div>
            
            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !acceptTerms}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-md font-medium transition duration-300"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
            
            {/* Social login divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-700"></div>
              <span className="px-3 text-sm text-gray-400">Or register with</span>
              <div className="flex-grow h-px bg-gray-700"></div>
            </div>
            
            {/* Social login buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-600 rounded-md hover:bg-[#36334b] transition duration-300"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                <span className="text-white">Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-600 rounded-md hover:bg-[#36334b] transition duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 384 512" fill="white">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <span className="text-white">Apple</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
