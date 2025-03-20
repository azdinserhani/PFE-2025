import { FaUserAlt } from "react-icons/fa";
import InputField from "../components/Auth/InputField";
import ButtonAuth from "../components/Auth/Button";
import { useState } from "react";

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
    <div className="flex flex-col h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        👤 Profile Overview
      </h2>

      {/* Profile Update Form */}
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
        <form className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-4 items-center justify-center">
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
              className="h-32 w-32 bg-gray-300 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-400 transition duration-300 shadow-md"
            >
              {profile ? (
                <img
                  src={profile}
                  alt="Selected Profile"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <FaUserAlt className="text-white text-4xl" />
              )}
            </label>
          </div>
          <div className="flex flex-col gap-4">
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
            </div>

            <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg shadow-inner">
              <p className="font-semibold text-gray-700">
                Join Date: <span className="font-normal pl-2">25/12/2005</span>
              </p>
              <p className="font-semibold text-gray-700">
                Role: <span className="font-normal pl-2">Student</span>
              </p>
            </div>
          </div>
          <ButtonAuth
            label={"Update"}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          />
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
