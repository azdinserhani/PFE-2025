import React from "react";

const InstructorsCard = ({ item }) => {
  return (
    <div className="flex flex-col gap-4 p-4 w-[300px]">
      <div className=" relative  mx-auto rounded-full overflow-hidden ">
        <img src={item.Img} alt="" />
      </div>
      <div className=" flex flex-col content mt-3 items-center">
        <a
          href=""
          className="text-lg font-medium hover:text-violet-600 duration-500"
        >
          {item.name}
        </a>
        <p className="text-slate-400">{item.desc}</p>
      </div>
    </div>
  );
};

export default InstructorsCard;
