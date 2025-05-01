import { FaLongArrowAltRight } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
const Info = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const { t } = useTranslation();
  const features = t("info.features", { returnObjects: true });
  return (
    <div
      className="container mx-auto flex h-[80vh]"
      style={{ backgroundColor: theme.background }}
    >
      <div className="flex-1/2 relative flex items-center">
        <img
          src="/Info1.jpg"
          alt=""
          className="h-[500px] w-[380px] object-cover rounded-2xl shadow-2xl"
        />
        <img
          src="/Info2.jpg"
          alt=""
          className="h-[192px] w-[192px] object-cover rounded-2xl shadow-2xl absolute top-[380px] left-[332px]"
        />
      </div>
      <div className="flex-1/2 flex justify-center flex-col gap-7">
        <h3 className="text-4xl font-bold" style={{ color: theme.text }}>
          {t("info.info_title")}
        </h3>
        <p className="font-bold" style={{ color: theme.secondary }}>
          {t("info.info_description")}
        </p>
        <div
          className="grid grid-cols-2 gap-3 font-semibold"
          style={{ color: theme.secondary }}
        >
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              {feature}
            </li>
          ))}
        </div>
        <button
          className="flex items-center justify-center w-1/3 font-semibold gap-2 rounded-md cursor-pointer px-10 py-4 duration-300 hover:rotate-3"
          style={{
            backgroundColor: `${theme.primary}30`,
            color: theme.primary,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = theme.primary;
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = `${theme.primary}30`;
            e.currentTarget.style.color = theme.primary;
          }}
        >
          {t("info.learn_more")}
          <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
};

export default Info;
