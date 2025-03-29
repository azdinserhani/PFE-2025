import React from "react";

const TrustedBy = () => {
  return (
    <div className="container mx-auto flex flex-col w-full my-7">
      <h2 className="mt-10 text-center mb-7 text-2xl font-bold text-gray-500">
        Trusted By:
      </h2>
      <div className="grid grid-cols-2 mt-5 sm:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center">
        <img src="./amazon.svg" alt="Amazon" className="w-20" />
        <img src="./google.svg" alt="Google" className="w-20" />
        <img src="./shopify.svg" alt="Shopify" className="w-20" />
        <img src="./lenovo.svg" alt="Lenovo" className="w-20" />
        <img src="./paypal.svg" alt="PayPal" className="w-20" />
        <img src="./spotify.svg" alt="Spotify" className="w-20" />
      </div>
    </div>
  );
};

export default TrustedBy;
