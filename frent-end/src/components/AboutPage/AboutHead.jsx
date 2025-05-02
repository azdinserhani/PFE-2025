import React from "react";
import { useTranslation } from "react-i18next";

const AboutHead = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div
        className="relative table w-full py-32 lg:py-44 bg-no-repeat bg-center bg-cover "
        style={{ backgroundImage: "url('/public/etcov.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 text-center mt-12">
            <h2 className="md:text-3xl text-2xl md:leading-normal leading-normal font-semibold text-white">
              {t("about.header.title")}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHead;
