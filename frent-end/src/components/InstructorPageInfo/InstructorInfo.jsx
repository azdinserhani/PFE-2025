import { IoIosPlayCircle } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";

const InstructorInfo = () => {
  return (
    <div className="absolute left-[15%] top-10 flex flex-col gap-3">
      <span className="text-gray-400">INSTRUCTOR</span>

      <h3 className="text-3xl font-semibold">
        Dr. Angela Yu, Developer and Lead Instructor
      </h3>
      <h4 className="text-[18px]">Developer and Lead Instructor</h4>
      <div className="flex gap-3">
        <div className="flex gap-2 items-center bg-[#D2CAFF]  px-3 rounded-md text-purple-900">
          <IoIosPlayCircle fontSize={20} />
          <span>7 Courses</span>
        </div>{" "}
        <div className="flex gap-2 items-center bg-[#D2CAFF]  px-3 rounded-md text-purple-900">
          <FaUserFriends fontSize={20} />
          <span>1545 Students</span>
        </div>
      </div>
    </div>
  );
};

export default InstructorInfo;
