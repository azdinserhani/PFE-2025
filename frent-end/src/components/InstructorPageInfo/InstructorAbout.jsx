import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const InstructorAbout = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const paragraphs = [
    {
      text: "I'm Angela, a developer with a passion for teaching. I'm the lead instructor at the London App Brewery, London's leading Programming Bootcamp. I've helped hundreds of thousands of students learn to code and change their lives by becoming developers. I've been invited by companies such as Twitter, Facebook, and Google to teach their employees.",
      highlighted: ["Angela", "London App Brewery"],
    },
    {
      text: "My first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I've made hundreds of websites, apps, and games. But most importantly, I realized that my greatest passion is teaching. I spend most of my time researching how to make learning to code fun and make hard concepts easy to understand. I apply everything I discover into my bootcamp courses.",
      highlighted: [],
    },
    {
      text: "In my courses, you'll find lots of geeky humor but also lots of explanations and animations to make sure everything is easy to understand. I'll be there for you every step of the way.",
      highlighted: [],
    },
  ];

  return (
    <motion.div
      className="p-8 mt-[200px] rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`,
      }}
    >
      <motion.h1
        className="text-3xl font-bold mb-6 pb-3 border-b"
        style={{
          color: theme.text,
          borderColor: theme.border,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        About Me
      </motion.h1>

      <div className="space-y-6">
        {paragraphs.map((paragraph, index) => (
          <motion.p
            key={index}
            className="text-lg leading-relaxed"
            style={{ color: theme.text }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {paragraph.text.split(" ").map((word, wordIndex) => {
              const isHighlighted = paragraph.highlighted.includes(word);
              return (
                <React.Fragment key={wordIndex}>
                  {isHighlighted ? (
                    <motion.span
                      className="font-semibold"
                      style={{ color: theme.primary }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {word}
                    </motion.span>
                  ) : (
                    word
                  )}{" "}
                </React.Fragment>
              );
            })}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
};

export default InstructorAbout;
