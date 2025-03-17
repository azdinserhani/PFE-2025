import { IoIosArrowForward } from "react-icons/io";
const Header = () => {
  return (
    <div className="flex justify-between mx-3 bg-[#F8FAFC] p-4 ">
      <span className="font-semibold text-[20px]">Courses</span>
      <div className="">
        <p className="flex items-center gap-1">
          Edupath <IoIosArrowForward />
          <span className="text-purple-500">Courses</span>
        </p>
      </div>
    </div>
  );
};

export default Header;
