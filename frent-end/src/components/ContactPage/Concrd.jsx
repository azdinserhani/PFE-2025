import React from "react";
const Concrd = ({ item, icon: Icon }) => {
  return (
    <div className="flex my-10 justify-around gap-10">
      <div className="flex flex-col items-center">
        <div className="flex-1/2 fle-col mb-7">
          <Icon className="size-10" color="#8f15f5" />
        </div>
        <span className="font-bold mb-4">{item.title}</span>
        <p className="text-center mb-4 text-gray-400">C/54 Northwest <br/> Suite 558, Houston, USA 485</p>
        <a href="" className="text-purple-600">View on Google map</a>
      </div>
    </div>
  );
};

export default Concrd;
