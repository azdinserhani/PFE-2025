import React, { useState } from "react";
import { Link } from "react-router";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Add password reset logic here
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: theme.background }}
    >
      {/* Left side - Theme colored background with image */}
      <div
        className="hidden md:flex md:flex-col md:w-1/2 text-white p-10 relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${theme.primary}dd, ${theme.primary}ff)`,
        }}
      >
        <div className="flex flex-col h-full justify-between z-10 relative">
          {/* Top section */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-widest">EdClub</h1>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition duration-300"
              style={{ backgroundColor: `${theme.cardBg}20` }}
            >
              Back to website <FiArrowRight size={14} />
            </Link>
          </div>

          {/* Bottom section */}
          <div>
            <h2 className="text-3xl font-bold leading-tight mb-6">
              Capturing Moments,
              <br />
              Creating Memories
            </h2>

            {/* Pagination dots */}
            <div className="flex gap-2 mt-4">
              <div
                className="w-6 h-1 rounded-full"
                style={{ backgroundColor: `${theme.cardBg}40` }}
              ></div>
              <div
                className="w-6 h-1 rounded-full"
                style={{ backgroundColor: theme.cardBg }}
              ></div>
              <div
                className="w-6 h-1 rounded-full"
                style={{ backgroundColor: `${theme.cardBg}40` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/auth-bg.jpg')" }}
        ></div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-10 md:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1
              className="text-4xl font-bold mb-3"
              style={{ color: theme.text }}
            >
              Reset Password
            </h1>
            <p style={{ color: theme.secondary }}>
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-md py-3 px-4 focus:outline-none focus:ring-1 transition duration-300"
                style={{
                  backgroundColor: theme.cardBg,
                  color: theme.text,
                  border: `1px solid ${theme.border}`,
                }}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md font-medium transition duration-300"
              style={{
                backgroundColor: theme.primary,
                color: theme.cardBg,
              }}
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>

            <div className="text-center mt-6">
              <span style={{ color: theme.secondary }}>
                Remember your password?{" "}
              </span>
              <Link
                to="/signin"
                className="font-medium hover:underline"
                style={{ color: theme.primary }}
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
