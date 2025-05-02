import React from "react";
import { FiPhone } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

const Question = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center my-17 mt-32">
      <div className="text-center">
        <h1 className="font-bold text-4xl mb-5">{t("about.question.title")}</h1>
        <p className="text-gray-400 font-bold">
          {t("about.question.description")}
        </p>
      </div>
      <div className="my-6 ">
        <button
          className="flex items-center px-4 py-2  text-white font-semibold bg-purple-300 rounded-md gap-2 cursor-pointer hover:bg-purple-500  hover:text-white duration-300"
          style={{ backgroundColor: theme.primary }}
        >
          <FiPhone />
          {t("about.question.contact_us")}
        </button>
      </div>
    </div>
  );
};

export default Question;
