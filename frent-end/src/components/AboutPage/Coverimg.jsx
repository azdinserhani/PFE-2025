import React from "react";

const CoverImg = () => {
  const stats = [
    { value: "1,548+", label: "COURSES" },
    { value: "12+", label: "COUNTRIES" },
    { value: "500K", label: "STUDENTS" },
    { value: "80+", label: "INSTRUCTORS" },
  ];

  return (
    <div>
      <div
        className="relative flex justify-center items-center gap-10 text-center my-10 h-50 bg-cover bg-center text-white"
        style={{
          backgroundImage: "url(/auth.jpg)",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          style={{ zIndex: 1 }}
        ></div>
        <div className="relative z-10"></div>
          {stats.map((stat, index) => (
            <div key={index} className="z-30">
              <h1 className="text-4xl font-bold">{stat.value}</h1>
              <h5>{stat.label}</h5>
            </div>
          ))}
        </div>
      </div>

  );
};

export default CoverImg;
