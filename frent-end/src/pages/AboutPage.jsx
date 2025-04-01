import React from "react";
import AboutHead from "../components/AboutPage/AboutHead";
import Info from "../components/LandingPage/Info";
import Features from "../components/LandingPage/Features";
import Instructors from "../components/LandingPage/Instructors";
import Question from "../components/AboutPage/Question";
import CoverImg from "../components/AboutPage/Coverimg";

const AboutPage = () => {
  return (
    <div>
      <AboutHead />
      <Info />
      <Features />
      <CoverImg />
      <Instructors />
      <Question />
    </div>
  );
};

export default AboutPage;
