import { BiLike } from "react-icons/bi";
import FeatureCard from "./FeatureCard";
import { FaMedal } from "react-icons/fa6";
import { MdOutlineDeveloperMode } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { useTheme } from "../../context/ThemeContext";

const Features = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  const featureContent = [
    {
      icon: BiLike,
      title: "Relaxing & Learning",
      desc: "The phrasal sequence of the is now so that many campaign and benefit",
    },
    {
      icon: FaMedal,
      title: "Certificate",
      desc: "Receive a certificate upon completion of the course to showcase your achievement.",
    },
    {
      icon: MdOutlineDeveloperMode,
      title: "Private Mentoring",
      desc: "Get one-on-one mentoring sessions to help you with your learning journey.",
    },
    {
      icon: CiFaceSmile,
      title: "Creative Thinking",
      desc: "Enhance your creative thinking skills with our specially designed activities.",
    },
  ];
  return (
    <div 
      className="container mx-auto h-auto flex flex-col items-center justify-center px-4 py-16" 
      style={{ 
        backgroundColor: theme.background,
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`
      }}
    >
      <h2 
        className="text-4xl font-bold text-center mb-2" 
        style={{ color: theme.text }}
      >
        Discover Powerful Features
      </h2>
      <p 
        className="font-medium mt-4 text-center max-w-3xl mb-12" 
        style={{ color: theme.secondary }}
      >
        Discover a world of knowledge and opportunities with our online
        education platform pursue a new career.
      </p>
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 p-4 w-full"
        style={{ 
          backgroundColor: theme.background,
          boxShadow: `0 0 20px ${theme.shadow}`
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
