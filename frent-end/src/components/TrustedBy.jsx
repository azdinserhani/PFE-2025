import React from "react";

const TrustedBy = () => {
  return (
    <div className="flex flex-col w-full my-7">
      <h2 className="text-center mb-7 text-2xl font-bold text-gray-500">
        Trusted By:
      </h2>
      <div className="flex justify-around">
        <img src="./amazon.svg" alt="" className=" w-35" />
        <img src="./google.svg" alt="" className=" w-35" />
        <img src="./shopify.svg" alt="" className=" w-35" />
        <img src="./lenovo.svg" alt="" className=" w-35" />
        <img src="./paypal.svg" alt="" className=" w-35" />
        <img src="./spotify.svg" alt="" className=" w-35" />
      </div>
    </div>
  );
};

export default TrustedBy;
