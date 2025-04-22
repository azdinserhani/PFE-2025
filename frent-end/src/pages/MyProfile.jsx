import { FaUserAlt, FaCamera, FaRegCalendarAlt } from "react-icons/fa";
import { MdEmail, MdLock, MdEdit } from "react-icons/md";
import InputField from "../components/Auth/InputField";
import ButtonAuth from "../components/Auth/Button";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [fileName, setFileName] = useState("");
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setProfile(URL.createObjectURL(file));
    }
  };

  return (
    <div 
      className="flex flex-col min-h-screen p-6 w-full mx-auto"
      style={{ backgroundColor: theme.background }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: theme.text }}>My Profile</h1>
        <p style={{ color: theme.secondary }}>Manage your personal information and account settings</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div 
            className="rounded-xl p-6 text-center"
            style={{ 
              backgroundColor: theme.cardBg,
              borderColor: theme.border,
              borderWidth: '1px'
            }}
          >
            <div className="relative w-40 h-40 mx-auto mb-6">
              <input
                type="file"
                name="profile"
                id="profile"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="profile"
                className="block w-full h-full rounded-full overflow-hidden cursor-pointer relative group"
              >
                <div 
                  className="w-full h-full"
                  style={{ 
                    backgroundColor: profile ? 'transparent' : `${theme.primary}20`,
                    border: `2px dashed ${theme.border}`
                  }}
                >
                  {profile ? (
                    <img
                      src={profile}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserAlt 
                      style={{ color: theme.primary }} 
                      className="w-16 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  )}
                </div>
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                >
                  <FaCamera className="text-white text-2xl" />
                </div>
              </label>
            </div>

            <h2 className="text-xl font-semibold mb-2" style={{ color: theme.text }}>John Doe</h2>
            <p className="mb-4" style={{ color: theme.secondary }}>john.doe@example.com</p>
            
            <div 
              className="p-4 rounded-lg mb-4"
              style={{ backgroundColor: `${theme.primary}10` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2" style={{ color: theme.text }}>
                  <FaRegCalendarAlt style={{ color: theme.primary }} />
                  <span>Joined</span>
                </div>
                <span style={{ color: theme.secondary }}>25/12/2005</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2" style={{ color: theme.text }}>
                  <MdEdit style={{ color: theme.primary }} />
                  <span>Role</span>
                </div>
                <span 
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    backgroundColor: `${theme.primary}20`,
                    color: theme.primary
                  }}
                >
                  Student
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Edit Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div 
            className="rounded-xl p-6"
            style={{ 
              backgroundColor: theme.cardBg,
              borderColor: theme.border,
              borderWidth: '1px'
            }}
          >
            <h3 className="text-xl font-semibold mb-6" style={{ color: theme.text }}>Edit Profile</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: theme.secondary }} />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        backgroundColor: theme.background,
                        color: theme.text,
                        borderColor: theme.border,
                        borderWidth: '1px'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: theme.secondary }} />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        backgroundColor: theme.background,
                        color: theme.text,
                        borderColor: theme.border,
                        borderWidth: '1px'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
                    Password
                  </label>
                  <div className="relative">
                    <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: theme.secondary }} />
                    <input
                      type="password"
                      value="************"
                      disabled
                      className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all cursor-not-allowed"
                      style={{ 
                        backgroundColor: `${theme.background}80`,
                        color: theme.secondary,
                        borderColor: theme.border,
                        borderWidth: '1px'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium" style={{ color: theme.text }}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: theme.secondary }}>+1</span>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        backgroundColor: theme.background,
                        color: theme.text,
                        borderColor: theme.border,
                        borderWidth: '1px'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  className="px-6 py-2 rounded-lg font-medium transition-all duration-300"
                  style={{ 
                    backgroundColor: `${theme.primary}20`,
                    color: theme.primary,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = `${theme.primary}40`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = `${theme.primary}20`;
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg font-medium transition-all duration-300"
                  style={{ 
                    backgroundColor: theme.primary,
                    color: theme.cardBg,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = `${theme.primary}80`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = theme.primary;
                  }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;
