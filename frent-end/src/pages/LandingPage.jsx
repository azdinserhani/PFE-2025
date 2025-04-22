import ExploreCourse from "../components/LandingPage/ExploreCourse";
import Features from "../components/LandingPage/Features";
import Hero from "../components/LandingPage/Hero";
import Info from "../components/LandingPage/Info";
import Instructors from "../components/LandingPage/Instructors";
import NewsLettre from "../components/LandingPage/NewsLettre";
import TrustedBy from "../components/LandingPage/TrustedBy";
import { useTheme } from "../context/ThemeContext";

const LandingPage = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  return (
    <div style={{ backgroundColor: theme.background }}>
      <Hero />
      <TrustedBy />
      <Info />
      <Features />
      <NewsLettre />
      <ExploreCourse />
      <Instructors />
    </div>
  );
};

export default LandingPage;
