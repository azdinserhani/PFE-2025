import ExploreCourse from "../components/ExploreCourse";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Info from "../components/Info";
import Instructors from "../components/Instructors";
import NewsLettre from "../components/NewsLettre";
import TrustedBy from "../components/TrustedBy";
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
