import { FaLongArrowAltRight } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const FeatureCard = ({ item, icon: Icon }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const { t } = useTranslation();
  return (
    <div
      className="flex flex-col gap-4 shadow-md p-6 rounded-2xl hover:scale-105 cursor-pointer duration-300 h-full"
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`,
        color: theme.text,
        boxShadow: `0 4px 12px ${theme.shadow}`,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = theme.primary;
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.boxShadow = `0 8px 20px ${theme.primary}40`;

        // Also update the description and button text color
        const descElement = e.currentTarget.querySelector(".feature-desc");
        const buttonElement = e.currentTarget.querySelector(".feature-button");
        const iconContainer = e.currentTarget.querySelector(".feature-icon");
        const iconElement = e.currentTarget.querySelector(".feature-icon svg");

        if (descElement) descElement.style.color = "#ffffff";
        if (buttonElement) buttonElement.style.color = "#ffffff";
        if (iconContainer) {
          iconContainer.style.backgroundColor = "#ffffff";
          iconContainer.style.transform = "scale(1.1)";
        }
        if (iconElement) iconElement.style.color = theme.primary;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = theme.cardBg;
        e.currentTarget.style.color = theme.text;
        e.currentTarget.style.boxShadow = `0 4px 12px ${theme.shadow}`;

        // Reset the description and button text color
        const descElement = e.currentTarget.querySelector(".feature-desc");
        const buttonElement = e.currentTarget.querySelector(".feature-button");
        const iconContainer = e.currentTarget.querySelector(".feature-icon");
        const iconElement = e.currentTarget.querySelector(".feature-icon svg");

        if (descElement) descElement.style.color = theme.secondary;
        if (buttonElement) buttonElement.style.color = theme.primary;
        if (iconContainer) {
          iconContainer.style.backgroundColor = `${theme.primary}20`;
          iconContainer.style.transform = "scale(1)";
        }
        if (iconElement) iconElement.style.color = theme.primary;
      }}
    >
      <div
        className="w-fit p-3 rounded-2xl shadow-sm feature-icon"
        style={{
          backgroundColor: `${theme.primary}20`,
          transition: "all 0.3s ease",
          color: theme.primary,
        }}
      >
        <Icon fontSize={28} style={{ color: theme.primary }} />
      </div>
      <span className="font-bold text-2xl">{item.title}</span>
      <p
        className="text-[17px] leading-relaxed feature-desc"
        style={{ color: theme.secondary }}
      >
        {item.desc}
      </p>
      <button
        className="w-fit mt-auto flex gap-2 items-center duration-300 cursor-pointer font-medium feature-button"
        style={{ color: theme.primary }}
      >
        {t("read_more")} <FaLongArrowAltRight />
      </button>
    </div>
  );
};

export default FeatureCard;
