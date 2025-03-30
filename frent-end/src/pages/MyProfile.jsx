import { FaUserAlt } from "react-icons/fa";
import InputField from "../components/Auth/InputField";
import ButtonAuth from "../components/Auth/Button";
import { useState } from "react";
import { motion } from "framer-motion";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setProfile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col h-screen p-6 w-full md:w-[50%] lg:w-[35%] mx-auto bg-gray-100">
      {/* Profile Update Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center bg-white shadow-lg rounded-xl p-8 w-full"
      >
        <form className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-6 items-center justify-center">
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
              className="h-36 w-36 bg-gray-200 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 transition duration-300 shadow-md overflow-hidden"
            >
              {profile ? (
                <img
                  src={profile}
                  alt="Selected Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FaUserAlt className="text-gray-500 text-5xl" />
              )}
            </label>
           
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <InputField
                id={"username"}
                label={"Full Name"}
                type={"text"}
                placeholder={"Enter your full name"}
              />
              <InputField
                id={"email"}
                label={"Email Address"}
                type={"email"}
                placeholder={"Enter your email"}
              />
              <InputField
                value={"************"}
                disabled={true}
                id={"pass"}
                label={"Password"}
                type={"password"}
                placeholder={"Password"}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg shadow-inner"
            >
              <p className="font-semibold text-gray-700">
                Join Date: <span className="font-normal pl-2">25/12/2005</span>
              </p>
              <p className="font-semibold text-gray-700">
                Role: <span className="font-normal pl-2">Student</span>
              </p>
            </motion.div>
          </div>
          <ButtonAuth
            label={"Update"}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          />
        </form>
      </motion.div>
    </div>
  );
};

export default MyProfile;
