import { FaLongArrowAltRight } from "react-icons/fa";

const FeatureCard = ({ item, icon: Icon }) => {
  return (
    <div className="flex flex-col gap-4 shadow-md p-4 rounded-2xl hover:scale-105 cursor-pointer duration-300 hover:bg-purple-500 hover:text-white">
      <div className="bg-purple-100 w-fit p-3 rounded-2xl shadow-sm">
        <Icon fontSize={25} color="#B030DB" />
      </div>
      <span className="font-bold text-2xl ">{item.title}</span>
      <p className="text-[17]">{item.desc}</p>
      <button className="w-fit mt-auto flex gap-2 items-center hover:text-purple-700 duration-300 cursor-pointer">
        Read More <FaLongArrowAltRight />
      </button>
    </div>
  );
};

export default FeatureCard;
