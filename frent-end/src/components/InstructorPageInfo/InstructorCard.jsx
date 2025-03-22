import { IoLink } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
const InstructorCard = () => {
const icons = [
  {
    id: 1,
    icon: <IoLink fontSize={25} />,
   
  },
  {
    id: 1,
    icon: <IoLogoLinkedin fontSize={25} />,

  },
  {
    id: 1,
    icon: <BsTwitterX fontSize={22} />,

  },
];

return (
    <div className="w-[360px] h-[344px] flex flex-col bg-white items-center gap-7 rounded-2xl shadow absolute right-[15%] top-10">
        <img
            src="/newsPart.png"
            alt=""
            className="h-[150px] w-[150px] bg-gray-100 rounded-full object-cover bg-center mt-[15%]"
        />
        <div className="flex gap-4">
            {icons.map((item) => (
                <div key={item.id} className={"text-purple-900 p-4 border border-purple-900 rounded-lg cursor-pointer hover:bg-purple-100 duration-300"}>
                    {item.icon}
                </div>
            ))}
        </div>
    </div>
);
};

export default InstructorCard;
