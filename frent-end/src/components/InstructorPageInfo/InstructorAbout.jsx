import React from "react";

const InstructorAbout = () => {
  return (
    <div className="container mx-auto p-6 mt-[200px]  ">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
        About Me
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        I'm <span className="font-semibold text-gray-900">Angela</span>, a developer with a passion for teaching. I'm the lead
        instructor at the <span className="font-semibold text-gray-900">London App Brewery</span>, London's leading Programming
        Bootcamp. I've helped hundreds of thousands of students learn to code
        and change their lives by becoming developers. I've been invited by
        companies such as <span className="font-semibold text-gray-900">Twitter</span>, <span className="font-semibold text-gray-900">Facebook</span>, and <span className="font-semibold text-gray-900">Google</span> to teach their employees.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mt-4">
        My first foray into programming was when I was just 12 years old,
        wanting to build my own Space Invader game. Since then, I've made
        hundreds of websites, apps, and games. But most importantly, I realized
        that my greatest passion is teaching. I spend most of my time
        researching how to make learning to code fun and make hard concepts easy
        to understand. I apply everything I discover into my bootcamp courses.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mt-4">
        In my courses, you'll find lots of geeky humor but also lots of
        explanations and animations to make sure everything is easy to
        understand. I'll be there for you every step of the way.
      </p>
    </div>
  );
};

export default InstructorAbout;
