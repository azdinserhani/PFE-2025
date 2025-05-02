import React from "react";
import { useTranslation } from "react-i18next";
const CoverImg = () => {
  const { t } = useTranslation();
  const stats = [
    { value: "1,548+", label: `${t("about.stats.courses")}` },
    { value: "12+", label: `${t("about.stats.courses")}` },
    { value: "500K", label: `${t("about.stats.students")}` },
    { value: "80+", label: `${t("about.stats.instructors")}` },
  ];

  return (
    <div>
      <div
        className="relative flex justify-center items-center gap-10 text-center my-10 h-50 bg-cover bg-center text-white"
        style={{
          backgroundImage: "url(/auth-bg.jpg)",
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
