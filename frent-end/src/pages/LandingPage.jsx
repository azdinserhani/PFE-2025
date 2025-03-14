import ExploreCourse from "../components/LandingPage/ExploreCourse";
import Features from "../components/LandingPage/Features";
import Hero from "../components/LandingPage/Hero";
import Info from "../components/LandingPage/Info";
import Instructors from "../components/LandingPage/Instructors";
import NewsLettre from "../components/LandingPage/NewsLettre";
import TrustedBy from "../components/LandingPage/TrustedBy";
const LandingPage = () => {
  return (
    <div className="">
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
