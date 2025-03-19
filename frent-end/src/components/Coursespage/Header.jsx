import { IoIosArrowForward } from "react-icons/io";
const Header = () => {
  return (
    <div className="bg-[#F8FAFC]">
      <div className="container mx-auto flex justify-between p-4">
        <span className="font-semibold text-[20px]">Courses</span>
        <div className="">
          <p className="flex items-center gap-1">
            Edupath <IoIosArrowForward />
            <span className="text-purple-500">Courses</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
