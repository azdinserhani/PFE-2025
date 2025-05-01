import { BiLike } from "react-icons/bi";
import FeatureCard from "./FeatureCard";
import { FaMedal } from "react-icons/fa6";
import { MdOutlineDeveloperMode } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const { t } = useTranslation();
  const features = t("features", { returnObjects: true });

  const featureContent = [
    {
      icon: BiLike,
      title: features[0].name,
      desc: features[0].desc,
    },
    {
      icon: FaMedal,
      title: features[1].name,
      desc: features[1].desc,
    },
    {
      icon: MdOutlineDeveloperMode,
      title: features[2].name,
      desc: features[2].desc,
    },
    {
      icon: CiFaceSmile,
      title: features[3].name,
      desc: features[3].desc,
    },
  ];
  return (
    <div
      className="container mx-auto h-auto flex flex-col items-center justify-center px-4 py-16"
      style={{
        backgroundColor: theme.background,
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`,
      }}
    >
      <h2
        className="text-4xl font-bold text-center mb-2"
        style={{ color: theme.text }}
      >
        {t("features_title")}
      </h2>
      <p
        className="font-medium mt-4 text-center max-w-3xl mb-12"
        style={{ color: theme.secondary }}
      >
        {t("features_description")}
      </p>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 p-4 w-full"
        style={{
          backgroundColor: theme.background,
          boxShadow: `0 0 20px ${theme.shadow}`,
        }}
      >
        {featureContent.map((feature, index) => {
          return <FeatureCard key={index} item={feature} icon={feature.icon} />;
        })}
      </div>
    </div>
  );
};

export default Features;
